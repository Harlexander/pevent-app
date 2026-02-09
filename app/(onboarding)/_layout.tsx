import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Slot, Stack } from 'expo-router';
import React from 'react'

const OnboardingLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="reset-password" options={{ headerShown: false }} />
    </Stack>
  )
};

export default OnboardingLayout;