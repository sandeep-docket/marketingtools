import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

// Vercel Serverless Function for AI-powered icon search

interface AISearchRequest {
  prompt: string;
  iconNames: string[];
}

interface IconCategory {
  category: string;
  icons: string[];
}

interface AISearchResponse {
  icons?: string[];
  categories?: IconCategory[];
  reasoning?: string;
}

// Simple in-memory rate limiting (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 20; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window

function getRateLimitKey(req: VercelRequest): string {
  // Use forwarded IP or fallback
  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(',')[0] : 'unknown';
  return ip;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  
  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  entry.count++;
  return true;
}

// Input validation constants
const MAX_PROMPT_LENGTH = 500;
const MAX_ICON_NAMES = 3000; // Allow more icon names for better AI coverage

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate Content-Type
  const contentType = req.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    return res.status(400).json({ error: 'Invalid content type' });
  }

  // Rate limiting
  const rateLimitKey = getRateLimitKey(req);
  if (!checkRateLimit(rateLimitKey)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  // Check for API key (server-side only - never exposed to client)
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not found in environment');
    return res.status(500).json({ error: 'AI search is not configured' });
  }

  try {
    const body: AISearchRequest = req.body;
    const { prompt, iconNames } = body;

    // Input validation
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Invalid prompt' });
    }
    
    if (!iconNames || !Array.isArray(iconNames)) {
      return res.status(400).json({ error: 'Invalid icon names' });
    }

    // Sanitize and limit input - remove any potential script injection
    const sanitizedPrompt = prompt
      .slice(0, MAX_PROMPT_LENGTH)
      .trim()
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/[<>]/g, '');   // Remove any remaining angle brackets
    
    const sanitizedIconNames = iconNames
      .filter((name): name is string => typeof name === 'string' && name.length < 100)
      .map(name => name.replace(/<[^>]*>/g, '').replace(/[<>]/g, ''))
      .slice(0, MAX_ICON_NAMES);

    if (!sanitizedPrompt || sanitizedPrompt.length < 1) {
      return res.status(400).json({ error: 'Prompt cannot be empty' });
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    // Create the prompt for Claude
    const systemPrompt = `You are an icon finder assistant. Your job is to find the most relevant icons from a given list based on a user's input, and ORGANIZE them into meaningful categories.

IMPORTANT: The user might give you a single word (like "revenue", "AI", "home") OR a full description. Either way, THINK BROADLY about what icons could represent that concept.

Rules:
1. Return ONLY icon names that exist in the provided list (case-insensitive matching is fine)
2. Return icons organized into 3-5 CATEGORIES based on how they relate to the query
3. THINK EXPANSIVELY about the user's query:
   - For "revenue" → categories might be: "Money & Currency" (dollar, coin, cash), "Charts & Analytics" (chart, graph, trending), "Finance" (wallet, bank, growth)
   - For "AI" → categories might be: "Magic & Sparkle" (sparkle, magic, wand), "Intelligence" (brain, lightbulb), "Technology" (robot, chip, cpu)
   - For "user" → categories might be: "Individual" (person, user, avatar), "Groups" (people, team, group), "Account" (profile, badge, id)
4. Each category should have 3-10 icons
5. Return your response as a valid JSON object with:
   - "categories": array of objects, each with "category" (string name) and "icons" (array of icon names)
   - "reasoning": brief explanation (1-2 sentences)

Example response for "revenue":
{
  "categories": [
    {"category": "Money & Currency", "icons": ["Money", "Dollar", "Coin", "Cash", "Wallet", "Currency"]},
    {"category": "Charts & Analytics", "icons": ["Chart", "Graph", "Trending", "Analytics", "Pie", "Bar", "Line"]},
    {"category": "Business & Growth", "icons": ["Bank", "Growth", "Finance", "Building", "Briefcase"]}
  ],
  "reasoning": "Organized icons into money symbols, data visualization, and business concepts commonly used for revenue dashboards."
}

CRITICAL: Always return at least 3 categories with meaningful names. Never return empty categories.`;

    // Send more icon names to AI for better coverage (up to 2500)
    const iconsToShow = sanitizedIconNames.slice(0, 2500);
    const userMessage = `Available icons: ${iconsToShow.join(', ')}${sanitizedIconNames.length > 2500 ? `... (and ${sanitizedIconNames.length - 2500} more similar variations)` : ''}

User's search query: "${sanitizedPrompt}"

Find ALL relevant icons and organize them into 3-5 meaningful categories. Think broadly:
- What does this concept look like visually?
- What related concepts could also apply?
- What metaphors or symbols represent this?
- What UI patterns typically use this concept?

Return as JSON with categories. Each category should have a descriptive name and 3-10 icons.`;

    // Helper function to call Claude and get categorized icons
    async function getIconsFromAI(prompt: string, isRetry: boolean = false): Promise<AISearchResponse> {
      const retryMessage = isRetry 
        ? `The previous search returned few results. Now think MORE BROADLY and CREATIVELY about "${sanitizedPrompt}".
What visual metaphors represent this? What related business/tech concepts apply?
Find icons for synonyms, related ideas, and visual representations.
Organize into 3-5 categories.

Available icons: ${iconsToShow.join(', ')}

Return JSON with categories.`
        : prompt;

      const message = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1500,
        messages: [
          {
            role: 'user',
            content: retryMessage,
          },
        ],
        system: systemPrompt,
      });

      const textContent = message.content.find((block) => block.type === 'text');
      if (!textContent || textContent.type !== 'text') {
        throw new Error('No text response from AI');
      }

      const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      return JSON.parse(jsonMatch[0]);
    }

    // Helper function to check if an icon name matches any in our list
    function iconMatches(iconName: string): boolean {
      const iconLower = iconName.toLowerCase().trim();
      return sanitizedIconNames.some((name) => {
        const nameLower = name.toLowerCase();
        return nameLower === iconLower || 
               nameLower.startsWith(iconLower + ' ') ||
               nameLower.includes(' ' + iconLower + ' ') ||
               nameLower.endsWith(' ' + iconLower) ||
               iconLower.split(' ').some(word => 
                 word.length > 2 && nameLower.includes(word)
               );
      });
    }

    // Helper function to validate categories
    function validateCategories(categories: IconCategory[]): IconCategory[] {
      if (!categories || !Array.isArray(categories)) return [];
      
      return categories
        .map(cat => ({
          category: cat.category || 'Other',
          icons: (cat.icons || []).filter(icon => iconMatches(icon)).slice(0, 12)
        }))
        .filter(cat => cat.icons.length > 0);
    }

    // First attempt
    let result = await getIconsFromAI(userMessage);
    let validCategories = validateCategories(result.categories || []);
    
    // Count total icons
    const totalIcons = validCategories.reduce((sum, cat) => sum + cat.icons.length, 0);

    // If too few results, retry with expanded prompt
    if (totalIcons < 8) {
      console.log(`First attempt returned only ${totalIcons} icons, retrying with expanded search...`);
      try {
        const retryResult = await getIconsFromAI(userMessage, true);
        const retryCategories = validateCategories(retryResult.categories || []);
        
        // Merge categories
        if (retryCategories.length > 0) {
          // Create a map to merge icons by category
          const categoryMap = new Map<string, Set<string>>();
          
          // Add original categories
          for (const cat of validCategories) {
            if (!categoryMap.has(cat.category)) {
              categoryMap.set(cat.category, new Set());
            }
            cat.icons.forEach(icon => categoryMap.get(cat.category)!.add(icon));
          }
          
          // Add retry categories
          for (const cat of retryCategories) {
            if (!categoryMap.has(cat.category)) {
              categoryMap.set(cat.category, new Set());
            }
            cat.icons.forEach(icon => categoryMap.get(cat.category)!.add(icon));
          }
          
          // Convert back to array
          validCategories = Array.from(categoryMap.entries()).map(([category, icons]) => ({
            category,
            icons: Array.from(icons).slice(0, 12)
          }));
        }
        
        if (retryResult.reasoning) {
          result.reasoning = retryResult.reasoning;
        }
      } catch (retryError) {
        console.error('Retry failed:', retryError);
        // Continue with original results
      }
    }

    // Also provide flat icons array for backwards compatibility
    const allIcons = validCategories.flatMap(cat => cat.icons);

    return res.status(200).json({
      categories: validCategories,
      icons: allIcons,
      reasoning: result.reasoning,
    });
  } catch (error) {
    // Log full error server-side for debugging (never sent to client)
    console.error('AI Search error:', error);
    
    // Return generic error to client - don't expose internal details
    return res.status(500).json({
      error: 'AI search temporarily unavailable. Please try again.',
    });
  }
}
