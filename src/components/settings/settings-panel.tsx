import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { SettingsGroup, SettingsRow } from '@/components/settings/settings-row';
import { Button } from '@/components/ui/button';
import { ToggleSwitch } from '@/components/ui/toggle-switch';
import { VolumeSlider } from '@/components/ui/volume-slider';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useSettings } from '@/context/settings-context';
import { playBGM, playSFX } from '@/lib/audio';

/**
 * ---------------------------------------------------------------------------
 *  AUDIO & GAME SETTINGS
 * ---------------------------------------------------------------------------
 *  This panel is rendered by the `/settings` route, which is reachable from
 *  both the main menu and the in-game pause menu.
 *
 *  Every change is written to AsyncStorage by the settings provider, so
 *  preferences survive app restarts.
 * ---------------------------------------------------------------------------
 */
export function SettingsPanel() {
  const { settings, ready, updateSettings, resetSettings } = useSettings();

  const setBgmEnabled = useCallback(
    (value: boolean) => {
      // Enabling music is worth an audible confirmation.
      updateSettings({ bgmEnabled: value });
      if (value) playBGM('menu');
    },
    [updateSettings],
  );

  const setSfxEnabled = useCallback(
    (value: boolean) => {
      updateSettings({ sfxEnabled: value });
      // The toggle SFX is played by the provider; this is the slider preview.
      if (value) playSFX('choice');
    },
    [updateSettings],
  );

  const setBgmVolume = useCallback(
    (value: number) => updateSettings({ bgmVolume: value }),
    [updateSettings],
  );

  const setSfxVolume = useCallback(
    (value: number) => updateSettings({ sfxVolume: value }),
    [updateSettings],
  );

  // Placeholder "hear it" hooks — these will drive real audio players later.
  const previewBgm = useCallback(() => playBGM('menu'), []);
  const previewSfx = useCallback(() => playSFX('choice'), []);

  return (
    <View style={styles.panel}>
      <SettingsGroup title="Audio">
        <SettingsRow
          title="Background music"
          description="Loops a theme while you explore."
          icon={{ ios: 'music.note', android: 'music_note', web: 'music_note' }}
          control={
            <ToggleSwitch
              value={settings.bgmEnabled}
              onValueChange={setBgmEnabled}
              accessibilityLabel="Background music"
            />
          }>
          <VolumeSlider
            value={settings.bgmVolume}
            onChange={setBgmVolume}
            onRelease={previewBgm}
            enabled={settings.bgmEnabled}
            accessibilityLabel="Music volume"
          />
        </SettingsRow>

        <SettingsRow
          title="Sound effects"
          description="Clicks, choices and ending stings."
          icon={{
            ios: 'speaker.wave.2',
            android: 'volume_up',
            web: 'volume_up',
          }}
          control={
            <ToggleSwitch
              value={settings.sfxEnabled}
              onValueChange={setSfxEnabled}
              accessibilityLabel="Sound effects"
            />
          }>
          <VolumeSlider
            value={settings.sfxVolume}
            onChange={setSfxVolume}
            onRelease={previewSfx}
            enabled={settings.sfxEnabled}
            accessibilityLabel="Effects volume"
          />
        </SettingsRow>
      </SettingsGroup>

      <SettingsGroup title="Preferences">
        <SettingsRow
          title="Stored on this device"
          description={
            ready
              ? 'Preferences are saved automatically and persist between sessions.'
              : 'Loading saved preferences…'
          }
          icon={{ ios: 'externaldrive', android: 'save', web: 'save' }}
        />
      </SettingsGroup>

      <Button
        label="Reset to defaults"
        variant="ghost"
        icon={{ ios: 'arrow.counterclockwise', android: 'restart_alt', web: 'restart_alt' }}
        onPress={resetSettings}
      />

      <ThemedText type="small" themeColor="textSecondary" style={styles.footnote}>
        Audio is placeholder-only for now — the toggles and sliders are already wired to
        playBGM() / playSFX(), so real tracks can be dropped in without touching the UI.
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    gap: Spacing.four,
  },
  footnote: {
    textAlign: 'center',
    paddingHorizontal: Spacing.two,
  },
});