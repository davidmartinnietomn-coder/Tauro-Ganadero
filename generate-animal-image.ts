import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

// Lazy initialized Gemini client (reused across warm invocations)
let genAiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!genAiClient) {
    genAiClient = new GoogleGenAI({ apiKey });
  }
  return genAiClient;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { prompt, animalId, name } = req.body || {};

    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    console.log(`[Gemini API] Requesting image generation for animal: ${name || animalId || 'unnamed'}`);

    const ai = getGeminiClient();

    if (ai) {
      try {
        const response = await ai.models.generateImages({
          model: 'imagen-3.0-generate-002',
          prompt,
          config: {
            numberOfImages: 1,
            aspectRatio: '4:3',
            outputMimeType: 'image/jpeg',
          },
        });

        const base64Image = response.generatedImages?.[0]?.image?.imageBytes;
        if (base64Image) {
          const dataUrl = `data:image/jpeg;base64,${base64Image}`;
          res.status(200).json({
            success: true,
            imageUrl: dataUrl,
            source: 'gemini-imagen',
            animalId,
            prompt,
          });
          return;
        }
      } catch (genError: any) {
        console.warn('[Gemini API] Imagen generation fallback:', genError?.message || genError);
      }
    }

    // No API key or generation failed: tell the client to use its local fallback
    res.status(200).json({
      success: false,
      source: 'fallback',
      message: 'No GEMINI_API_KEY found or quota reached; using high-fidelity local rendering.',
      animalId,
      prompt,
    });
  } catch (err: any) {
    console.error('[Server Error] generate-animal-image:', err);
    res.status(500).json({
      error: 'Failed to generate image',
      details: err?.message || String(err),
    });
  }
}
