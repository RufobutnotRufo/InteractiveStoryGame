import { router } from 'expo-router';

import { CircleIconButton } from '@/components/ui/circle-icon-button';
import { playSFX } from '@/lib/audio';

/**
 * Opens the settings route. Used from both the main menu and the in-game
 * pause menu so preferences are always one tap away.
 */
export function SettingsButton() {
  return (
    <CircleIconButton
      label="Open settings"
      icon={{ ios: 'gearshape', android: 'settings', web: 'settings' }}
      onPress={() => {
        playSFX('choice');
        router.push('/settings');
      }}
    />
  );
}