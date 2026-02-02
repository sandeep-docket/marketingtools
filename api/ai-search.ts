import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

// Vercel Serverless Function for AI-powered icon search

interface AISearchRequest {
  prompt: string;
  iconNames: string[];
}

interface AISearchResponse {
  icons: string[];
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
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const rateLimitKey = getRateLimitKey(req);
  if (!checkRateLimit(rateLimitKey)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  // Check for API key
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

    // Sanitize and limit input
    const sanitizedPrompt = prompt.slice(0, MAX_PROMPT_LENGTH).trim();
    const sanitizedIconNames = iconNames
      .filter((name): name is string => typeof name === 'string')
      .slice(0, MAX_ICON_NAMES);

    if (!sanitizedPrompt) {
      return res.status(400).json({ error: 'Prompt cannot be empty' });
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    // Create the prompt for Claude
    const systemPrompt = `You are an icon finder assistant. Your job is to find the most relevant icons from a given list based on a user's input.

IMPORTANT: The user might give you a single word (like "revenue", "AI", "home") OR a full description. Either way, THINK BROADLY about what icons could represent that concept.

Rules:
1. Return ONLY icon names that exist in the provided list (case-insensitive matching is fine)
2. Return a maximum of 30 icons, ordered by relevance (most relevant first)
3. THINK EXPANSIVELY about the user's query:
   - For "revenue" → think: money, dollar, coin, chart, graph, trending, growth, analytics, wallet, bank, cash, statistics, pie, bar, line, finance, income, profit
   - For "AI" → think: sparkle, magic, brain, robot, lightbulb, star, neural, chip, cpu, smart, auto, wand
   - For "fast" → think: rocket, lightning, zap, bolt, flash, speed, timer, clock, arrow
   - For "save" → think: disk, floppy, download, check, bookmark, heart, star
   - For "user" → think: person, people, account, profile, avatar, team, group
4. Even for single words, return AT LEAST 15-20 icons by exploring related concepts
5. Return your response as a valid JSON object with:
   - "icons": array of icon names (strings) - aim for 20-30 icons
   - "reasoning": brief explanation (1-2 sentences)

CRITICAL: Never return an empty icons array. Always find at least 10 related icons by thinking about synonyms, related concepts, and visual metaphors.`;

    // Send more icon names to AI for better coverage (up to 2500)
    const iconsToShow = sanitizedIconNames.slice(0, 2500);
    const userMessage = `Available icons: ${iconsToShow.join(', ')}${sanitizedIconNames.length > 2500 ? `... (and ${sanitizedIconNames.length - 2500} more similar variations)` : ''}

User's search query: "${sanitizedPrompt}"

Find ALL relevant icons. Think broadly:
- What does this concept look like visually?
- What related concepts could also apply?
- What metaphors or symbols represent this?
- What UI patterns typically use this concept?

Return as JSON with at least 15-20 icons.`;

    // Helper function to call Claude and get icons
    async function getIconsFromAI(prompt: string, isRetry: boolean = false): Promise<AISearchResponse> {
      const retryMessage = isRetry 
        ? `The previous search returned few results. Now think MORE BROADLY and CREATIVELY about "${sanitizedPrompt}".
What visual metaphors represent this? What related business/tech concepts apply?
Find icons for synonyms, related ideas, and visual representations.

Available icons: ${iconsToShow.join(', ')}

Return JSON with at least 20 icons.`
        : prompt;

      const message = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
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

    // Helper function to validate and filter icons with flexible matching
    function validateIcons(icons: string[]): string[] {
      return (icons || [])
        .filter((icon: string) => {
          const iconLower = icon.toLowerCase().trim();
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
        })
        .slice(0, 30);
    }

    // First attempt
    let result = await getIconsFromAI(userMessage);
    let validIcons = validateIcons(result.icons);

    // If too few results, retry with expanded prompt
    if (validIcons.length < 8) {
      console.log(`First attempt returned only ${validIcons.length} icons, retrying with expanded search...`);
      try {
        const retryResult = await getIconsFromAI(userMessage, true);
        const retryValidIcons = validateIcons(retryResult.icons);
        
        // Merge results, keeping unique icons
        const allIcons = [...new Set([...validIcons, ...retryValidIcons])];
        validIcons = allIcons.slice(0, 30);
        
        if (retryResult.reasoning) {
          result.reasoning = retryResult.reasoning;
        }
      } catch (retryError) {
        console.error('Retry failed:', retryError);
        // Continue with original results
      }
    }

    return res.status(200).json({
      icons: validIcons,
      reasoning: result.reasoning,
    });
  } catch (error) {
    console.error('AI Search error:', error);
    return res.status(500).json({
      error: 'AI search failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
