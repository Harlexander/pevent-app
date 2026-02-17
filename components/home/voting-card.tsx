import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React from 'react'
import { View } from 'react-native'

interface VotingCardProps {
    image: any;
    title: string;
    time: string;
    date: string;
    price: string;
}

const VotingCard = ({ image, title, time, date, price }: VotingCardProps) => {
    const { colorScheme } = useColorScheme()
    return (
        <View className='flex-row bg-white dark:bg-dark-bg rounded-2xl p-3 mb-4 border border-gray-100 dark:border-gray-700'>
            <View className='overflow-hidden rounded-xl w-1/2 h-[100px]'>
                <Image
                    source={image}
                    style={{ width: "100%", height: "100%", borderRadius: 12 }}
                    contentFit="cover"
                />
            </View>

            <View className='flex-1 ml-3 justify-betwee gap-3'>
                <View>
                    <ThemedText className='text-blue-800 dark:text-blue-200 font-bold text-base mb-2'>{title}</ThemedText>

                    <View className='flex-row items-center gap-1 mb-1'>
                        <Ionicons name="time-outline" size={12} color={colorScheme === 'dark' ? '#9ca3af' : 'gray'} />
                        <ThemedText className='text-gray-500 text-xs'>{time}</ThemedText>
                    </View>

                    <View className='flex-row items-center gap-1'>
                        <Ionicons name="calendar-outline" size={12} color={colorScheme === 'dark' ? '#9ca3af' : 'gray'} />
                        <ThemedText className='text-gray-500 text-xs'>{date}</ThemedText>
                    </View>
                </View>

                <View className='flex-row items-end gap-1'>
                    <ThemedText className='text-black dark:text-white font-bold text-base'>{price}</ThemedText>
                    <ThemedText className='text-gray-400 text-xs mb-[2px]'>/vote</ThemedText>
                </View>
            </View>
        </View>
    )
}

export default VotingCard
