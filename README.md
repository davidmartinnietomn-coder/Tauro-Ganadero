<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/1770e718-8842-4fcf-8fb7-f6eb76090076

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy on Vercel

Este proyecto incluye `api/generate-animal-image.ts`, una función serverless que sustituye a la ruta de Express (`server.ts`) usada en AI Studio/Cloud Run.

1. Sube el repositorio a GitHub.
2. En Vercel: "Add New Project" → importa el repo. El framework se detecta como Vite automáticamente (usa `vercel.json`).
3. En Settings → Environment Variables, añade `GEMINI_API_KEY` con tu clave de Gemini. Sin ella, la app sigue funcionando con imágenes de respaldo por pelaje, pero sin generación única por animal.
4. Deploy. La ruta `/api/generate-animal-image` quedará servida como función serverless.
