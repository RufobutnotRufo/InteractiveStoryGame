import type { GameSettings } from '@/storage/settings';

/**
 * ---------------------------------------------------------------------------
 *  AUDIO — placeholder layer
 * ---------------------------------------------------------------------------
 *  No real audio files are wired up yet. These functions exist so the settings
 *  toggles, volume sliders and the game screens already have something to talk
 *  to, and so connecting real assets later is a one-file change.
 *
 *  To make it real with Expo:
 *
 *    npx expo install expo-audio
 *
 *    import { createAudioPlayer } from 'expo-audio';
 *
 *    const bgmPlayer = createAudioPlayer(require('@/assets/audio/theme.mp3'));
 *    const sfxPlayer = createAudioPlayer(require('@/assets/audio/click.mp3'));
 *
 *  ...then replace the console.log bodies below with player calls, keeping the
 *  same signatures so nothing else in the app has to change.
 * ---------------------------------------------------------------------------
 */

/** Background music tracks the game can request. */
export type BgmTrack = 'menu' | 'story' | 'ending';

/** One-shot sound effects the game can fire. */
export type SfxName = 'choice' | 'start' | 'toggle' | 'ending';

/** Latest settings snapshot, so placeholders can report what *would* play. */
let current: GameSettings | null = null;

/** The track the (future) BGM player is looping. */
let currentTrack: BgmTrack | null = null;

const log = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[audio]', ...args);
  }
};

/** Called by the settings provider whenever preferences change. */
export function configureAudio(settings: GameSettings): void {
  current = settings;
}

/** Start (or switch to) a looping background track. No-op while music is off. */
export function playBGM(track: BgmTrack): void {
  if (!current) {
    log(`playBGM("${track}") ignored — audio not configured yet.`);
    return;
  }

  if (!current.bgmEnabled) {
    log(`playBGM("${track}") skipped — background music is disabled.`);
    return;
  }

  if (currentTrack === track) return;

  currentTrack = track;
  log(`playBGM("${track}") at volume ${current.bgmVolume.toFixed(2)}`);
}

/** Stop the looping background track. */
export function stopBGM(): void {
  if (!currentTrack) return;
  log(`stopBGM("${currentTrack}")`);
  currentTrack = null;
}

/** Fire a one-shot sound effect. No-op while effects are off. */
export function playSFX(name: SfxName): void {
  if (!current?.sfxEnabled) return;
  log(`playSFX("${name}") at volume ${current.sfxVolume.toFixed(2)}`);
}

/** Read-only view of the audio layer, handy for debugging. */
export function getAudioState(): { track: BgmTrack | null; settings: GameSettings | null } {
  return { track: currentTrack, settings: current };
}