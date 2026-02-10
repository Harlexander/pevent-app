import BackButton from '@/components/back-button'
import ChangePasswordModal from '@/components/settings/change-password-modal'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useSession } from '@/Provider/session-provider'
import { useUserStore } from '@/store/user-store'
import { EvilIcons, Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Alert, ScrollView, Switch, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Security = () => {
    const { signOut } = useSession()
    const { clearUser } = useUserStore()
    const [twoFactor, setTwoFactor] = useState(false)
    const [biometrics, setBiometrics] = useState(true)
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)

    const handleLogout = () => {
        Alert.alert('Log out', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Log out',
                style: 'destructive',
                onPress: () => {
                    clearUser()
                    signOut()
                },
            },
        ])
    }

    return (
        <ThemedView className="flex-1 bg-white">
            <SafeAreaView className="flex-1">
                {/* Header */}
                <View className="flex-row items-center justify-between px-5 py-2 mb-4">
                    <BackButton />
                    <ThemedText className="text-lg font-bold">Security</ThemedText>
                    <View className="w-10" />
                </View>

                <ScrollView className="px-5">
                    {/* 2FA */}
                    <View className="flex-row justify-between items-center py-4 border-b border-gray-50">
                        <View className="flex-1 pr-4">
                            <ThemedText className="text-base font-bold text-slate-800 mb-1">
                                Two-factor authentication
                            </ThemedText>
                            <ThemedText className="text-gray-400 text-xs leading-relaxed">
                                Protect your account from unauthorised access by requiring an second
                                authentication method.
                            </ThemedText>
                        </View>
                        <Switch
                            value={twoFactor}
                            onValueChange={setTwoFactor}
                            trackColor={{ false: '#e2e8f0', true: '#3b82f6' }}
                            thumbColor={'#fff'}
                        />
                    </View>

                    {/* Biometrics */}
                    <View className="flex-row justify-between items-center py-6 border-b border-gray-50">
                        <View className="flex-1 pr-4">
                            <ThemedText className="text-base font-bold text-slate-800 mb-1">
                                Enable biometrics
                            </ThemedText>
                            <ThemedText className="text-gray-400 text-xs leading-relaxed">
                                Protect your account using your device biometric authentication
                                method.
                            </ThemedText>
                        </View>
                        <Switch
                            value={biometrics}
                            onValueChange={setBiometrics}
                            trackColor={{ false: '#e2e8f0', true: '#3b82f6' }}
                            thumbColor={'#fff'}
                        />
                    </View>

                    {/* Password */}
                    <TouchableOpacity onPress={() => setIsPasswordModalVisible(true)}>
                        <View className="flex-row justify-between items-center py-6">
                            <View className="flex-1 pr-4">
                                <ThemedText className="text-base font-bold text-slate-800 mb-1">
                                    Password
                                </ThemedText>
                                <ThemedText className="text-gray-400 text-xs">
                                    Update your account password
                                </ThemedText>
                            </View>
                            <EvilIcons name="chevron-right" size={28} color="#94a3b8" />
                        </View>
                    </TouchableOpacity>

                    {/* Log out */}
                    <TouchableOpacity
                        onPress={handleLogout}
                        className="flex-row items-center py-6 border-t border-gray-50 mt-4"
                    >
                        <View className="w-10 h-10 rounded-full bg-red-50 items-center justify-center mr-4">
                            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                        </View>
                        <ThemedText className="text-base font-bold text-red-500">Log out</ThemedText>
                    </TouchableOpacity>

                    {/* Delete Account */}
                    <TouchableOpacity className="flex-row items-center py-6">
                        <View className="w-10 h-10 rounded-full bg-red-50 items-center justify-center mr-4">
                            <Ionicons name="trash-outline" size={20} color="#ef4444" />
                        </View>
                        <ThemedText className="text-base font-bold text-red-500">
                            Delete account
                        </ThemedText>
                    </TouchableOpacity>
                </ScrollView>

                <ChangePasswordModal
                    visible={isPasswordModalVisible}
                    onClose={() => setIsPasswordModalVisible(false)}
                />
            </SafeAreaView>
        </ThemedView>
    )
}

export default Security
