import { ThemedText } from '@/components/themed-text'
import { Event } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View } from 'react-native'
import DateTime from '../date-time'
import { Link } from 'expo-router'
import Currency from '../currency'

interface SearchResultCardProps {
    event: Event
    imageUrl: string
}

const formatEventDate = (dateStr: string) => {
    try {
        const d = new Date(dateStr)
        const month = d.toLocaleString('en-US', { month: 'short' })
        const day = d.getDate()
        return { month, day }
    } catch {
        return { month: 'TBD', day: '--' }
    }
}

const SearchResultCard = ({ event, imageUrl }: SearchResultCardProps) => {
    const { month, day } = formatEventDate(event.date)

    return (
        <Link href={`/${event.slug}`} asChild>
          <View className="mb-3 bg-white rounded-2xl border border-gray-100">
            <View className="flex-row">
                {/* Image Section */}
                <View className="relative w-28 h-28">
                    <Image
                        source={{ uri: imageUrl }}
                        contentFit="cover"
                        style={{ width: '100%', height: '100%', borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}
                    />

                    {/* Gradient overlay */}
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.4)']}
                        className="absolute inset-0"
                    />

                    {/* Date badge */}
                    <View className="absolute top-2 left-2 bg-white/95 rounded-lg px-2 py-1 items-center min-w-[38px]">
                        <ThemedText className="text-sm font-extrabold text-primary leading-4">
                            {day}
                        </ThemedText>
                        <ThemedText className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide">
                            {month}
                        </ThemedText>
                    </View>
                </View>

                {/* Details Section */}
                <View className="flex-1 px-3 py-2.5 justify-between">
                    {/* Event name */}
                    <ThemedText
                        numberOfLines={2}
                        className="font-bold capitalize text-gray-900 text-[15px] leading-5"
                    >
                        {event.name}
                    </ThemedText>

                    {/* Info rows */}
                    <View className="gap-1.5 flex-row">
                        {/* Time */}
                        {event.time && (
                            <View className="flex-row items-center gap-1.5">
                                <View className="w-4 h-4 bg-blue-50 rounded-full items-center justify-center">
                                    <Ionicons name="time-outline" size={10} color="#004cff" />
                                </View>
                                <ThemedText className="text-gray-600 text-xs">
                                    {event.time}
                                </ThemedText>
                            </View>
                        )}

                        {/* Location */}
                        <View className="flex-row items-center gap-1.5">
                            <View className="w-4 h-4 bg-purple-50 rounded-full items-center justify-center">
                                <Ionicons name="location-outline" size={10} color="#8B5CF6" />
                            </View>
                            <ThemedText
                                numberOfLines={1}
                                className="text-gray-600 text-xs flex-1"
                            >
                                {event.city || 'Location TBA'}
                            </ThemedText>
                        </View>
                    </View>

                    <View className="flex-row items-center gap-1.5">
                        <ThemedText
                            numberOfLines={1}
                            className="text-gray-600 text-xs flex-1"
                        >
                             N2000 
                        </ThemedText>
                    </View>
                </View>

                {/* Arrow indicator */}
                <View className="items-center justify-center pr-3">
                    <View className="w-6 h-6 bg-gray-50 rounded-full items-center justify-center">
                        <Ionicons name="chevron-forward" size={12} color="#9CA3AF" />
                    </View>
                </View>
            </View>
          </View>
        </Link>
    )
}

export default SearchResultCard
