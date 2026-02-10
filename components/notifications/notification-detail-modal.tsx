import UIModal from '@/components/UIModal'
import { ThemedText } from '@/components/themed-text'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

type NotificationType = 'event' | 'ticket' | 'promo' | 'system'

export interface Notification {
    id: string
    type: NotificationType
    title: string
    content: string
    image?: string
    url?: string
    ctaLabel?: string
    time: string
    read: boolean
}

const TYPE_CONFIG: Record<
    NotificationType,
    { icon: keyof typeof Ionicons.glyphMap; color: string; bg: string; label: string }
> = {
    event: { icon: 'calendar', color: '#3b82f6', bg: '#EFF6FF', label: 'Event' },
    ticket: { icon: 'ticket', color: '#10b981', bg: '#ECFDF5', label: 'Ticket' },
    promo: { icon: 'pricetag', color: '#f59e0b', bg: '#FFFBEB', label: 'Promo' },
    system: { icon: 'settings', color: '#6b7280', bg: '#F3F4F6', label: 'System' },
}

interface NotificationDetailModalProps {
    visible: boolean
    notification: Notification | null
    onClose: () => void
    onCtaPress: (url: string) => void
}

const NotificationDetailModal = ({
    visible,
    notification,
    onClose,
    onCtaPress,
}: NotificationDetailModalProps) => {
    if (!notification) return null

    const config = TYPE_CONFIG[notification.type]

    return (
        <UIModal isVisible={visible} close={onClose}>
            <View className="bg-white rounded-t-3xl overflow-hidden">
                {/* Image */}
                {notification.image && (
                    <Image
                        source={{ uri: notification.image.replace('w=200', 'w=800') }}
                        style={{ width: '100%', height: 180 }}
                        contentFit="cover"
                    />
                )}

                <View className="p-6">
                    {/* Type badge + time */}
                    <View className="flex-row items-center justify-between mb-4">
                        <View
                            className="flex-row items-center gap-2 rounded-full px-3 py-1.5"
                            style={{ backgroundColor: config.bg }}
                        >
                            <Ionicons name={config.icon} size={14} color={config.color} />
                            <ThemedText
                                className="text-xs font-semibold"
                                style={{ color: config.color }}
                            >
                                {config.label}
                            </ThemedText>
                        </View>
                        <ThemedText className="text-xs text-gray-400">{notification.time}</ThemedText>
                    </View>

                    {/* Title */}
                    <ThemedText className="text-xl font-bold text-slate-900 mb-3">
                        {notification.title}
                    </ThemedText>

                    {/* Content */}
                    <ThemedText className="text-sm text-gray-600 leading-6 mb-6">
                        {notification.content}
                    </ThemedText>

                    {/* CTA */}
                    {notification.url && (
                        <TouchableOpacity
                            onPress={() => {
                                onClose()
                                onCtaPress(notification.url!)
                            }}
                            className="w-full bg-primary py-4 rounded-xl items-center justify-center mb-2"
                        >
                            <ThemedText className="text-white font-bold text-base">
                                {notification.ctaLabel || 'View Details'}
                            </ThemedText>
                        </TouchableOpacity>
                    )}

                    {/* Dismiss */}
                    <TouchableOpacity onPress={onClose} className="w-full py-3 items-center">
                        <ThemedText className="text-gray-400 font-medium text-sm">Dismiss</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        </UIModal>
    )
}

export default NotificationDetailModal
