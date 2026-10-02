import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ChoiceButtonProps = {
  /** Button text. */
  label: string;
  /** Optional one-liner shown under the label. */
  hint?: string;
  /** Small marker on the left, e.g. "A" or "B". */
  badge?: string;
  onPress: () => void;
};

/** A styled, tappable story choice. */
export function ChoiceButton({ label, hint, badge, onPress }: ChoiceButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={hint ? `${label}. ${hint}` : label}
      onPress={onPress}
      style={styles.pressable}>
      {({ pressed }) => (
        <View
          style={[
            styles.container,
            {
              backgroundColor: pressed ? theme.backgroundSelected : theme.backgroundElement,
              borderColor: pressed ? theme.accent : theme.border,
            },
          ]}>
          {badge ? (
            <View style={[styles.badge, { backgroundColor: theme.accentSoft }]}>
              <ThemedText type="smallBold" themeColor="accent">
                {badge}
              </ThemedText>
            </View>
          ) : null}

          <View style={styles.labels}>
            <ThemedText style={styles.label}>{label}</ThemedText>
            {hint ? (
              <ThemedText type="small" themeColor="textSecondary">
                {hint}
              </ThemedText>
            ) : null}
          </View>

          <SymbolView
            name={{ ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' }}
            size={18}
            tintColor={theme.accent}
          />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    borderRadius: 18,
    borderWidth: 1,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labels: {
    flex: 1,
    gap: Spacing.half,
  },
  label: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
});
