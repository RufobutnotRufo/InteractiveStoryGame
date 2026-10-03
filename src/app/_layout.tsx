import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Colors } from '@/constants/theme';
import { SettingsProvider } from '@/context/settings-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    // GestureHandlerRootView is required for the volume sliders' pan gestures.
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* The quest is intentionally always dark for an immersive story feel. */}
      <ThemeProvider value={DarkTheme}>
        <SettingsProvider>
          <AnimatedSplashOverlay />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: Colors.dark.background },
              animation: 'slide_from_right',
            }}>
            {/* Screen titles are set per-route so native headers read correctly. */}
            <Stack.Screen name="index" options={{ title: 'Stories' }} />
            <Stack.Screen name="play" options={{ title: 'Story' }} />
            {/*
              Settings opens as a bottom sheet. `modal` presentation gives the
              menu → settings → menu flow a smooth, non-linear transition.
            */}
            <Stack.Screen
              name="settings"
              options={{
                title: 'Settings',
                presentation: 'modal',
                animation: 'slide_from_bottom',
              }}
            />
          </Stack>
        </SettingsProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

