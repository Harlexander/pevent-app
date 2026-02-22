import { ThemedText } from '@/components/themed-text'
import { useFavoritesStore, FavoriteEvent } from '@/store/favorites-store'
import { Event } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { Share, TouchableOpacity, View } from 'react-native'

interface EventHeaderProps {
    images: string[];
    event?: Event;
}

const EventHeader = ({ images, event }: EventHeaderProps) => {
    const router = useRouter()
    const { isFavorite, toggleFavorite } = useFavoritesStore()

    const isFav = event ? isFavorite(event.id) : false

    const handleToggleFavorite = () => {
        if (!event) return
        const minPrice = event.tickets?.length
            ? Math.min(...event.tickets.map((t) => t.price))
            : 0
        const favoriteData: FavoriteEvent = {
            id: event.id,
            name: event.name,
            slug: event.slug,
            date: event.date,
            time: event.time,
            city: event.city ?? null,
            images: event.images,
            price: minPrice,
        }
        toggleFavorite(favoriteData)
    }

    const handleShare = async () => {
        if (!event) return
        await Share.share({
            message: `Check out ${event.name} on Pevent! https://pevent.ng/${event.slug}`,
        })
    }

    return (
        <View className='w-full h-[300px] relative top-0'>
            <Image
                source={images?.[0]}
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
            />
            {/* Header Icons */}
            <View className='absolute top-12 left-5 right-5 flex-row justify-between items-center z-10'>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className='w-10 h-10 bg-white/30 dark:bg-dark-bg/30 rounded-full items-center justify-center backdrop-blur-md'
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>

                <View className='flex-row gap-2'>
                    <TouchableOpacity
                        onPress={handleShare}
                        className='w-10 h-10 bg-white/30 dark:bg-dark-bg/30 rounded-full items-center justify-center backdrop-blur-md'
                    >
                        <Ionicons name="share-outline" size={22} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleToggleFavorite}
                        className='w-10 h-10 bg-white/30 dark:bg-dark-bg/30 rounded-full items-center justify-center backdrop-blur-md'
                    >
                        <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={24} color={isFav ? '#ef4444' : 'white'} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Gallery Thumbnails */}
            <View className='absolute bottom-5 left-5 flex-row gap-2'>
                {
                    images?.map((img: string, index: number) => (
                        <View key={index} className='w-16 h-16 rounded-xl overflow-hidden border-2 border-white'>
                            <Image source={img} style={{ width: '100%', height: '100%' }} />
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

export default EventHeader
