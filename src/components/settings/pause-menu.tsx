import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type PauseMenuProps = {
  visible: boolean;
  storyTitle: string;
  /** Current chapter label, shown as context. */
  chapter: string;
  /** Choices made so far. */
  steps: number;
  onResume: () => void;
  onOpenSettings: () => void;
  /** Leave the story and return to the main menu. */
  onExit: () => void;
};

/**
 * Pause overlay for the active story. Opened from the pause button in the story
 * header, and closable by tapping the backdrop or the Android back button.
 */
export function PauseMenu({
  visible,
  storyTitle,
  chapter,
  steps,
  onResume,
  onOpenSettings,
  onExit,
}: PauseMenuProps) {
  const theme = useTheme();
  const stepLabel = steps === 1 ? '1 choice made' : `${steps} choices made`;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onResume}>
      <View style={styles.root}>
        <Animated.View entering={FadeIn.duration(180)} style={StyleSheet.absoluteFill}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Resume story"
            style={[StyleSheet.absoluteFill, styles.backdrop]}
            onPress={onResume}
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(240)}
          style={[styles.sheet, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <View style={[styles.handle, { backgroundColor: theme.border }]} />

          <View style={styles.heading}>
            <ThemedText style={styles.title}>Paused</ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.context}>
              {storyTitle} · {chapter} · {stepLabel}
            </ThemedText>
          </View>

          <View style={styles.actions}>
            <Button
              label="Resume"
              variant="primary"
              icon={{ ios: 'play.fill', android: 'play_arrow', web: 'play_arrow' }}
              onPress={onResume}
            />
            <Button
              label="Settings"
              variant="secondary"
              icon={{ ios: 'gearshape', android: 'settings', web: 'settings' }}
              onPress={onOpenSettings}
            />
            <Button
              label="Back to main menu"
              variant="ghost"
              icon={{ ios: 'house', android: 'home', web: 'home' }}
              onPress={onExit}
            />
          </View>

          <ThemedText type="small" themeColor="textSecondary" style={styles.hint}>
            Your progress in this run is not saved.
          </ThemedText>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Spacing.three,
  },
  backdrop: {
    backgroundColor: 'rgba(4, 6, 10, 0.72)',
  },
  sheet: {
    borderRadius: 28,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.four,
  },
  handle: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 2,
  },
  heading: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  context: {
    textAlign: 'center',
  },
  actions: {
    gap: Spacing.two,
  },
  hint: {
    textAlign: 'center',
  },
});