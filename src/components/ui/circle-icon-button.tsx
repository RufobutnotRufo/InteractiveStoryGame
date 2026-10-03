import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type CircleIconButtonProps = {
  icon: ComponentProps<typeof SymbolView>['name'];
  /** Accessibility label. */
  label: string;
  onPress: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

/** The shared round, bordered icon button (back, pause, settings…). */
export function CircleIconButton({ icon, label, onPress, size = 40, style }: CircleIconButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={Spacing.two}
      onPress={onPress}
      style={({ pressed }) => [
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.backgroundElement,
          borderColor: theme.border,
          opacity: pressed ? 0.7 : 1,
        },
        style,
      ]}>
      <SymbolView name={icon} size={18} tintColor={theme.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circle: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});