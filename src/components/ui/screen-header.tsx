import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { CircleIconButton } from '@/components/ui/circle-icon-button';
import { MaxContentWidth, Spacing } from '@/constants/theme';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  /** Renders a circular back button when provided. */
  onBack?: () => void;
  /** Optional right-hand controls (e.g. a settings or pause button). */
  right?: ReactNode;
};

/** Shared top bar: optional back button, a title block and optional actions. */
export function ScreenHeader({ title, subtitle, onBack, right }: ScreenHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        {onBack ? (
          <CircleIconButton
            label="Go back"
            icon={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
            onPress={onBack}
          />
        ) : null}

        <View style={styles.titles}>
          <ThemedText numberOfLines={1} style={styles.title}>
            {title}
          </ThemedText>
          {subtitle ? (
            <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
              {subtitle}
            </ThemedText>
          ) : null}
        </View>

        {right ? <View style={styles.right}>{right}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  titles: {
    flex: 1,
    gap: Spacing.half,
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
});