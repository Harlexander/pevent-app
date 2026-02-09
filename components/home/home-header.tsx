import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React from 'react'
import { View } from 'react-native'
import { useUserStore } from '@/store/user-store'

const HomeHeader = () => {
    const { user } = useUserStore()
    return (
        <View className='flex-row justify-between items-center mb-6'>
            <View className='flex-row gap-3 items-center'>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/300' }}
                    style={{ width: 45, height: 45, borderRadius: 25 }}
                />
                <View>
                    <ThemedText className='text-lg font-bold text-black'>Hi, {user?.firstName}</ThemedText>
                    <View className='flex-row items-center gap-1'>
                        <ThemedText className='text-gray-500 text-sm'>{user?.state}, {user?.country}</ThemedText>
                        <Ionicons name="chevron-down" size={14} color="gray" />
                    </View>
                </View>
            </View>

            <View className='relative'>
                <View className='bg-primary w-2.5 h-2.5 rounded-full absolute top-0 right-0 z-10 border-2 border-white' />
                <FontAwesome name="bell" size={24} color="#000020" />
            </View>
        </View>
    )
}

export default HomeHeader
