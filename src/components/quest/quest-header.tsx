import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ScreenHeader } from '@/components/ui/screen-header';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type QuestHeaderProps = {
  /** Story title, shown as the header Title. */
  title: string;
  chapter: string;
  steps: number;
  /** 0 → 1 progress through the quest. */
  progress: number;
  isEnding: boolean;
  /** Leave the story and return to the main menu. */
  onBack?: () => void;
  /** Right-hand actions (settings, pause). */
  right?: React.ReactNode;
};

/**
 * Top bar for an active story: back + title + pause/settings actions, followed
 * by the chapter chip, step counter and progress bar.
 */
export function QuestHeader({
  title,
  chapter,
  steps,
  progress,
  isEnding,
  onBack,
  right,
}: QuestHeaderProps) {
  const theme = useTheme();
  const fill = `${Math.round(progress * 100)}%` as `${number}%`;

  return (
    <View style={styles.wrapper}>
      <ScreenHeader title={title} onBack={onBack} right={right} />

      <View style={styles.meta}>
        <View style={styles.row}>
          <View
            style={[
              styles.chip,
              { backgroundColor: theme.backgroundElement, borderColor: theme.border },
            ]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  meta: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
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