import BackButton from '@/components/back-button'
import NotificationDetailModal, {
    Notification,
} from '@/components/notifications/notification-detail-modal'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type NotificationType = 'event' | 'ticket' | 'promo' | 'system'

const DUMMY_NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        type: 'ticket',
        title: 'Ticket Confirmed',
        content:
            'Your ticket for Afrobeats Festival 2026 has been confirmed. Show your QR code at the entrance. Make sure to arrive at least 30 minutes early for check-in. See you there!',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200',
        url: '/passes',
        ctaLabel: 'View My Tickets',
        time: '2m ago',
        read: false,
    },
    {
        id: '2',
        type: 'event',
        title: 'Event Starting Soon',
        content:
            "Lagos Tech Meetup starts in 1 hour. Don't forget to bring your pass! The venue is at Landmark Centre, Victoria Island. Parking is available on-site.",
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200',
        url: '/lagos-tech-meetup',
        ctaLabel: 'View Event',
        time: '58m ago',
        read: false,
    },
    {
        id: '3',
        type: 'promo',
        title: '30% Off This Weekend',
        content:
            'Use code WEEKEND30 to get 30% off any event ticket. Valid until Sunday midnight. Applies to all categories including music, tech, and art events. Limited redemptions available.',
        time: '3h ago',
        read: false,
    },
    {
        id: '4',
        type: 'event',
        title: 'New Event Near You',
        content:
            'Art & Wine Night just dropped in Lagos. Limited seats available — grab yours now. Enjoy live painting, curated wines, and great conversations with fellow art lovers.',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200',
        url: '/art-wine-night',
        ctaLabel: 'Get Tickets',
        time: '5h ago',
        read: true,
    },
    {
        id: '5',
        type: 'system',
        title: 'Profile Updated',
        content:
            'Your profile information has been updated successfully. Your changes are now visible to event organizers when you purchase tickets.',
        time: '1d ago',
        read: true,
    },
    {
        id: '6',
        type: 'ticket',
        title: 'Ticket Transfer Received',
        content:
            'You received a VIP ticket for Summer Jam from alex@email.com. The ticket has been added to your passes. Enjoy the show!',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200',
        url: '/passes',
        ctaLabel: 'View My Tickets',
        time: '2d ago',
        read: true,
    },
]

const TYPE_CONFIG: Record<
    NotificationType,
    { icon: keyof typeof Ionicons.glyphMap; color: string; bg: string }
> = {
    event: { icon: 'calendar', color: '#3b82f6', bg: 'bg-blue-50' },
    ticket: { icon: 'ticket', color: '#10b981', bg: 'bg-green-50' },
    promo: { icon: 'pricetag', color: '#f59e0b', bg: 'bg-amber-50' },
    system: { icon: 'settings', color: '#6b7280', bg: 'bg-gray-100' },
}

const NotificationItem = ({ item, onPress }: { item: Notification; onPress: () => void }) => {
    const config = TYPE_CONFIG[item.type]

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className={`flex-row gap-3 px-5 py-4 ${!item.read ? 'bg-blue-50/40' : ''}`}
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
                            className={`text-sm ${!item.read ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}
                            numberOfLines={1}
                        >
                            {item.title}
                        </ThemedText>
                    </View>
                    <ThemedText className="text-xs text-gray-400 ml-2">{item.time}</ThemedText>
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
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
    const unreadCount = DUMMY_NOTIFICATIONS.filter((n) => !n.read).length

    return (
        <ThemedView className="flex-1 bg-white">
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
                    <TouchableOpacity>
                        <ThemedText className="text-primary text-sm font-semibold">
                            Read all
                        </ThemedText>
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {DUMMY_NOTIFICATIONS.map((item, index) => (
                        <View key={item.id}>
                            <NotificationItem
                                item={item}
                                onPress={() => setSelectedNotification(item)}
                            />
                            {index < DUMMY_NOTIFICATIONS.length - 1 && (
                                <View className="h-px bg-gray-100 ml-[76]" />
                            )}
                        </View>
                    ))}
                </ScrollView>

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
