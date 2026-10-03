import { SymbolView } from 'expo-symbols';
import type { ComponentProps, ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { PressableScale } from './pressable-scale';

type SymbolName = NonNullable<ComponentProps<typeof SymbolView>['name']>;

/** primary = accent fill, secondary = raised surface, ghost = outline only. */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: SymbolName;
  /** Renders after the label instead of before it. */
  iconAfter?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  /** Optional trailing node (e.g. a badge). */
  children?: ReactNode;
};

/** Shared button used across the menu, the story footer and the settings. */
export function Button({
  label,
  onPress,
  variant = 'secondary',
  icon,
  iconAfter = false,
  disabled = false,
  style,
  children,
}: ButtonProps) {
  const theme = useTheme();

  const palette = {
    primary: { background: theme.accent, border: theme.accent, text: theme.onAccent },
    secondary: { background: theme.backgroundElement, border: theme.border, text: theme.text },
    ghost: { background: 'transparent', border: theme.border, text: theme.textSecondary },
  }[variant];

  const glyph = icon ? <SymbolView name={icon} size={18} tintColor={palette.text} /> : null;

  return (
    <PressableScale
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: palette.background,
          borderColor: palette.border,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}>
      <View style={styles.content}>
        {icon && !iconAfter ? glyph : null}
        <ThemedText type="smallBold" style={[styles.label, { color: palette.text }]}>
          {label}
        </ThemedText>
        {icon && iconAfter ? glyph : null}
        {children}
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  label: {
    fontSize: 16,
    letterSpacing: 0.3,
  },
});