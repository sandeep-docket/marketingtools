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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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

    if (!prompt || !iconNames || !Array.isArray(iconNames)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    // Create the prompt for Claude
    const systemPrompt = `You are an icon finder assistant. Your job is to find the most relevant icons from a given list based on a user's description.

Rules:
1. Return ONLY icon names that exist in the provided list (case-insensitive matching is fine)
2. Return a maximum of 24 icons, ordered by relevance (most relevant first)
3. Consider:
   - Direct matches (e.g., "home" → Home icon)
   - Conceptual matches (e.g., "AI" → Sparkle, Magic, Lightbulb, Brain)
   - Metaphorical matches (e.g., "fast" → Rocket, Lightning, Zap)
   - Common UI patterns (e.g., "save" → Floppy, Checkmark)
   - Similar concepts (e.g., "email" → Mail, Envelope, Inbox)
4. Return your response as a valid JSON object with:
   - "icons": array of icon names (strings)
   - "reasoning": brief explanation of why you chose these icons (1-2 sentences)

Example response:
{"icons": ["Sparkle", "Lightbulb", "Magic", "Brain", "Star", "Rocket"], "reasoning": "Selected icons that represent AI, innovation, and intelligence concepts."}`;

    const userMessage = `Available icons: ${iconNames.slice(0, 500).join(', ')}${iconNames.length > 500 ? '... and more' : ''}

User is looking for: "${prompt}"

Find the most relevant icons and return as JSON.`;

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
      system: systemPrompt,
    });

    // Extract the text response
    const textContent = message.content.find((block) => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from AI');
    }

    // Parse the JSON response
    let result: AISearchResponse;
    try {
      // Extract JSON from the response (it might be wrapped in markdown code blocks)
      const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      result = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('Failed to parse AI response:', textContent.text);
      throw new Error('Failed to parse AI response');
    }

    // Validate and filter the results to only include icons that exist in the provided list
    const validIcons = (result.icons || [])
      .filter((icon: string) =>
        iconNames.some(
          (name) => name.toLowerCase() === icon.toLowerCase()
        )
      )
      .slice(0, 24);

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
