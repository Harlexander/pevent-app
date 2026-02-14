import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';

import { useColorScheme } from '../hooks/use-color-scheme';

import '../global.css';
import { SessionProvider, useSession } from '@/Provider/session-provider';
import { SplashScreenController } from '@/components/splash';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PaystackCustomProvider from '@/Provider/paystack-provider';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

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

  if (!fontsLoaded) {
    return null;
  }

  return (
          <QueryClientProvider client={queryClient}>
           <PaystackCustomProvider>
                  <SessionProvider>

              <RootLayoutNav />
              <StatusBar style="auto" />
              <SplashScreenController />
                    </SessionProvider>

           </PaystackCustomProvider>

          </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { session } = useSession()  

  return (
      <Stack>
        <Stack.Protected guard={!!session}> 
          <Stack.Screen name="(secured)" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!session}> 
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
  );
}



