import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChoiceButton } from '@/components/quest/choice-button';
import { EndingCard } from '@/components/quest/ending-card';
import { QuestHeader } from '@/components/quest/quest-header';
import { SceneCard } from '@/components/quest/scene-card';
import { PauseMenu } from '@/components/settings/pause-menu';
import { SettingsButton } from '@/components/settings/settings-button';
import { ThemedView } from '@/components/themed-view';
import { CircleIconButton } from '@/components/ui/circle-icon-button';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { choiceBadge, getStory } from '@/data/stories';
import { useQuest } from '@/hooks/use-quest';
import { playBGM, playSFX } from '@/lib/audio';

/**
 * Story screen — wraps the shared game engine around whichever story the main
 * menu launched (`?storyId=...`).
 */
export default function PlayScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ storyId?: string }>();
  const story = getStory(params.storyId);

  const { node, steps, progress, isEnding, choose, restart } = useQuest(story);
  const scrollRef = useRef<ScrollView>(null);
  const [paused, setPaused] = useState(false);

  // New scene → jump back to the top so long text always starts fresh.
  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [node.id]);

  // Placeholder audio hooks: swap tracks as the player moves through the story.
  useFocusEffect(
    useCallback(() => {
      playBGM(isEnding ? 'ending' : 'story');
    }, [isEnding]),
  );

  useEffect(() => {
    if (isEnding) playSFX('ending');
  }, [isEnding, node.id]);

  const leaveStory = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }, [router]);

  const handleChoice = useCallback(
    (nextNodeId: string) => {
      playSFX('choice');
      choose(nextNodeId);
    },
    [choose],
  );

  return (
    <ThemedView style={styles.screen}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <QuestHeader
          chapter={node.chapter}
          steps={steps}
          progress={progress}
          isEnding={isEnding}
          onBack={leaveStory}
          title={story.title}
          right={
            <>
              <SettingsButton />
              <CircleIconButton
                label="Pause"
                icon={{ ios: 'pause.fill', android: 'pause', web: 'pause' }}
                onPress={() => setPaused(true)}
              />
            </>
          }
        />

        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <Animated.View key={node.id} entering={FadeIn.duration(280)} style={styles.item}>
            <SceneCard node={node} />
          </Animated.View>
        </ScrollView>

        <Animated.View
          key={`footer-${node.id}`}
          entering={FadeInDown.duration(320)}
          style={styles.footer}>
          {isEnding && node.ending ? (
            <EndingCard
              ending={node.ending}
              steps={steps}
              onRestart={restart}
              onBackToMenu={leaveStory}
            />
          ) : (
            node.choices?.map((choice, index) => (
              <ChoiceButton
                key={choice.label}
                badge={choiceBadge(index)}
                label={choice.label}
                hint={choice.hint}
                onPress={() => handleChoice(choice.next)}
              />
            ))
          )}
        </Animated.View>
      </SafeAreaView>

      <PauseMenu
        visible={paused}
        storyTitle={story.title}
        chapter={node.chapter}
        steps={steps}
        onResume={() => setPaused(false)}
        onOpenSettings={() => {
          setPaused(false);
          router.push('/settings');
        }}
        onExit={() => {
          setPaused(false);
          leaveStory();
        }}
      />
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
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
    alignItems: 'center',
  },
  item: {
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  footer: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
});