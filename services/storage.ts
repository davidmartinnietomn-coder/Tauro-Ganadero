import { GameState } from '../types/game';
import { generateInitialGameState } from './generator';

const SAVE_KEY = 'tauro_ganaderia_save_v1';

export function loadSavedGame(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.ranch || !parsed.animals) {
      return null;
    }
    return parsed as GameState;
  } catch (err) {
    console.error('Error loading saved game:', err);
    return null;
  }
}

export const loadGameFromStorage = loadSavedGame;

export function saveGame(state: GameState): boolean {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    return true;
  } catch (err) {
    console.error('Error saving game:', err);
    return false;
  }
}

export const saveGameToStorage = saveGame;

export function createNewGame(ranchName: string, province: string): GameState {
  const state = generateInitialGameState(ranchName, province);
  saveGame(state);
  return state;
}

export function hasSavedGame(): boolean {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed && parsed.ranch && parsed.ranch.name);
  } catch {
    return false;
  }
}

export function deleteSavedGame(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (err) {
    console.error('Error deleting saved game:', err);
  }
}
