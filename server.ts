import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

// Lazy initialized Gemini client
let genAiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!genAiClient) {
    genAiClient = new GoogleGenAI({ apiKey });
  }
  return genAiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Healthcheck endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Gemini Animal Visual Image Generation Endpoint
  app.post('/api/generate-animal-image', async (req, res) => {
    try {
      const { prompt, animalId, name } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      console.log(`[Gemini API] Requesting image generation for animal: ${name || animalId || 'unnamed'}`);

      const ai = getGeminiClient();

      if (ai) {
        try {
          // Attempt image generation via Google GenAI Imagen / Gemini models
          const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              aspectRatio: '4:3',
              outputMimeType: 'image/jpeg',
            },
          });

          const base64Image = response.generatedImages?.[0]?.image?.imageBytes;
          if (base64Image) {
            const dataUrl = `data:image/jpeg;base64,${base64Image}`;
            return res.json({
              success: true,
              imageUrl: dataUrl,
              source: 'gemini-imagen',
              animalId,
              prompt,
            });
          }
        } catch (genError: any) {
          console.warn('[Gemini API] Imagen generation fallback:', genError?.message || genError);
        }
      }

      // If no API key or generation failed, return success false with prompt for client fallback
      return res.json({
        success: false,
        source: 'fallback',
        message: 'No GEMINI_API_KEY found or quota reached; using high-fidelity local rendering.',
        animalId,
        prompt,
      });
    } catch (err: any) {
      console.error('[Server Error] generate-animal-image:', err);
      return res.status(500).json({
        error: 'Failed to generate image',
        details: err?.message || String(err),
      });
    }
  });

  // Vite middleware setup for Development vs Production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tauro Ganaderia server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
