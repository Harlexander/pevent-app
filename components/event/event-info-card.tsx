import { ThemedText } from '@/components/themed-text'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'

interface EventInfoCardProps {
    date: string;
    time: string;
    location: string;
}

const EventInfoCard = ({ date, time, location }: EventInfoCardProps) => {
    return (
        <View className='bg-white rounded-2xl p-4 flex-row justify-between mb-6 border border-gray-100 shadow-lg shadow-blue-500/20'>
            {/* Time */}
            <View className='items-center flex-1 border-r border-gray-100'>
                <View className='flex-row items-center gap-1 mb-1'>
                    <ThemedText className='text-gray-400 text-xs'>Time</ThemedText>
                </View>
                <ThemedText className='text-blue-500 font-bold capitalize'>{time}</ThemedText>
            </View>

            {/* Date */}
            <View className='items-center flex-1 border-r border-gray-100'>
                <View className='flex-row items-center gap-1 mb-1'>
                    <ThemedText className='text-gray-400 text-xs'>Date</ThemedText>
                </View>
                <ThemedText className='text-blue-500 font-bold capitalize'>{date}</ThemedText>
            </View>

            {/* Location */}
            <View className='items-center flex-1'>
                <View className='flex-row items-center gap-1 mb-1'>
                    <ThemedText className='text-gray-400 text-xs'>Location</ThemedText>
                </View>
                <ThemedText className='text-blue-500 font-bold capitalize'>{location}</ThemedText>
            </View>
        </View>
    )
}

export default EventInfoCard
