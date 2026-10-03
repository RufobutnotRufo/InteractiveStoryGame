import { useFocusEffect, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MenuBackdrop } from '@/components/menu/menu-backdrop';
import { StoryCard } from '@/components/menu/story-card';
import { SettingsButton } from '@/components/settings/settings-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { stories, type Story } from '@/data/stories';
import { playBGM, playSFX } from '@/lib/audio';

/**
 * Main menu — the first screen of the app. Lists every playable quest and
 * launches the chosen one in the shared game engine.
 */
export default function MainMenuScreen() {
  const router = useRouter();

  // Placeholder audio hook: menu theme while this screen is focused.
  useFocusEffect(
    useCallback(() => {
      playBGM('menu');
    }, []),
  );

  const startStory = useCallback(
    (story: Story) => {
      playSFX('start');
      router.push({ pathname: '/play', params: { storyId: story.id } });
    },
    [router],
  );

  return (
    <ThemedView style={styles.screen}>
      <StatusBar style="light" />
      <MenuBackdrop />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.hero}>
          <View style={styles.heroRow}>
            <View style={styles.heroText}>
              <ThemedText type="small" themeColor="textSecondary" style={styles.kicker}>
                Interactive fiction
              </ThemedText>
              <ThemedText style={styles.title}>Choose your quest</ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
                {stories.length} stories available
              </ThemedText>
            </View>

            <SettingsButton />
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {stories.map((story, index) => (
            <Animated.View
              key={story.id}
              entering={FadeInDown.delay(80 * index).duration(320)}
              style={styles.cardWrapper}>
              <StoryCard story={story} onStart={startStory} />
            </Animated.View>
          ))}

          <ThemedText type="small" themeColor="textSecondary" style={styles.footer}>
            Add more quests in src/data/stories and they appear here automatically.
          </ThemedText>
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
  hero: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.three,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  heroText: {
    flex: 1,
    gap: Spacing.half,
  },
  kicker: {
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
  },
  subtitle: {
    lineHeight: 18,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.five,
    alignItems: 'center',
    gap: Spacing.three,
  },
  cardWrapper: {
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  footer: {
    textAlign: 'center',
    paddingTop: Spacing.two,
    maxWidth: MaxContentWidth,
  },
});