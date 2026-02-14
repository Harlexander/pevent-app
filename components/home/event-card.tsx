import { ThemedText } from '@/components/themed-text'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Image } from 'expo-image'
import React from 'react'
import { View } from 'react-native'

interface EventCardProps {
    image: any
    title: string
    location: string
    date: string
    price: string | number
    fullWidth?: boolean
}

const EventCard = ({ image, title, location, date, price, fullWidth = false }: EventCardProps) => {
    return (
        <View className={`${fullWidth ? 'w-full' : 'w-[260]'} h-[180] rounded-3xl overflow-hidden`}>
            <Image
                source={image}
                style={{ width: '100%', height: '100%', position: 'absolute' }}
                contentFit="cover"
            />

            <View className="absolute bottom-0 w-full p-4">
                <View className="overflow-hidden rounded-xl">
                    <View className="flex-row justify-between items-end p-3 rounded-xl z-20">
                        <View className="flex-1">
                            <ThemedText className="text-white text-lg font-bold mb-2 capitalize line-clamp-1">
                                {title}
                            </ThemedText>

                            <View className="flex-row items-center gap-1 mb-1">
                                <Ionicons
                                    name="location-outline"
                                    size={14}
                                    color="rgba(255,255,255,0.8)"
                                />
                                <ThemedText className="text-white text-xs opacity-80 line-clamp-1">
                                    {location}
                                </ThemedText>
                            </View>

                            <View className="flex-row items-center gap-1">
                                <Ionicons
                                    name="calendar-outline"
                                    size={14}
                                    color="rgba(255,255,255,0.8)"
                                />
                                <ThemedText className="text-white text-xs opacity-80">
                                    {date}
                                </ThemedText>
                            </View>
                        </View>

                        <View>
                            <ThemedText className="text-white text-xs opacity-70 mb-1">
                                Start from
                            </ThemedText>
                            <ThemedText className="text-white text-lg font-bold">₦{price}</ThemedText>
                        </View>
                    </View>
                    <BlurView intensity={80} tint="dark" className="absolute inset-0" />
                </View>
            </View>
        </View>
    )
}

export default EventCard
