import { ThemedText } from '@/components/themed-text'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Dimensions, Platform, View } from 'react-native'
import DateTime from '../date-time'
import Currency from '../currency'

const SCREEN_WIDTH = Dimensions.get('window').width
const CARD_GAP = 12
const HORIZONTAL_PADDING = 20
const CARD_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - CARD_GAP) / 2

interface EventCardCompactProps {
    image: any
    title: string
    location: string
    date: string
    price: string | number
    time: string
}

const formatDate = (dateStr: string) => {
    try {
        const d = new Date(dateStr)
        const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase()
        const day = d.getDate()
        return { month, day }
    } catch {
        return { month: 'TBD', day: '--' }
    }
}

const EventCardCompact = ({ image, title, location, date, price, time }: EventCardCompactProps) => {
    const { colorScheme } = useColorScheme()
    const { month, day } = formatDate(date)

    return (
        <View
            style={{
                width: CARD_WIDTH,
                borderRadius: 16,
                overflow: 'hidden',
                ...Platform.select({
                    ios: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 12,
                    },
                }),
            }}
            className='bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700'
        >
            {/* Image Section */}
            <View style={{ width: '100%', height: 130, position: 'relative' }}>
                <Image
                    source={image}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                />

                {/* Gradient overlay */}
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.4)']}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 50,
                    }}
                />

                {/* Date badge */}
                <DateTime day={day} month={month} />
            </View>

            {/* Info Section */}
            <View style={{ padding: 10, gap: 4 }}>
                <ThemedText
                    numberOfLines={1}
                    className='capitalize dark:text-white text-black text-sm'
                >
                    {title}
                </ThemedText>

                <View className='flex-row gap-4'>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                        <Ionicons name="location-outline" size={11} color={colorScheme === 'dark' ? '#d1d5db' : '#3d3d3dff'} />
                        <ThemedText
                            numberOfLines={1}
                            className='text-sm text-gray-600 dark:text-gray-400 capitalize'
                        >
                            {location.length > 15 ? location.slice(0, 15) + '...' : location}
                        </ThemedText>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                        <Ionicons name="time-outline" size={11} color={colorScheme === 'dark' ? '#d1d5db' : '#3d3d3dff'} />
                        <ThemedText
                            numberOfLines={1}
                            className='text-sm text-gray-600 dark:text-gray-400'
                        >
                            {time}
                        </ThemedText>
                    </View>
                </View>

                <View
                >
                    {
                        price === "Unlisted" ? (
                            <ThemedText
                                numberOfLines={1}
                                className='text-sm text-gray-600 dark:text-gray-400'
                            >
                                Unlisted
                            </ThemedText>
                        ) : (
                            <Currency
                            >
                                {price}
                            </Currency>
                        )
                    }
                </View>
            </View>
        </View>
    )
}

export default EventCardCompact
