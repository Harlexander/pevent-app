import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, Switch, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
    const router = useRouter()
    const [notificationsEnabled, setNotificationsEnabled] = useState(true)

    const MenuGroup = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <View className='mb-6'>
            <ThemedText className='text-gray-400 text-xs font-bold uppercase mb-2 tracking-widest'>{title}</ThemedText>
            <View className='gap-4'>
                {children}
            </View>
        </View>
    )

    const MenuItem = ({
        icon,
        label,
        onPress,
        showArrow = true,
        rightElement
    }: {
        icon: string,
        label: string,
        onPress?: () => void,
        showArrow?: boolean,
        rightElement?: React.ReactNode
    }) => (
        <TouchableOpacity
            onPress={onPress}
            className='flex-row items-center justify-between py-1'
            disabled={!onPress}
        >
            <View className='flex-row items-center gap-3'>
                <View className='w-10 h-10 rounded-full bg-blue-50 items-center justify-center'>
                    <Ionicons name={icon as any} size={20} color="#3b82f6" />
                </View>
                <ThemedText className='text-base font-medium text-slate-900'>{label}</ThemedText>
            </View>

            {rightElement ? rightElement : showArrow && (
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            )}
        </TouchableOpacity>
    )

    return (
        <ThemedView className='flex-1 bg-white'>
            <View className='flex-1'>
                {/* Header */}
                <View className='items-center mt-6 mb-8 bg-gray-100 py-10'>
                    <View className='w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-white shadow-sm'>
                        <Image
                            source={require('@/assets/images/home/avatar.png')}
                            style={{ width: '100%', height: '100%' }}
                            contentFit="cover"
                        />
                    </View>
                    <ThemedText className='text-xl font-bold text-slate-900'>Alex Okoro</ThemedText>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} className='px-5'>
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
                    </MenuGroup>

                    <MenuGroup title="Preferences">
                        <MenuItem
                            icon="notifications-outline"
                            label="Receive notifications"
                            showArrow={false}
                            rightElement={
                                <Switch
                                    value={notificationsEnabled}
                                    onValueChange={setNotificationsEnabled}
                                    trackColor={{ false: '#767577', true: '#3b82f6' }}
                                    thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
                                />
                            }
                        />
                        <MenuItem
                            icon="people-outline"
                            label="Invite friends"
                            onPress={() => router.push('/settings/invite')}
                        />
                    </MenuGroup>


                    <MenuGroup title="Support">
                        <MenuItem
                            icon="help-circle-outline"
                            label="Help Center"
                            showArrow={true}
                        />
                    </MenuGroup>

                    <View className='h-8' />
                </ScrollView>
            </View>
        </ThemedView>
    )
}

export default Profile