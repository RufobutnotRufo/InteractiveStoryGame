import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const TRACK_WIDTH = 52;
const TRACK_HEIGHT = 30;
const THUMB_SIZE = 22;
const THUMB_INSET = (TRACK_HEIGHT - THUMB_SIZE) / 2;
const TRAVEL = TRACK_WIDTH - THUMB_SIZE - THUMB_INSET * 2;

type ToggleSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
};

/** A themed, animated on/off switch used by the settings screen. */
export function ToggleSwitch({
  value,
  onValueChange,
  disabled = false,
  accessibilityLabel,
}: ToggleSwitchProps) {
  const theme = useTheme();
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, { duration: 180 });
  }, [progress, value]);

  const fillStyle = useAnimatedStyle(() => ({ opacity: progress.value }));
  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * TRAVEL }],
  }));

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: value, disabled }}
      disabled={disabled}
      hitSlop={Spacing.two}
      onPress={() => onValueChange(!value)}
      style={[styles.pressable, disabled && styles.disabled]}>
      <View
        style={[
          styles.track,
          { backgroundColor: theme.backgroundSelected, borderColor: theme.border },
        ]}>
        <Animated.View style={[styles.fill, { backgroundColor: theme.accent }, fillStyle]} />
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: TRACK_HEIGHT / 2,
  },
  disabled: {
    opacity: 0.4,
  },
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    borderWidth: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fill: {
    ...StyleSheet.absoluteFill,
    borderRadius: TRACK_HEIGHT / 2,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    marginLeft: THUMB_INSET,
    backgroundColor: '#FFFFFF',
  },
});