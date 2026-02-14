import { ThemedText } from '@/components/themed-text'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Dimensions, Platform, View } from 'react-native'
import DateTime from '../date-time'

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

const EventCardCompact = ({ image, title, location, date, price }: EventCardCompactProps) => {
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
                    android: {
                        elevation: 4,
                    },
                }),
            }}
            className='bg-gray-50 border border-gray-200'
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
                    style={{
                        fontSize: 13,
                        fontWeight: '700',
                        color: '#1F2937',
                    }}
                    className='capitalize'
                >
                    {title}
                </ThemedText>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                    <Ionicons name="location-outline" size={11} color="#3d3d3dff" />
                    <ThemedText
                        numberOfLines={1}
                        className='text-sm'
                    >
                        {location}
                    </ThemedText>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 4,
                    }}
                >
                    <ThemedText
                        style={{
                            fontSize: 13,
                            fontWeight: '800',
                            color: '#004cff',
                        }}
                    >
                        ₦{price}
                    </ThemedText>
                </View>
            </View>
        </View>
    )
}

export default EventCardCompact
