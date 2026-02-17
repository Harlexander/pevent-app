import { ThemedText } from '@/components/themed-text'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Image } from 'expo-image'
import React from 'react'
import { View } from 'react-native'
import MapIcon from '@/assets/icons/map.svg';
import CalendarIcon from '@/assets/icons/calender.svg';
import Currency from '../currency'

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
                            <ThemedText className="text-white mb-2 capitalize line-clamp-1">
                                {title}
                            </ThemedText>

                            <View className="flex-row items-center gap-1 mb-1">
                                <MapIcon width={13} height={13} fill="#ffffffff" />
                                <ThemedText className="text-white text-xs opacity-80 line-clamp-1 capitalize">
                                    {location}
                                </ThemedText>
                            </View>

                            <View className="flex-row items-center gap-1">
                                <CalendarIcon width={13} height={13} color="#fff" />
                                <ThemedText className="text-white text-xs opacity-80">
                                    {date}
                                </ThemedText>
                            </View>
                        </View>

                        {
                            price === 'Unlisted' ? (
                                <></>
                            ) : (
                                <View>
                                    <ThemedText className="text-white text-xs opacity-70 mb-1">
                                        Start from
                                    </ThemedText>
                                    <Currency className="text-white text-lg font-bold">{price}</Currency>
                                </View>
                            )
                        }
                    </View>
                    <BlurView intensity={80} tint="dark" className="absolute inset-0" />
                </View>
            </View>
        </View>
    )
}

export default EventCard
