import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChoiceButton } from '@/components/quest/choice-button';
import { EndingCard } from '@/components/quest/ending-card';
import { QuestHeader } from '@/components/quest/quest-header';
import { SceneCard } from '@/components/quest/scene-card';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useQuest } from '@/hooks/use-quest';

/** Badges shown on the left of each choice button (A, B, C, ...). */
const CHOICE_BADGES = ['A', 'B', 'C', 'D'];

export default function QuestScreen() {
  const { node, steps, progress, isEnding, choose, restart } = useQuest();
  const scrollRef = useRef<ScrollView>(null);

  // New scene → jump back to the top so long text always starts fresh.
  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [node.id]);

  return (
    <ThemedView style={styles.screen}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <QuestHeader chapter={node.chapter} steps={steps} progress={progress} isEnding={isEnding} />

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
            <EndingCard ending={node.ending} steps={steps} onRestart={restart} />
          ) : (
            node.choices?.map((choice, index) => (
              <ChoiceButton
                key={choice.label}
                badge={CHOICE_BADGES[index]}
                label={choice.label}
                hint={choice.hint}
                onPress={() => choose(choice.next)}
              />
            ))
          )}
        </Animated.View>
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
