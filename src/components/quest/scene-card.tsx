import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ImageCard } from '@/components/ui/image-card';
import { EndingTones, Fonts, Spacing } from '@/constants/theme';
import type { StoryNode } from '@/data/stories';

/**
 * The image card + narrative text block for a single scene. The image itself is
 * handled by the shared `ImageCard`, so a missing/broken URL falls back to a
 * themed placeholder instead of an empty frame.
 */
export function SceneCard({ node }: { node: StoryNode }) {
  const ending = node.ending;

  return (
    <View style={styles.card}>
      <ImageCard source={node.image} ratio={3 / 2} placeholderLabel="Scene artwork">
        <View style={styles.scrim} pointerEvents="none" />

        <View style={styles.caption}>
          {ending ? (
            <View style={[styles.pill, { backgroundColor: EndingTones[ending.tone] }]}>
              <ThemedText type="smallBold" style={styles.pillText}>
                {ending.label}
              </ThemedText>
            </View>
          ) : (
            <ThemedText type="smallBold" style={styles.captionText}>
              {node.chapter}
            </ThemedText>
          )}
        </View>
      </ImageCard>

      <View style={styles.body}>
        <ThemedText style={styles.title}>{node.title}</ThemedText>

        {ending ? (
          <ThemedText type="small" themeColor="accent" style={styles.summary}>
            {ending.summary}
          </ThemedText>
        ) : null}

        <ThemedText style={styles.text}>{node.text}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.four,
  },
  scrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
    experimental_backgroundImage:
      'linear-gradient(180deg, rgba(11,13,18,0) 0%, rgba(11,13,18,0.92) 100%)',
  },
  caption: {
    position: 'absolute',
    left: Spacing.three,
    bottom: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionText: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  pill: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: 999,
  },
  pillText: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#0B0D12',
  },
  body: {
    gap: Spacing.two,
  },
  title: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
  },
  summary: {
    fontWeight: '600',
  },
  text: {
    fontFamily: Fonts.serif,
    fontSize: 17,
    lineHeight: 28,
    opacity: 0.95,
  },
});