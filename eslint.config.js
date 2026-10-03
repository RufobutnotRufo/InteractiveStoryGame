// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    // Reanimated shared values are *designed* to be mutated (`shared.value = x`).
    // React Compiler's `react-hooks/immutability` rule cannot know that, so it is
    // switched off for the components that drive gestures and animations.
    files: [
      "src/components/ui/pressable-scale.tsx",
      "src/components/ui/volume-slider.tsx",
    ],
    rules: {
      "react-hooks/immutability": "off",
    },
  },
]);

