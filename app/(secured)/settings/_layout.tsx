import { Stack } from 'expo-router'
import React from 'react'

const SettingsLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="profile-details" options={{ headerShown: false }} />
            <Stack.Screen name="security" options={{ headerShown: false }} />
            <Stack.Screen name="wallet" options={{ headerShown: false }} />
            <Stack.Screen name="services" options={{ headerShown: false }} />
            <Stack.Screen name="invite" options={{ headerShown: false }} />
            <Stack.Screen name="help-center" options={{ headerShown: false }} />
        </Stack>
    )
}

export default SettingsLayout
