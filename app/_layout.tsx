import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

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

  return (
      <SessionProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <QueryClientProvider client={queryClient}>
           <PaystackCustomProvider>
              <RootLayoutNav />
              <StatusBar style="auto" />
              <SplashScreenController />
           </PaystackCustomProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </SessionProvider>  
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



