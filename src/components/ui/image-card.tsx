import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { useState, type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { StoryImage } from '@/data/stories';
import { useTheme } from '@/hooks/use-theme';

type ImageCardProps = {
  source?: StoryImage;
  /** width / height, e.g. 16 / 9. */
  ratio?: number;
  /** Label shown when the image is missing or fails to load. */
  placeholderLabel?: string;
  style?: StyleProp<ViewStyle>;
  /** Overlaid content (scrim, caption, badge…). */
  children?: ReactNode;
};

/**
 * Image container with a built-in fallback: if the art is missing or the URL
 * fails (offline, dead host…), it degrades to a themed placeholder block
 * instead of an empty hole in the layout.
 */
export function ImageCard({
  source,
  ratio = 16 / 9,
  placeholderLabel = 'No artwork yet',
  style,
  children,
}: ImageCardProps) {
  const theme = useTheme();
  const [failed, setFailed] = useState(false);

  const showPlaceholder = source == null || failed;

  return (
    <View
      style={[
        styles.frame,
        { aspectRatio: ratio, backgroundColor: theme.backgroundElement, borderColor: theme.border },
        style,
      ]}>
      {showPlaceholder ? (
        <View style={styles.placeholder}>
          <SymbolView
            name={{ ios: 'photo', android: 'image', web: 'image' }}
            size={28}
            tintColor={theme.textSecondary}
          />
          <ThemedText type="small" themeColor="textSecondary">
            {placeholderLabel}
          </ThemedText>
        </View>
      ) : (
        <Image
          source={source}
          style={styles.image}
          contentFit="cover"
          transition={220}
          onError={() => setFailed(true)}
        />
      )}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
});