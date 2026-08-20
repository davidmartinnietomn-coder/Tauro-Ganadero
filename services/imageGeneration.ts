import { Animal } from '../types/game';
import { buildAnimalGeminiPrompt } from './animalPromptBuilder';
import { getRealisticBullImage } from '../utils/bullImages';

export interface GenerateImageResult {
  imageUrl: string;
  prompt: string;
  source: 'gemini-imagen' | 'realistic-matched';
  isGenerated: boolean;
}

/**
 * Generate or retrieve permanent image for an animal.
 * If animal already has an imageUrl, returns it immediately without regenerating.
 */
export async function generateAnimalImage(
  animal: Animal,
  forceRegenerate: boolean = false
): Promise<GenerateImageResult> {
  // If animal already has a saved image and not forcing regeneration, return existing!
  if (animal.imageUrl && !forceRegenerate) {
    return {
      imageUrl: animal.imageUrl,
      prompt: animal.imagePrompt || buildAnimalGeminiPrompt(animal),
      source: animal.imageStatus === 'generated' ? 'gemini-imagen' : 'realistic-matched',
      isGenerated: animal.imageStatus === 'generated',
    };
  }

  // 1. Build strict dynamic prompt
  const prompt = buildAnimalGeminiPrompt({
    sex: animal.sex,
    ageYears: animal.ageYears,
    coat: animal.coat,
    markings: animal.markings,
    horn: animal.horn,
    morphology: animal.morphology,
    name: animal.name,
  });

  // 2. Call backend server API
  try {
    const res = await fetch('/api/generate-animal-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        animalId: animal.id,
        name: animal.name,
        sex: animal.sex,
        ageYears: animal.ageYears,
        coat: animal.coat,
        horn: animal.horn,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.imageUrl) {
        return {
          imageUrl: data.imageUrl,
          prompt,
          source: 'gemini-imagen',
          isGenerated: true,
        };
      }
    }
  } catch (err) {
    console.warn('[ImageGen] Server API not reachable or failed, using local high-detail matching:', err);
  }

  // 3. High-fidelity local matched photo fallback based on exact traits
  const matched = getRealisticBullImage(
    animal.coat,
    animal.sex,
    animal.ageYears,
    animal.horn?.direction || 'Corniveleto',
    animal.horn?.symmetry || 'Simétrica'
  );

  return {
    imageUrl: matched.url,
    prompt,
    source: 'realistic-matched',
    isGenerated: false,
  };
}
