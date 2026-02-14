import { Stack } from 'expo-router'
import React from 'react'

const EventLayout = () => {
  return (
    <Stack screenOptions={{
      headerShown : false
    }}>
      <Stack.Screen name="[slug]/index" />
      <Stack.Screen name="[slug]/checkout"/>
    </Stack>
  )
}

export default EventLayout
