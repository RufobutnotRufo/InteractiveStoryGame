import { SymbolView } from 'expo-symbols';
import type { ComponentProps, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SymbolName = ComponentProps<typeof SymbolView>['name'];

/** Inner row: icon + label/description + a trailing control. */
export function SettingsRow({
  title,
  description,
  icon,
  control,
  children,
  disabled = false,
}: {
  title: string;
  description?: string;
  icon?: SymbolName;
  /** Trailing control (e.g. a switch). */
  control?: ReactNode;
  /** Full-width content below the row (e.g. a slider). */
  children?: ReactNode;
  disabled?: boolean;
}) {
  const theme = useTheme();

  return (
    <View style={[styles.row, disabled && styles.disabled]}>
      <View style={styles.headline}>
        {icon ? (
          <View style={[styles.iconBadge, { backgroundColor: theme.accentSoft }]}>
            <SymbolView name={icon} size={16} tintColor={theme.accent} />
          </View>
        ) : null}

        <View style={styles.labels}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          {description ? (
            <ThemedText type="small" themeColor="textSecondary">
              {description}
            </ThemedText>
          ) : null}
        </View>

        {control ? <View style={styles.control}>{control}</View> : null}
      </View>

      {children ? <View style={styles.extra}>{children}</View> : null}
    </View>
  );
}

/** Full-width group: a heading plus rows, on a raised surface. */
export function SettingsGroup({ title, children }: { title: string; children: ReactNode }) {
  const theme = useTheme();

  return (
    <View style={styles.groupWrapper}>
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.groupTitle}>
        {title}
      </ThemedText>
      <View
        style={[
          styles.group,
          { backgroundColor: theme.backgroundElement, borderColor: theme.border },
        ]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  groupWrapper: {
    gap: Spacing.two,
  },
  groupTitle: {
    fontSize: 12,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  group: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  row: {
    paddingVertical: Spacing.three,
    gap: Spacing.two,
  },
  disabled: {
    opacity: 0.5,
  },
  headline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labels: {
    flex: 1,
    gap: Spacing.half,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  control: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  extra: {
    paddingLeft: 34 + Spacing.three,
  },
});