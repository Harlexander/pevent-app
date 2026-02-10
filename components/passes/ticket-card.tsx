import { ThemedText } from '@/components/themed-text'
import { TicketBought } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import DateTime from '../date-time'

interface TicketCardProps {
    ticket: TicketBought
    imageUrl: string
    onPress: () => void
}

const formatEventDate = (dateStr: string) => {
    try {
        const d = new Date(dateStr)
        const month = d.toLocaleString('en-US', { month: 'short' })
        const day = d.getDate()
        const weekday = d.toLocaleString('en-US', { weekday: 'short' })
        return { month, day, weekday }
    } catch {
        return { month: 'TBD', day: '--', weekday: '---' }
    }
}

const TicketCard = ({ ticket, imageUrl, onPress }: TicketCardProps) => {
    const event = ticket.ticket.event
    const { month, day, weekday } = formatEventDate(event.date)
    const isPast = new Date(event.date) < new Date()

    console.log(imageUrl)
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className="mb-4"
        >
            <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                {/* Top Section: Image with gradient overlay */}
                <View className="relative h-32">
                    <Image
                        source={{ uri: imageUrl }}
                        contentFit="cover"
                        style={{ width: '100%', height: '100%' }}
                    />

                    {/* Gradient overlay */}
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.6)']}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    />

                    {/* Date badge - top left */}
                    <DateTime day={day} month={month} />

                    {/* Past event badge - top right */}
                    {isPast && (
                        <View className="absolute top-3 right-3 bg-gray-800/90 rounded-lg px-3 py-1.5">
                            <ThemedText className="text-[10px] font-bold text-white uppercase tracking-widest">
                                Ended
                            </ThemedText>
                        </View>
                    )}

                    {/* Event name - bottom overlay */}
                    <View className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                        <ThemedText
                            numberOfLines={1}
                            className="text-white text-base font-bold capitalize"
                        >
                            {event.name}
                        </ThemedText>
                    </View>
                </View>

                {/* Bottom Section: Details */}
                <View className="px-4 py-3 gap-2.5">
                    {/* Date & Time row */}
                    <View className="flex-row items-center gap-1.5">
                        <View className="w-5 h-5 bg-blue-50 rounded-full items-center justify-center">
                            <Ionicons name="calendar-outline" size={12} color="#004cff" />
                        </View>
                        <ThemedText className="text-sm text-gray-700 font-medium">
                            {weekday}, {month} {day}
                        </ThemedText>
                        {event.time && (
                            <>
                                <ThemedText className="text-sm text-gray-300">•</ThemedText>
                                <ThemedText className="text-sm text-gray-600">
                                    {event.time}
                                </ThemedText>
                            </>
                        )}
                    </View>

                    {/* Location row */}
                    {event.city && (
                        <View className="flex-row items-center gap-1.5">
                            <View className="w-5 h-5 bg-purple-50 rounded-full items-center justify-center">
                                <Ionicons name="location-outline" size={12} color="#8B5CF6" />
                            </View>
                            <ThemedText
                                numberOfLines={1}
                                className="text-sm text-gray-700 flex-1"
                            >
                                {event.city}{event.state ? `, ${event.state}` : ''}
                            </ThemedText>
                        </View>
                    )}

                    {/* Divider */}
                    <View className="h-px bg-gray-100 my-0.5" />

                    {/* Ticket type & arrow */}
                    <View className="flex-row items-center justify-between">
                        <View className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg px-3 py-1.5">
                            <ThemedText className="text-xs font-bold text-primary uppercase tracking-wide">
                                {ticket.ticket.name}
                            </ThemedText>
                        </View>

                        <View className="w-7 h-7 bg-gray-50 rounded-full items-center justify-center">
                            <Ionicons name="chevron-forward" size={14} color="#9CA3AF" />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default TicketCard
