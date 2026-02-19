import BackButton from '@/components/back-button'
import NotificationDetailModal from '@/components/notifications/notification-detail-modal'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useMarkNotificationAsRead, useNotifications } from '@/hooks/query/useNotification'
import { Notification, NotificationType } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { NotificationListSkeleton } from '@/components/notifications/notification-skeleton'
import React, { useState } from 'react'
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const TYPE_CONFIG: Record<
    NotificationType,
    { icon: keyof typeof Ionicons.glyphMap; color: string; bg: string }
> = {
    general: { icon: 'notifications', color: '#3b82f6', bg: 'bg-blue-100' },
    event: { icon: 'calendar', color: '#3b82f6', bg: 'bg-blue-100' },
    ticket: { icon: 'ticket', color: '#3b82f6', bg: 'bg-blue-100' },
    payout: { icon: 'cash', color: '#3b82f6', bg: 'bg-blue-100' },
    voting: { icon: 'heart', color: '#3b82f6', bg: 'bg-blue-100' },
    wallet: { icon: 'wallet', color: '#3b82f6', bg: 'bg-blue-100' },
}

const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInMins = Math.floor(diffInMs / 60000)
    const diffInHours = Math.floor(diffInMs / 3600000)
    const diffInDays = Math.floor(diffInMs / 86400000)

    if (diffInMins < 1) return 'Just now'
    if (diffInMins < 60) return `${diffInMins}m ago`
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })
}

const NotificationItem = ({ item, onPress }: { item: Notification; onPress: () => void }) => {
    const config = TYPE_CONFIG[item.type]

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className={`flex-row gap-3 px-5 py-4 ${!item.read ? 'bg-blue-50/40 dark:bg-blue-900/30' : ''}`}
        >
            {item.image ? (
                <Image
                    source={{ uri: item.image }}
                    style={{ width: 48, height: 48, borderRadius: 12 }}
                    contentFit="cover"
                />
            ) : (
                <View
                    className={`w-12 h-12 rounded-xl items-center justify-center ${config.bg}`}
                >
                    <Ionicons name={config.icon} size={22} color={config.color} />
                </View>
            )}

            <View className="flex-1">
                <View className="flex-row items-center justify-between mb-1">
                    <View className="flex-row items-center gap-2 flex-1">
                        {!item.read && <View className="w-2 h-2 rounded-full bg-primary" />}
                        <ThemedText
                            className={`text-sm ${!item.read ? 'font-bold text-slate-900 dark:text-gray-100' : 'font-semibold text-slate-700 dark:text-gray-300'}`}
                            numberOfLines={1}
                        >
                            {item.title}
                        </ThemedText>
                    </View>
                    <ThemedText className="text-xs text-gray-400 ml-2">
                        {formatTimeAgo(item.createdAt)}
                    </ThemedText>
                </View>
                <ThemedText className="text-xs text-gray-500 leading-5" numberOfLines={2}>
                    {item.content}
                </ThemedText>
            </View>
        </TouchableOpacity>
    )
}

const Notifications = () => {
    const router = useRouter()
    const {
        data,
        isLoading,
        refetch,
    } = useNotifications()
    const { mutate: markAsRead } = useMarkNotificationAsRead()
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
    const [refreshing, setRefreshing] = useState(false)

    // Access notifications directly from data
    const notificationList = data?.data.notifications || []
    const unreadCount = data?.data.unreadCount || 0

    const onRefresh = async () => {
        setRefreshing(true)
        await refetch()
        setRefreshing(false)
    }

    const handleNotificationPress = (notification: Notification) => {
        setSelectedNotification(notification)
        if (!notification.read) {
            markAsRead(notification.id)
        }
    }

    const handleMarkAllAsRead = () => {
        notificationList.forEach((notification: Notification) => {
            if (!notification.read) {
                markAsRead(notification.id)
            }
        })
    }

    const renderEmpty = () => (
        <View className="flex-1 items-center justify-center px-5 py-20">
            <View className="w-20 h-20 rounded-full bg-gray-100 dark:bg-dark-card items-center justify-center mb-4">
                <Ionicons name="notifications-outline" size={40} color="#D1D5DB" />
            </View>
            <ThemedText className="text-gray-400 font-semibold mb-1">
                No Notifications
            </ThemedText>
            <ThemedText className="text-gray-400 text-xs text-center">
                You're all caught up! Check back later for updates.
            </ThemedText>
        </View>
    )

    return (
        <ThemedView className="flex-1 bg-white dark:bg-dark-bg">
            <SafeAreaView className="flex-1">
                <View className="flex-row items-center justify-between px-5 py-2 mb-2">
                    <BackButton />
                    <View className="flex-row items-center gap-2">
                        <ThemedText className="text-lg font-bold">Notifications</ThemedText>
                        {unreadCount > 0 && (
                            <View className="bg-primary rounded-full px-2 py-0.5 min-w-[20] items-center">
                                <ThemedText className="text-white text-xs font-bold">
                                    {unreadCount}
                                </ThemedText>
                            </View>
                        )}
                    </View>
                    <TouchableOpacity onPress={handleMarkAllAsRead} disabled={unreadCount === 0}>
                        <ThemedText className={`text-sm font-semibold ${unreadCount > 0 ? 'text-primary' : 'text-gray-300 dark:text-gray-600'}`}>
                            Read all
                        </ThemedText>
                    </TouchableOpacity>
                </View>

                {isLoading && !refreshing ? (
                    <NotificationListSkeleton />
                ) : (
                    <FlatList
                        data={notificationList}
                        keyExtractor={(item: Notification) => item.id}
                        renderItem={({ item }: { item: Notification }) => (
                            <NotificationItem
                                item={item}
                                onPress={() => handleNotificationPress(item)}
                            />
                        )}
                        ListEmptyComponent={renderEmpty}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    />
                )}

                <NotificationDetailModal
                    visible={!!selectedNotification}
                    notification={selectedNotification}
                    onClose={() => setSelectedNotification(null)}
                    onCtaPress={(url) => router.push(url as any)}
                />
            </SafeAreaView>
        </ThemedView>
    )
}

export default Notifications
