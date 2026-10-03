import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * ---------------------------------------------------------------------------
 *  PERSISTED GAME SETTINGS
 * ---------------------------------------------------------------------------
 *  Small, versioned wrapper around AsyncStorage. Every read/write is wrapped in
 *  try/catch so a corrupt value or a missing native module degrades to the
 *  in-memory defaults instead of crashing the game.
 *
 *  Bump `STORAGE_KEY` if you ever change the shape in a breaking way.
 * ---------------------------------------------------------------------------
 */

export type GameSettings = {
  /** Background music master switch. */
  bgmEnabled: boolean;
  /** Sound effects master switch. */
  sfxEnabled: boolean;
  /** 0 → 1. */
  bgmVolume: number;
  /** 0 → 1. */
  sfxVolume: number;
};

export const DEFAULT_SETTINGS: GameSettings = {
  bgmEnabled: true,
  sfxEnabled: true,
  bgmVolume: 0.6,
  sfxVolume: 0.8,
};

const STORAGE_KEY = 'quest.settings.v1';

/** Coerce anything into a 0 → 1 number. */
function clampVolume(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.min(Math.max(value, 0), 1)
    : fallback;
}

/**
 * Merge stored values over the defaults, so adding a new setting never breaks
 * preferences saved by an older build.
 */
export function sanitizeSettings(raw: unknown): GameSettings {
  const input = (raw ?? {}) as Partial<Record<keyof GameSettings, unknown>>;

  return {
    bgmEnabled:
      typeof input.bgmEnabled === 'boolean' ? input.bgmEnabled : DEFAULT_SETTINGS.bgmEnabled,
    sfxEnabled:
      typeof input.sfxEnabled === 'boolean' ? input.sfxEnabled : DEFAULT_SETTINGS.sfxEnabled,
    bgmVolume: clampVolume(input.bgmVolume, DEFAULT_SETTINGS.bgmVolume),
    sfxVolume: clampVolume(input.sfxVolume, DEFAULT_SETTINGS.sfxVolume),
  };
}

/** Read settings from disk. Never throws — falls back to the defaults. */
export async function loadSettings(): Promise<GameSettings> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_SETTINGS;
    return sanitizeSettings(JSON.parse(stored));
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/** Persist settings. Never throws — the in-memory settings keep working. */
export async function saveSettings(settings: GameSettings): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Storage is a convenience here; ignore failures.
  }
}

/** Forget stored preferences (used by "Reset to defaults"). */
export async function clearSettings(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore.
  }
}