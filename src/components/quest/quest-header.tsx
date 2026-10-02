import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type QuestHeaderProps = {
  chapter: string;
  steps: number;
  /** 0 → 1 progress through the quest. */
  progress: number;
  isEnding: boolean;
};

/** Top bar: chapter chip, step counter and a thin progress bar. */
export function QuestHeader({ chapter, steps, progress, isEnding }: QuestHeaderProps) {
  const theme = useTheme();
  const fill = `${Math.round(progress * 100)}%` as `${number}%`;

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <View
          style={[styles.chip, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <View style={[styles.dot, { backgroundColor: theme.accent }]} />
          <ThemedText type="smallBold" style={styles.chipText}>
            {isEnding ? 'The End' : chapter}
          </ThemedText>
        </View>

        <ThemedText type="small" themeColor="textSecondary" style={styles.stepText}>
          {isEnding ? 'Complete' : `Step ${steps + 1}`}
        </ThemedText>
      </View>

      <View style={[styles.track, { backgroundColor: theme.backgroundElement }]}>
        <View style={[styles.fill, { backgroundColor: theme.accent, width: fill }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.three,
    gap: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: 999,
    borderWidth: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  chipText: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  stepText: {
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  track: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
});
