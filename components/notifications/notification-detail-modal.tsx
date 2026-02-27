import UIModal from '@/components/UIModal'
import { ThemedText } from '@/components/themed-text'
import { Notification, NotificationType } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

const TYPE_CONFIG: Record<
    NotificationType,
    { icon: keyof typeof Ionicons.glyphMap; color: string; bg: string; label: string }
> = {
    general: { icon: 'notifications', color: '#8b5cf6', bg: '#F5F3FF', label: 'General' },
    event: { icon: 'calendar', color: '#3b82f6', bg: '#EFF6FF', label: 'Event' },
    ticket: { icon: 'ticket', color: '#10b981', bg: '#ECFDF5', label: 'Ticket' },
    payout: { icon: 'cash', color: '#22c55e', bg: '#F0FDF4', label: 'Payout' },
    voting: { icon: 'heart', color: '#ec4899', bg: '#FDF2F8', label: 'Voting' },
    wallet: { icon: 'wallet', color: '#f59e0b', bg: '#FFFBEB', label: 'Wallet' },
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
            <View className="bg-white dark:bg-dark-bg rounded-t-3xl overflow-hidden">
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
                        <ThemedText className="text-xs text-gray-400">
                            {new Date(notification.createdAt).toLocaleDateString('en-NG', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </ThemedText>
                    </View>

                    {/* Title */}
                    <ThemedText className="text-xl font-jost-semibold text-slate-900 dark:text-gray-100 mb-3">
                        {notification.title}
                    </ThemedText>

                    {/* Content */}
                    <ThemedText className="text-sm text-gray-600 dark:text-gray-300 leading-6 mb-6">
                        {notification.content}
                    </ThemedText>

                    {/* CTA */}
                    {notification.link && (
                        <TouchableOpacity
                            onPress={() => {
                                onClose()
                                onCtaPress(notification.link!)
                            }}
                            className="w-full bg-primary py-4 rounded-xl items-center justify-center mb-2"
                        >
                            <ThemedText className="text-white font-semibold text-base">
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
