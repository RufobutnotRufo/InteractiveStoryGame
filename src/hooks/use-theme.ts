/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useTheme() {
  const scheme = useColorScheme();
  // The app is dark-first: anything that is not explicitly "light" is dark.
  return Colors[scheme === 'light' ? 'light' : 'dark'];
}
