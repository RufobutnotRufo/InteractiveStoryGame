import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SettingsPanel } from '@/components/settings/settings-panel';
import { ThemedView } from '@/components/themed-view';
import { ScreenHeader } from '@/components/ui/screen-header';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { playSFX } from '@/lib/audio';

/**
 * Settings route. Presented as a bottom-sheet modal from the main menu and from
 * the in-game pause menu, so the story stays mounted underneath.
 */
export default function SettingsScreen() {
  const router = useRouter();

  const close = () => {
    playSFX('choice');
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  // Small confirmation blip when the sheet opens.
  useEffect(() => {
    playSFX('toggle');
  }, []);

  return (
    <ThemedView style={styles.screen}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScreenHeader
          title="Settings"
          subtitle="Audio & game preferences"
          onBack={close}
        />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <SettingsPanel />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.five,
  },
});