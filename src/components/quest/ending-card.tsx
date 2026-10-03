import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { EndingTones, Spacing } from '@/constants/theme';
import type { StoryEnding } from '@/data/stories';
import { useTheme } from '@/hooks/use-theme';

type EndingCardProps = {
  ending: StoryEnding;
  steps: number;
  onRestart: () => void;
  /** Leave the story and return to the story list. */
  onBackToMenu: () => void;
};

/** Footer shown on ending nodes: a recap line plus the ending actions. */
export function EndingCard({ ending, steps, onRestart, onBackToMenu }: EndingCardProps) {
  const theme = useTheme();
  const tone = EndingTones[ending.tone];
  const stepLabel = steps === 1 ? '1 choice' : `${steps} choices`;

  return (
    <View style={styles.container}>
      <View style={styles.summaryRow}>
        <View style={[styles.dot, { backgroundColor: tone }]} />
        <ThemedText type="small" themeColor="textSecondary">
          You reached this ending after {stepLabel}.
        </ThemedText>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Play again"
        onPress={onRestart}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
        <View style={[styles.button, { backgroundColor: theme.accent }]}>
          <SymbolView
            name={{ ios: 'arrow.counterclockwise', android: 'restart_alt', web: 'restart_alt' }}
            size={18}
            tintColor={theme.onAccent}
          />
          <ThemedText type="smallBold" themeColor="onAccent" style={styles.buttonText}>
            Play again
          </ThemedText>
        </View>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Back to main menu"
        onPress={onBackToMenu}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
        <View
          style={[
            styles.button,
            styles.secondaryButton,
            { borderColor: theme.border },
          ]}>
          <SymbolView
            name={{ ios: 'list.bullet', android: 'list', web: 'list' }}
            size={18}
            tintColor={theme.textSecondary}
          />
          <ThemedText type="smallBold" style={styles.buttonText}>
            All stories
          </ThemedText>
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: Spacing.three,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pressable: {
    width: '100%',
  },
  pressed: {
    opacity: 0.85,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
    borderRadius: 18,
  },
  secondaryButton: {
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
