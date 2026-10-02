import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { EndingTones, Fonts, Spacing } from '@/constants/theme';
import type { StoryNode } from '@/data/story';
import { useTheme } from '@/hooks/use-theme';

/** The image card + narrative text block for a single scene. */
export function SceneCard({ node }: { node: StoryNode }) {
  const theme = useTheme();
  const ending = node.ending;

  return (
    <View style={styles.card}>
      <View
        style={[
          styles.imageFrame,
          { backgroundColor: theme.backgroundElement, borderColor: theme.border },
        ]}>
        {node.image != null ? (
          <Image source={node.image} style={styles.image} contentFit="cover" transition={250} />
        ) : (
          <View style={styles.imageFallback}>
            <ThemedText type="small" themeColor="textSecondary">
              No image for this scene
            </ThemedText>
          </View>
        )}

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
      </View>

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
  imageFrame: {
    width: '100%',
    aspectRatio: 3 / 2,
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
