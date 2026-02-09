import { ThemedText } from '@/components/themed-text'
import { Image } from 'expo-image'
import React from 'react'
import { View } from 'react-native'

interface LocationMapProps {
    location: string;
}

const LocationMap = ({ location }: LocationMapProps) => {
    return (
        <View className='mb-24'>
            <ThemedText className='text-black font-bold text-base mb-4'>Location: <ThemedText className='font-normal opacity-70'>{location}</ThemedText></ThemedText>
            <View className='w-full h-48 rounded-3xl overflow-hidden relative'>
                <Image
                    source={require('@/assets/images/map_placeholder.png')}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                />
                <View className='absolute bottom-0 w-full bg-white/80 backdrop-blur-sm h-12 items-center justify-center'>
                    <ThemedText className='text-gray-600 font-medium'>View direction</ThemedText>
                </View>
            </View>
        </View>
    )
}

export default LocationMap
