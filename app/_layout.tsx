import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

import { useColorScheme } from '../hooks/use-color-scheme';
import { useNotificationSetup } from '@/hooks/useNotificationSetup';
import { useThemeStore } from '@/store/theme-store';

import '../global.css';
import { SessionProvider, useSession } from '@/Provider/session-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PaystackCustomProvider from '@/Provider/paystack-provider';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Lato-Black': require('../assets/fonts/Lato-Black.ttf'),
    'Lato-BlackItalic': require('../assets/fonts/Lato-BlackItalic.ttf'),
    'Lato-BoldItalic': require('../assets/fonts/Lato-BoldItalic.ttf'),
    'Lato-Italic': require('../assets/fonts/Lato-Italic.ttf'),
    'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
    'Lato-LightItalic': require('../assets/fonts/Lato-LightItalic.ttf'),
    'Lato-Thin': require('../assets/fonts/Lato-Thin.ttf'),
    'Lato-ThinItalic': require('../assets/fonts/Lato-ThinItalic.ttf'),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <PaystackCustomProvider>
        <SessionProvider>
          <RootLayoutNav fontsLoaded={fontsLoaded} />
        </SessionProvider>
      </PaystackCustomProvider>
    </QueryClientProvider>
  );
}

function NotificationSetup() {
  useNotificationSetup();
  return null;
}

function RootLayoutNav({ fontsLoaded }: { fontsLoaded: boolean }) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const storedScheme = useThemeStore((state) => state.colorScheme);
  const { session, isLoading } = useSession();

  // Sync NativeWind with persisted theme on mount
  useEffect(() => {
    setColorScheme(storedScheme);
  }, [storedScheme, setColorScheme]);

  const appReady = fontsLoaded && !isLoading;

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      {session && <NotificationSetup />}
      <Stack>
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(secured)" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!session}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </>
  );
}
