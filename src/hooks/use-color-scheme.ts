import type { ColorSchemeName } from 'react-native';

/**
 * The quest is intentionally always dark for immersive storytelling, so the
 * scheme is pinned instead of following the device setting. To support light
 * mode again, replace this with:
 *
 *   export { useColorScheme } from 'react-native';
 */
export function useColorScheme(): ColorSchemeName {
  return 'dark';
}

