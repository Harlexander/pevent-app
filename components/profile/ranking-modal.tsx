import { ThemedText } from '@/components/themed-text'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Modal, TouchableOpacity, View, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface RankingModalProps {
    visible: boolean
    onClose: () => void
    currentRank: string
    currentTickets: number
}

const RANKS = [
    {
        name: 'Explorer',
        icon: 'compass-outline',
        color: '#64748b',
        gradient: ['#f1f5f9', '#e2e8f0'],
        minTickets: 0,
        maxTickets: 4,
        tagline: 'Start Your Journey',
        benefits: [
            'Early notifications for followed events',
            'Explorer badge on profile',
        ],
    },
    {
        name: 'Insider',
        icon: 'flash-outline',
        color: '#d97706',
        gradient: ['#fef3c7', '#fde68a'],
        minTickets: 5,
        maxTickets: 9,
        tagline: 'In The Know',
        benefits: [
            '₦200 coupon (single-use)',
            '24h early notifications',
        ],
    },
    {
        name: 'Regular',
        icon: 'heart-outline',
        color: '#6b7280',
        gradient: ['#f3f4f6', '#e5e7eb'],
        minTickets: 10,
        maxTickets: 19,
        tagline: 'Trusted Member',
        benefits: [
            '₦300 coupon (single-use)',
            'Zero Pevent fee on 1 purchase',
        ],
    },
    {
        name: 'VIP',
        icon: 'diamond-outline',
        color: '#f59e0b',
        gradient: ['#fef3c7', '#fcd34d'],
        minTickets: 20,
        maxTickets: 49,
        tagline: 'Premium Access',
        benefits: [
            '₦500 coupon (single-use)',
            'Zero Pevent fees on up to 3 purchases',
        ],
    },
    {
        name: 'Elite',
        icon: 'star',
        color: '#8b5cf6',
        gradient: ['#ede9fe', '#ddd6fe'],
        minTickets: 50,
        maxTickets: Infinity,
        tagline: 'Legendary Status',
        benefits: [
            '₦500 coupon (quarterly refresh)',
            'Zero Pevent fees on all purchases',
            'Earliest notifications & priority drops',
            'Elite recognition + merch access',
        ],
    },
]

const RankingModal = ({ visible, onClose, currentRank, currentTickets }: RankingModalProps) => {
    const router = useRouter()

    const currentRankIndex = RANKS.findIndex(r => r.name === currentRank)
    const currentRankData = RANKS[currentRankIndex]
    const nextRankData = RANKS[currentRankIndex + 1]

    const ticketsToNextRank = nextRankData ? nextRankData.minTickets - currentTickets : 0
    const progressPercentage = nextRankData
        ? Math.min(((currentTickets - currentRankData.minTickets) / (nextRankData.minTickets - currentRankData.minTickets)) * 100, 100)
        : 100

    const handleBrowseEvents = () => {
        onClose()
        router.push('/(secured)/(main)/home')
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/60 justify-end">
                <View className="bg-white rounded-t-3xl max-h-[90%]">
                    {/* Header */}
                    <View className="px-6 pt-6 pb-4 border-b border-gray-100">
                        <View className="flex-row items-center justify-between mb-1">
                            <ThemedText className="text-2xl font-bold text-gray-900">
                                Your Progress
                            </ThemedText>
                            <TouchableOpacity
                                onPress={onClose}
                                className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
                                activeOpacity={0.7}
                            >
                                <Ionicons name="close" size={20} color="#6b7280" />
                            </TouchableOpacity>
                        </View>
                        <ThemedText className="text-sm text-gray-500">
                            Keep attending events to unlock exclusive rewards
                        </ThemedText>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Current Status Card */}
                        <View className="px-6 pt-6 pb-4">
                            <LinearGradient
                                colors={currentRankData.gradient as any}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    borderRadius: 20,
                                    padding: 20,
                                }}
                            >
                                <View className="flex-row items-center justify-between mb-4">
                                    <View className="flex-row items-center gap-3">
                                        <View className="w-14 h-14 rounded-full bg-white items-center justify-center">
                                            <Ionicons name={currentRankData.icon as any} size={28} color={currentRankData.color} />
                                        </View>
                                        <View>
                                            <ThemedText className="text-2xl font-bold text-gray-900">
                                                {currentRank}
                                            </ThemedText>
                                            <ThemedText className="text-sm text-gray-600">
                                                {currentRankData.tagline}
                                            </ThemedText>
                                        </View>
                                    </View>
                                    <View className="bg-white px-3 py-1.5 rounded-full">
                                        <ThemedText className="text-xs font-bold text-gray-700">
                                            {currentTickets} tickets
                                        </ThemedText>
                                    </View>
                                </View>

                                {/* Active Benefits */}
                                <View className="bg-white/80 rounded-xl p-3 gap-2">
                                    <ThemedText className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                                        Your Active Perks
                                    </ThemedText>
                                    {currentRankData.benefits.map((benefit, idx) => (
                                        <View key={idx} className="flex-row items-center gap-2">
                                            <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
                                            <ThemedText className="text-sm text-gray-700 flex-1">
                                                {benefit}
                                            </ThemedText>
                                        </View>
                                    ))}
                                </View>
                            </LinearGradient>
                        </View>

                        {/* Progress to Next Rank */}
                        {nextRankData && (
                            <View className="px-6 pb-6">
                                <View className="bg-blue-50 rounded-2xl p-5 border-2 border-blue-100">
                                    <View className="flex-row items-center justify-between mb-3">
                                        <ThemedText className="text-base font-bold text-gray-900">
                                            Next: {nextRankData.name}
                                        </ThemedText>
                                        <View className="bg-blue-500 px-3 py-1 rounded-full">
                                            <ThemedText className="text-xs font-bold text-white">
                                                {ticketsToNextRank} more tickets
                                            </ThemedText>
                                        </View>
                                    </View>

                                    {/* Progress Bar */}
                                    <View className="mb-4">
                                        <View className="h-3 bg-blue-200 rounded-full overflow-hidden">
                                            <View
                                                className="h-full bg-blue-500 rounded-full"
                                                style={{ width: `${progressPercentage}%` }}
                                            />
                                        </View>
                                        <View className="flex-row justify-between mt-2">
                                            <ThemedText className="text-xs text-gray-600">
                                                {currentTickets} tickets
                                            </ThemedText>
                                            <ThemedText className="text-xs font-semibold text-blue-600">
                                                {Math.round(progressPercentage)}% complete
                                            </ThemedText>
                                        </View>
                                    </View>

                                    {/* Next Rank Preview */}
                                    <View className="bg-white rounded-xl p-3 border border-blue-200">
                                        <View className="flex-row items-center gap-2 mb-2">
                                            <Ionicons name="lock-closed" size={14} color="#3b82f6" />
                                            <ThemedText className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                                                Unlock These Perks
                                            </ThemedText>
                                        </View>
                                        {nextRankData.benefits.map((benefit, idx) => (
                                            <View key={idx} className="flex-row items-center gap-2 mt-1.5">
                                                <Ionicons name="gift-outline" size={14} color="#3b82f6" />
                                                <ThemedText className="text-sm text-gray-700 flex-1">
                                                    {benefit}
                                                </ThemedText>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        )}

                        {/* All Ranks Overview */}
                        <View className="px-6 pb-6">
                            <ThemedText className="text-base font-bold text-gray-900 mb-4">
                                All Ranks
                            </ThemedText>
                            <View className="gap-3">
                                {RANKS.map((rank, index) => {
                                    const isUnlocked = currentTickets >= rank.minTickets
                                    const isCurrent = rank.name === currentRank

                                    return (
                                        <View
                                            key={rank.name}
                                            className={`rounded-xl p-4 border ${isCurrent
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : isUnlocked
                                                        ? 'border-gray-200 bg-white'
                                                        : 'border-gray-100 bg-gray-50'
                                                }`}
                                        >
                                            <View className="flex-row items-center justify-between">
                                                <View className="flex-row items-center gap-3 flex-1">
                                                    <View
                                                        className={`w-11 h-11 rounded-full items-center justify-center ${isUnlocked ? 'bg-white border-2' : 'bg-gray-200'
                                                            }`}
                                                        style={isUnlocked ? { borderColor: rank.color } : {}}
                                                    >
                                                        <Ionicons
                                                            name={rank.icon as any}
                                                            size={20}
                                                            color={isUnlocked ? rank.color : '#9ca3af'}
                                                        />
                                                    </View>
                                                    <View className="flex-1">
                                                        <View className="flex-row items-center gap-2">
                                                            <ThemedText className={`text-base font-bold ${isUnlocked ? 'text-gray-900' : 'text-gray-400'}`}>
                                                                {rank.name}
                                                            </ThemedText>
                                                            {isCurrent && (
                                                                <View className="bg-blue-500 px-2 py-0.5 rounded">
                                                                    <ThemedText className="text-xs font-bold text-white">
                                                                        You
                                                                    </ThemedText>
                                                                </View>
                                                            )}
                                                        </View>
                                                        <ThemedText className={`text-xs mt-0.5 ${isUnlocked ? 'text-gray-500' : 'text-gray-400'}`}>
                                                            {rank.minTickets === 0 ? '0' : rank.minTickets}
                                                            {rank.maxTickets === Infinity ? '+' : `-${rank.maxTickets}`} tickets
                                                        </ThemedText>
                                                    </View>
                                                </View>
                                                {isUnlocked && (
                                                    <Ionicons name="checkmark-circle" size={22} color="#22c55e" />
                                                )}
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    </ScrollView>

                    {/* CTA Button */}
                    <View className="px-6 py-4 border-t border-gray-100 bg-white">
                        <TouchableOpacity
                            onPress={handleBrowseEvents}
                            className="bg-blue-500 rounded-xl py-4 items-center"
                            activeOpacity={0.8}
                        >
                            <View className="flex-row items-center gap-2">
                                <Ionicons name="ticket" size={20} color="white" />
                                <ThemedText className="text-white text-base font-bold">
                                    {nextRankData ? `Get ${ticketsToNextRank} More Tickets` : 'Browse Events'}
                                </ThemedText>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default RankingModal
