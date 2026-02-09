import { ThemedText } from '@/components/themed-text'
import { Image } from 'expo-image'
import React from 'react'
import { View } from 'react-native'

interface EventGalleryProps {
    images: string[];
}

const EventGallery = ({ images = [] }: EventGalleryProps) => {
    if (!images || images.length === 0) return null;

    // Split images into two columns for masonry effect
    const col1 = images.filter((_, i) => i % 2 === 0);
    const col2 = images.filter((_, i) => i % 2 !== 0);

    return (
        <View className='mb-6'>
            <View className='flex-row flex-wrap justify-between'>
                {/* Column 1 */}
                <View className='w-[48%] gap-3'>
                    {col1.map((img, index) => (
                        <View key={`col1-${index}`} className={`w-full ${index % 2 === 0 ? 'h-40' : 'h-56'} rounded-xl overflow-hidden`}>
                            <Image source={{ uri: img }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
                        </View>
                    ))}
                </View>

                {/* Column 2 */}
                <View className='w-[48%] gap-3'>
                    {col2.map((img, index) => (
                        <View key={`col2-${index}`} className={`w-full ${index % 2 === 0 ? 'h-64' : 'h-32'} rounded-xl overflow-hidden`}>
                            <Image source={{ uri: img }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
                        </View>
                    ))}
                </View>
            </View>
        </View>
    )
}

export default EventGallery
