import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Image } from 'expo-image'
import React from 'react'
import { View } from 'react-native'

const Index = () => {
  return (
    <View className='flex-1 bg-red-500'>
        <View className='flex-1 items-center h-28 justify-center bg-red-300'>
            <Image
                source={require('@/assets/logo.png')}
                style={{ width: 100, height: 100 }}
                contentFit='contain'
            />
            <ThemedText className='text-center text-2xl font-bold text-white'>
                Welcome to Pevent
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            </ThemedText>
            <ThemedText className='text-center text-red-500'>
                Lorem
            </ThemedText>
        </View>
    </View>
  )
}

export default Index