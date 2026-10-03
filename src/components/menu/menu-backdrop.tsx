import { StyleSheet, View } from 'react-native';

/**
 * Purely decorative gradient wash behind the main menu. `pointerEvents="none"`
 * so it never intercepts taps. Uses the same technique as the rest of the app
 * (`experimental_backgroundImage` linear-gradients — no extra dependency).
 */
export function MenuBackdrop() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={styles.topWash} />
      <View style={styles.bottomWash} />
    </View>
  );
}

const styles = StyleSheet.create({
  topWash: {
    ...StyleSheet.absoluteFill,
    experimental_backgroundImage:
      'linear-gradient(165deg, rgba(110,139,255,0.30) 0%, rgba(110,139,255,0.06) 42%, rgba(11,13,18,0) 68%)',
  },
  bottomWash: {
    ...StyleSheet.absoluteFill,
    experimental_backgroundImage:
      'linear-gradient(0deg, rgba(240,198,116,0.14) 0%, rgba(240,198,116,0.03) 30%, rgba(11,13,18,0) 55%)',
  },
});