import BackButton from '@/components/back-button'
import { ThemedText } from '@/components/themed-text'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

interface EventHeaderProps {
    images: string[];
}

const EventHeader = ({ images }: EventHeaderProps) => {
    const router = useRouter()

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
                    className='w-10 h-10 bg-white/30 rounded-full items-center justify-center backdrop-blur-md'
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    className='w-10 h-10 bg-white/30 rounded-full items-center justify-center backdrop-blur-md'
                >
                    <Ionicons name="heart-outline" size={24} color="white" />
                </TouchableOpacity>
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
