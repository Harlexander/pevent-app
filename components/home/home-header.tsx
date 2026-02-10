import { ThemedText } from '@/components/themed-text'
import { useUserStore } from '@/store/user-store'
import { endpoints } from '@/constants/endpoints'
import { EvilIcons, FontAwesome, Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

const HomeHeader = () => {
    const { user } = useUserStore()
    const router = useRouter()

    const avatarSource = user?.image
        ? { uri: user.image.startsWith('http') ? user.image : endpoints.IMAGE_URL + user.image }
        : { uri: 'https://i.pravatar.cc/300' }

    return (
        <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row gap-3 items-center">
                <Image
                    source={avatarSource}
                    style={{ width: 45, height: 45, borderRadius: 25 }}
                />
                <View>
                    <ThemedText className="text-lg font-bold text-black">
                        Hi, {user?.firstName || 'there'}
                    </ThemedText>
                    <View className="flex-row items-center gap-1">
                        <ThemedText className="text-gray-500 text-sm">
                            {user?.state}, {user?.country}
                        </ThemedText>
                        <Ionicons name="chevron-down" size={14} color="gray" />
                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={() => router.push('/notifications')} className="relative">
                <View className="bg-primary w-2.5 h-2.5 rounded-full absolute top-0 right-0 z-10 border-2 border-white" />
                <EvilIcons name="bell" size={30} color="#424242ff" />
            </TouchableOpacity>
        </View>
    )
}

export default HomeHeader
