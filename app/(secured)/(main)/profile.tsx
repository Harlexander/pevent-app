import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import UIModal from '@/components/UIModal'
import RankingModal from '@/components/profile/ranking-modal'
import { endpoints } from '@/constants/endpoints'
import { useAppTickets } from '@/hooks/query/useTicket'
import { useUploadImage } from '@/hooks/query/useAuth'
import { useUserStore } from '@/store/user-store'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { togglePushNotifications } from '@/actions/user'
import { useMutation } from '@tanstack/react-query'
import { useThemeStore } from '@/store/theme-store'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useDVA, useCreateDVA } from '@/hooks/query/useWallet'
import * as Clipboard from 'expo-clipboard'
import { useToast } from '@/components/ui/toast'
import { getErrorMessage } from '@/utils/error'
import React, { useState } from 'react'
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native'
import CustomSwitch from '@/components/ui/custom-switch'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
    const router = useRouter()
    const user = useUserStore((state) => state.user)
    const toast = useToast()
    const { colorScheme, toggleTheme } = useThemeStore()
    const { setColorScheme } = useColorScheme()

    const handleToggleTheme = () => {
        const newScheme = colorScheme === 'light' ? 'dark' : 'light'
        toggleTheme()
        setColorScheme(newScheme)
    }
    const [notificationsEnabled, setNotificationsEnabled] = useState(true)
    const [isRankingModalVisible, setIsRankingModalVisible] = useState(false)
    const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false)
    const { mutate: uploadImage, isPending: isUploading } = useUploadImage()

    const handleImageUpload = (uri: string) => {
        setIsPhotoModalVisible(false)
        uploadImage(
            { uri, type: 'profile' },
            {
                onSuccess: () => toast.success('Profile picture updated'),
                onError: () => toast.error('Failed to upload image'),
            },
        )
    }

    const pickFromLibrary = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
            toast.info('Please grant access to your photo library.')
            return
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        })
        if (!result.canceled && result.assets[0]) {
            handleImageUpload(result.assets[0].uri)
        }
    }

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== 'granted') {
            toast.info('Please grant access to your camera.')
            return
        }
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        })
        if (!result.canceled && result.assets[0]) {
            handleImageUpload(result.assets[0].uri)
        }
    }

    const toggleNotificationsMutation = useMutation({
        mutationFn: (isActive: boolean) => togglePushNotifications(isActive),
        onMutate: (isActive) => {
            setNotificationsEnabled(isActive)
        },
        onError: (_error, isActive) => {
            setNotificationsEnabled(!isActive)
            toast.error('Failed to update notification preferences. Please try again.')
        },
    })

    const { data: dvaData, isError: dvaNotFound } = useDVA()
    const { mutate: createDVA, isPending: dvaCreating } = useCreateDVA()
    const dva = dvaData?.data

    const handleCopyAccountNumber = async () => {
        if (dva?.accountNumber) {
            await Clipboard.setStringAsync(dva.accountNumber)
            toast.info('Account number copied to clipboard', 2000)
        }
    }

    const handleCreateDVA = () => {
        createDVA(undefined, {
            onSuccess: () => toast.success('Virtual account created!'),
            onError: (error) => toast.error(getErrorMessage(error, 'Failed to create virtual account.')),
        })
    }

    const avatarSource = user?.image
        ? { uri: user.image.startsWith('http') ? user.image : endpoints.IMAGE_URL + user.image }
        : require('@/assets/images/home/avatar.png')

    const displayName = user?.name || [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'User'

    // Calculate total tickets and rank
    const { data: ticketsData } = useAppTickets()
    const totalTickets = ticketsData?.data?.length || 0
    const getRank = (ticketCount: number) => {
        if (ticketCount >= 50) return 'Elite'
        if (ticketCount >= 20) return 'VIP'
        if (ticketCount >= 10) return 'Regular'
        if (ticketCount >= 5) return 'Insider'
        return 'Explorer'
    }
    const userRank = getRank(totalTickets)

    const MenuGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <View className="">
            <ThemedText className="text-gray-400 p-5 text-xs font-semibold uppercase tracking-widest">
                {title}
            </ThemedText>
            <View style={{ gap: 1 }}>{children}</View>
        </View>
    )

    const MenuItem = ({
        icon,
        label,
        onPress,
        showArrow = true,
        rightElement,
    }: {
        icon: string
        label: string
        onPress?: () => void
        showArrow?: boolean
        rightElement?: React.ReactNode
    }) => (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row items-center justify-between p-5 bg-white dark:bg-dark-bg"
            disabled={!onPress}
        >
            <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 items-center justify-center">
                    <Ionicons name={icon as any} size={20} color="#3b82f6" />
                </View>
                <ThemedText className="text-base font-medium text-slate-900 dark:text-gray-100">{label}</ThemedText>
            </View>

            {rightElement
                ? rightElement
                : showArrow && <Ionicons name="chevron-forward" size={20} color="#9ca3af" />}
        </TouchableOpacity>
    )

    return (
        <ThemedView className="flex-1 bg-white dark:bg-dark-bg">
            <ScrollView className="flex-1">
                {/* Header */}
                <SafeAreaView edges={['top']} className="items-center bg-blue-500 py-10">
                    <TouchableOpacity
                        onPress={() => setIsPhotoModalVisible(true)}
                        disabled={isUploading}
                        activeOpacity={0.8}
                        className="relative mb-4"
                    >
                        <View className="w-24 h-24 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
                            <Image
                                source={avatarSource}
                                style={{ width: '100%', height: '100%' }}
                                contentFit="cover"
                            />
                            {isUploading && (
                                <View className="absolute inset-0 bg-black/40 items-center justify-center">
                                    <ActivityIndicator color="white" size="small" />
                                </View>
                            )}
                        </View>
                        <View className="absolute bottom-0 right-0 w-7 h-7 bg-white dark:bg-dark-bg rounded-full items-center justify-center border border-gray-200 dark:border-gray-700">
                            <Ionicons name="camera" size={14} color="#3b82f6" />
                        </View>
                    </TouchableOpacity>
                    <ThemedText className="font-jost-bold text-white capitalize text-2xl text-center" numberOfLines={1}>
                        {user?.firstName} {user?.lastName}
                    </ThemedText>
                    {displayName && (
                        <ThemedText className="text-sm text-white mt-1 capitalize">{displayName}</ThemedText>
                    )}

                    {/* Badges */}
                    <View className="flex-row gap-3 mt-4 items-center">
                        {/* Total Tickets Badge */}
                        <View className="bg-white dark:bg-dark-bg rounded-full px-4 py-2 flex-row items-center gap-2">
                            <Ionicons name="ticket-outline" size={16} color="#3b82f6" />
                            <ThemedText className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                {totalTickets} Tickets
                            </ThemedText>
                        </View>
                        <View className="w-1 h-1 bg-white rounded-full" />
                        {/* Rank Badge - Clickable */}
                        <TouchableOpacity
                            onPress={() => setIsRankingModalVisible(true)}
                            className="bg-white dark:bg-dark-bg rounded-full px-4 py-2 flex-row items-center gap-2"
                            activeOpacity={0.7}
                        >
                            <Ionicons name="trophy" size={16} color="#f59e0b" />
                            <ThemedText className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                {userRank}
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                <SafeAreaView edges={['bottom']}>
                    <MenuGroup title="Account">
                        <MenuItem
                            icon="person-outline"
                            label="Profile"
                            onPress={() => router.push('/settings/profile-details')}
                        />
                        <MenuItem
                            icon="shield-checkmark-outline"
                            label="Security"
                            onPress={() => router.push('/settings/security')}
                        />
                    </MenuGroup>

                    <MenuGroup title="Billing">
                        <MenuItem
                            icon="wallet-outline"
                            label="Wallet"
                            onPress={() => router.push('/settings/wallet')}
                        />
                        {dva ? (
                            <>
                                <TouchableOpacity
                                    onPress={handleCopyAccountNumber}
                                    className="flex-row items-center justify-between p-5 bg-white dark:bg-dark-bg"
                                    activeOpacity={0.7}
                                >
                                    <View className="flex-row items-center gap-3">
                                        <View className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 items-center justify-center">
                                            <Ionicons name="business-outline" size={20} color="#3b82f6" />
                                        </View>
                                        <View>
                                            <ThemedText className="text-base font-medium text-slate-900 dark:text-gray-100">
                                                {dva.accountNumber}
                                            </ThemedText>
                                            <ThemedText className="text-xs text-gray-400">
                                                {dva.bankName} — {dva.accountName}
                                            </ThemedText>
                                        </View>
                                    </View>
                                    <Ionicons name="copy-outline" size={18} color="#9ca3af" />
                                </TouchableOpacity>
                            </>
                        ) : dvaNotFound ? (
                            <MenuItem
                                icon="business-outline"
                                label={dvaCreating ? 'Setting Up...' : 'Set Up Virtual Account'}
                                onPress={handleCreateDVA}
                            />
                        ) : null}
                    </MenuGroup>

                    <MenuGroup title="Preferences">
                        <MenuItem
                            icon="notifications-outline"
                            label="Receive notifications"
                            showArrow={false}
                            rightElement={
                                <CustomSwitch
                                    value={notificationsEnabled}
                                    onValueChange={(value) => toggleNotificationsMutation.mutate(value)}
                                    disabled={toggleNotificationsMutation.isPending}
                                />
                            }
                        />
                        <MenuItem
                            icon="moon-outline"
                            label="Dark mode"
                            showArrow={false}
                            rightElement={
                                <CustomSwitch
                                    value={colorScheme === 'dark'}
                                    onValueChange={handleToggleTheme}
                                />
                            }
                        />
                        <MenuItem
                            icon="heart-outline"
                            label="Favorites"
                            onPress={() => router.push('/settings/favorites')}
                        />
                        <MenuItem
                            icon="people-outline"
                            label="Invite friends"
                            onPress={() => router.push('/settings/invite')}
                        />
                    </MenuGroup>

                    <MenuGroup title="Support">
                        <MenuItem icon="help-circle-outline" label="Help Center" onPress={() => router.push('/settings/help-center')} />
                    </MenuGroup>

                    <View className="h-24" />
                </SafeAreaView>
            </ScrollView>

            <RankingModal
                visible={isRankingModalVisible}
                onClose={() => setIsRankingModalVisible(false)}
                currentRank={userRank}
                currentTickets={totalTickets}
            />

            <UIModal isVisible={isPhotoModalVisible} close={() => setIsPhotoModalVisible(false)}>
                <View className="bg-white dark:bg-dark-bg rounded-t-3xl p-6 pb-10">
                    <View className="w-10 h-1 bg-gray-200 dark:bg-gray-700 rounded-full self-center mb-6" />

                    <ThemedText className="text-xl font-jost-semibold text-center text-blue-900 dark:text-blue-200 mb-2">
                        Photo
                    </ThemedText>
                    <ThemedText className="text-center text-gray-400 mb-8">
                        Select an option to edit your profile image
                    </ThemedText>

                    <TouchableOpacity onPress={pickFromLibrary} className="flex-row items-center gap-4 py-4 border-b border-gray-100 dark:border-gray-700">
                        <View className="w-10 h-10 rounded-full bg-gray-50 dark:bg-dark-card items-center justify-center">
                            <Ionicons name="image-outline" size={20} color="#64748b" />
                        </View>
                        <ThemedText className="text-base font-medium text-slate-600 dark:text-gray-300">
                            Upload from device
                        </ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={takePhoto} className="flex-row items-center gap-4 py-4">
                        <View className="w-10 h-10 rounded-full bg-gray-50 dark:bg-dark-card items-center justify-center">
                            <Ionicons name="camera-outline" size={20} color="#64748b" />
                        </View>
                        <ThemedText className="text-base font-medium text-slate-600 dark:text-gray-300">
                            Take a photo
                        </ThemedText>
                    </TouchableOpacity>
                </View>
            </UIModal>
        </ThemedView>
    )
}

export default Profile
