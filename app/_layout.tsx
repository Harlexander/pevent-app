import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { useColorScheme } from '../hooks/use-color-scheme';
import { useNotificationSetup } from '@/hooks/useNotificationSetup';
import { useThemeStore } from '@/store/theme-store';
import { useGuestStore } from '@/store/guest-store';

import '../global.css';
import { SessionProvider, useSession } from '@/Provider/session-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PaystackCustomProvider from '@/Provider/paystack-provider';
import { ToastProvider } from '@/components/ui/toast';

SplashScreen.preventAutoHideAsync();

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

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
    'Jost-Regular': require('../assets/fonts/Jost-Regular.ttf'),
    'Jost-Medium': require('../assets/fonts/Jost-Medium.ttf'),
    'Jost-SemiBold': require('../assets/fonts/Jost-SemiBold.ttf'),
    'Jost-Bold': require('../assets/fonts/Jost-Bold.ttf'),
    'Jost-ExtraBold': require('../assets/fonts/Jost-ExtraBold.ttf'),
    'Jost-Black': require('../assets/fonts/Jost-Black.ttf'),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <PaystackCustomProvider>
        <SessionProvider>
          <ToastProvider>
            <RootLayoutNav fontsLoaded={fontsLoaded} />
          </ToastProvider>
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
  const { isGuest } = useGuestStore();

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
        <Stack.Protected guard={!!session || isGuest}>
          <Stack.Screen name="(secured)" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!session && !isGuest}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </>
  );
}
