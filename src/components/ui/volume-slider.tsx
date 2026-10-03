import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const THUMB_SIZE = 22;
const TOUCHABLE_HEIGHT = 44;
const TRACK_HEIGHT = 6;
const STEP = 0.1;

type VolumeSliderProps = {
  /** Current value, 0 → 1. */
  value: number;
  /** Continuous updates while dragging (0 → 1). */
  onChange: (value: number) => void;
  /** Fired once when the drag finishes — good place for a preview beep. */
  onRelease?: (value: number) => void;
  /** When false the slider is dimmed and ignores input. */
  enabled?: boolean;
  accessibilityLabel?: string;
};

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

/**
 * A draggable volume slider built on gesture-handler + reanimated (no extra
 * dependency). Works with a touch drag and with screen-reader adjust actions.
 */
export function VolumeSlider({
  value,
  onChange,
  onRelease,
  enabled = true,
  accessibilityLabel,
}: VolumeSliderProps) {
  const theme = useTheme();
  const [trackWidth, setTrackWidth] = useState(0);

  /** Thumb travel in px: track minus the thumb's own width. */
  const travel = Math.max(trackWidth - THUMB_SIZE, 1);

  const progress = useSharedValue(value);
  const startOffset = useSharedValue(value);

  // Keep the animated value in sync with the outside world (e.g. Reset).
  useEffect(() => {
    progress.value = value;
    startOffset.value = value;
  }, [progress, startOffset, value]);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  }, []);

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .enabled(enabled)
        // Only claim horizontal drags, so vertical scrolling on the settings
        // screen still works when the finger starts on the slider.
        .activeOffsetX([-8, 8])
        .onStart((event) => {
          const next = clamp01(event.x / travel);
          progress.value = next;
          startOffset.value = next;
          runOnJS(onChange)(next);
        })
        .onUpdate((event) => {
          const next = clamp01(event.x / travel);
          progress.value = next;
          runOnJS(onChange)(next);
        })
        .onEnd(() => {
          if (onRelease) runOnJS(onRelease)(progress.value);
        }),
    [enabled, travel, onChange, onRelease, progress, startOffset],
  );

  // A quick tap anywhere on the track jumps straight to that value.
  const tap = useMemo(
    () =>
      Gesture.Tap()
        .enabled(enabled)
        .onEnd((event) => {
          const next = clamp01(event.x / travel);
          progress.value = next;
          startOffset.value = next;
          runOnJS(onChange)(next);
          if (onRelease) runOnJS(onRelease)(next);
        }),
    [enabled, travel, onChange, onRelease, progress, startOffset],
  );

  const gesture = useMemo(() => Gesture.Race(pan, tap), [pan, tap]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` }));
  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * travel }],
  }));

  return (
    <View
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(value * 100) }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={(event) => {
        if (!enabled) return;
        const delta = event.nativeEvent.actionName === 'increment' ? STEP : -STEP;
        onChange(clamp01(value + delta));
      }}
      style={[styles.wrapper, !enabled && styles.disabled]}>
      <GestureDetector gesture={gesture}>
        <View style={styles.touchable} onLayout={handleLayout}>
          <View style={[styles.track, { backgroundColor: theme.backgroundSelected }]}>
            <Animated.View
              style={[
                styles.fill,
                { experimental_backgroundImage: `linear-gradient(90deg, ${theme.accent}, #F0C674)` },
                fillStyle,
              ]}
            />
          </View>

          <Animated.View
            style={[styles.thumb, { backgroundColor: theme.text, borderColor: theme.background }, thumbStyle]}
          />
        </View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  disabled: {
    opacity: 0.4,
  },
  touchable: {
    height: TOUCHABLE_HEIGHT,
    justifyContent: 'center',
  },
  track: {
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: TRACK_HEIGHT / 2,
  },
  thumb: {
    position: 'absolute',
    left: 0,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    borderWidth: 2,
    marginLeft: -Spacing.half,
  },
});