import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';

import { configureAudio, playSFX } from '@/lib/audio';
import { DEFAULT_SETTINGS, loadSettings, saveSettings, type GameSettings } from '@/storage/settings';

type SettingsContextValue = {
  /** Current preferences (defaults until `ready` is true). */
  settings: GameSettings;
  /** False until saved preferences have been read from storage. */
  ready: boolean;
  /** Merge a partial update; writes to disk and updates the audio layer. */
  updateSettings: (patch: Partial<GameSettings>) => void;
  /** Restore every default (and persist them). */
  resetSettings: () => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

/**
 * Owns the persisted audio/game preferences for the whole app. Mounted once in
 * `src/app/_layout.tsx` so both the main menu and an in-game pause read the
 * same values.
 */
export function SettingsProvider({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [ready, setReady] = useState(false);
  /** Guards against writing defaults over saved values before hydration. */
  const hydrated = useRef(false);

  // Load once on mount.
  useEffect(() => {
    let active = true;

    loadSettings().then((stored) => {
      if (!active) return;
      setSettings(stored);
      setReady(true);
      hydrated.current = true;
    });

    return () => {
      active = false;
    };
  }, []);

  // Keep the audio layer in sync and persist every change after hydration.
  useEffect(() => {
    configureAudio(settings);
    if (!hydrated.current) return;
    void saveSettings(settings);
  }, [settings]);

  const updateSettings = useCallback((patch: Partial<GameSettings>) => {
    setSettings((previous) => ({ ...previous, ...patch }));
    // Toggling a switch is itself a sound-worthy event.
    if ('bgmEnabled' in patch || 'sfxEnabled' in patch) {
      playSFX('toggle');
    }
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    playSFX('toggle');
  }, []);

  const value = useMemo<SettingsContextValue>(
    () => ({ settings, ready, updateSettings, resetSettings }),
    [settings, ready, updateSettings, resetSettings],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

/** Read/update the persisted game settings. */
export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings() must be used inside <SettingsProvider>.');
  }
  return context;
}