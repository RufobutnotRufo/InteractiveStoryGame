import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TagChipProps = {
  label: string;
  icon?: ComponentProps<typeof SymbolView>['name'];
  /** Uses the accent tint instead of the neutral surface. */
  accent?: boolean;
  /** Explicit color for the chip text/background tint. */
  color?: string;
};

/** Small pill used for genres, play time and other metadata. */
export function TagChip({ label, icon, accent = false, color }: TagChipProps) {
  const theme = useTheme();
  const tint = color ?? theme.accent;

  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: accent ? tint : theme.backgroundElement,
          borderColor: accent ? tint : theme.border,
        },
      ]}>
      {icon ? <SymbolView name={icon} size={12} tintColor={accent ? theme.onAccent : tint} /> : null}
      <ThemedText
        type="smallBold"
        style={[styles.label, { color: accent ? theme.onAccent : tint }]}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: 999,
    borderWidth: 1,
  },
  label: {
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});