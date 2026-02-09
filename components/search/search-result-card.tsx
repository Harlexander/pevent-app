import Currency from '@/components/currency'
import { ThemedText } from '@/components/themed-text'
import { Event } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React from 'react'
import { View } from 'react-native'

interface SearchResultCardProps {
    event: Event;
    imageUrl: string;
}

const SearchResultCard = ({ event, imageUrl }: SearchResultCardProps) => {
    return (
        <View className='flex-row gap-4 py-2 border-b border-gray-200 bg-white'>
            {/* Image */}
            <View className='w-1/4 h-20 rounded-xl overflow-hidden'>
                <Image
                    source={{ uri: imageUrl }}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                />
            </View>

            {/* Details */}
            <View className='flex-1 justify-center gap-1'>
                <ThemedText className='font-semibold capitalize text-black leading-6'>
                    {event.name}
                </ThemedText>

                <View className='flex-row items-center gap-1 mt-1'>
                    <Ionicons name="time" size={12} color="#3b82f6" />
                    <ThemedText className='text-gray-500 text-xs'>{event.time || 'TBA'}</ThemedText>
                </View>

                <View className='flex-row items-center gap-1'>
                    <Ionicons name="location" size={12} color="#3b82f6" />
                    <ThemedText className='text-gray-500 text-xs'>{event.city || 'Location TBA'}</ThemedText>
                </View>
            </View>
        </View>
    )
}

export default SearchResultCard
