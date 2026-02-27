import { ThemedText } from '@/components/themed-text'
import { useUserStore } from '@/store/user-store'
import { useGuestStore } from '@/store/guest-store'
import { endpoints } from '@/constants/endpoints'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useNotifications } from '@/hooks/query/useNotification'
import { EvilIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import NotificationIcon from '@/assets/icons/notification.svg'

const HomeHeader = () => {
    const { user } = useUserStore()
    const { isGuest } = useGuestStore()
    const { colorScheme } = useColorScheme()
    const router = useRouter()
    const { data } = useNotifications(!isGuest)

    const avatarSource =
        isGuest
            ? require('@/assets/logo.png')
            : user?.image
                ? { uri: user.image.startsWith('http') ? user.image : endpoints.IMAGE_URL + user.image }
                : { uri: 'https://i.pravatar.cc/300' }

    const unreadCount = data?.data.unreadCount || 0

    return (
        <View className="px-5 flex-row justify-between items-center mb-6">
            <View className="flex-row gap-3 items-center">
                <Image
                    source={avatarSource}
                    style={{ width: 45, height: 45, borderRadius: 25 }}
                />
                <View className="gap-1">
                    <ThemedText className="capitalize font-jost-semibold font-semibold text-blue-900 dark:text-white">
                        Hi, {isGuest ? 'Guest' : user?.firstName || 'there'}
                    </ThemedText>
                    {!isGuest && (
                        <View className="flex-row items-center gap-1">
                            <ThemedText className="text-gray-500 dark:text-gray-400 text-xs">
                                {user?.state}, {user?.country}
                            </ThemedText>
                        </View>
                    )}
                </View>
            </View>

            <View className="flex-row gap-3 items-center">
                <TouchableOpacity onPress={() => router.push('/search')} className="relative">
                    <EvilIcons
                        name="search"
                        size={30}
                        color={colorScheme === 'dark' ? '#d1d5db' : '#424242ff'}
                    />
                </TouchableOpacity>

                {!isGuest && (
                    <TouchableOpacity onPress={() => router.push('/notifications')} className="relative">
                        {unreadCount > 0 && (
                            <View className="bg-primary w-2.5 h-2.5 rounded-full absolute top-0 right-0 z-10 border-2 border-white dark:border-gray-900" />
                        )}
                        <NotificationIcon
                            width={30}
                            height={30}
                            fill={colorScheme === 'dark' ? '#ffffffff' : '#003577ff'}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default HomeHeader
