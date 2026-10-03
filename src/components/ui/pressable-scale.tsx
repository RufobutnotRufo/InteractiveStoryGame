import { type ReactNode } from 'react';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type PressableScaleProps = Omit<PressableProps, 'style' | 'children'> & {
  /** Plain style for the animated wrapper (style functions are not supported). */
  style?: StyleProp<ViewStyle>;
  /** How far to shrink while held. */
  scaleTo?: number;
  children?: ReactNode;
};

/**
 * A `Pressable` that scales down slightly while pressed — the shared "tap
 * feedback" used by menu cards, choice buttons and settings controls.
 */
export function PressableScale({ style, scaleTo = 0.97, children, ...rest }: PressableScaleProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      accessibilityRole="button"
      onPressIn={() => {
        scale.value = withTiming(scaleTo, { duration: 90 });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 140 });
      }}
      {...rest}>
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </Pressable>
  );
}