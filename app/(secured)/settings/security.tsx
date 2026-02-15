import BackButton from '@/components/back-button'
import ChangePasswordModal from '@/components/settings/change-password-modal'
import LogoutConfirmationDialog from '@/components/settings/logout-confirmation-dialog'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useSession } from '@/Provider/session-provider'
import { useDeleteAccount } from '@/hooks/query/useAuth'
import { useUserStore } from '@/store/user-store'
import { EvilIcons, Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Modal, ScrollView, Switch, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Security = () => {
    const { signOut } = useSession()
    const { clearUser } = useUserStore()
    const [twoFactor, setTwoFactor] = useState(false)
    const [biometrics, setBiometrics] = useState(true)
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)
    const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false)
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
    const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount()

    const handleLogout = () => {
        setIsLogoutDialogVisible(true)
    }

    const confirmLogout = () => {
        setIsLogoutDialogVisible(false)
        clearUser()
        signOut()
    }

    const confirmDeleteAccount = () => {
        deleteAccount(undefined, {
            onSuccess: () => {
                setIsDeleteDialogVisible(false)
                clearUser()
                signOut()
            },
            onError: () => {
                Alert.alert('Error', 'Failed to delete account. Please try again.')
            },
        })
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

                <ScrollView>
                    <View className='gap-1'>
                        {/* 2FA */}
                        <View className="flex-row justify-between items-center py-4 bg-white px-5">
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
                        <View className="flex-row justify-between items-center py-6 bg-white px-5">
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
                        <TouchableOpacity onPress={() => setIsPasswordModalVisible(true)} className="bg-white px-5">
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
                            className="flex-row items-center py-4 border-t border-gray-50 px-5"
                        >
                            <View className="w-10 h-10 rounded-full bg-red-50 items-center justify-center mr-4">
                                <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                            </View>
                            <ThemedText className="text-base font-bold text-red-500">Log out</ThemedText>
                        </TouchableOpacity>

                        {/* Delete Account */}
                        <TouchableOpacity
                            onPress={() => setIsDeleteDialogVisible(true)}
                            className="flex-row items-center py-4 px-5"
                        >
                            <View className="w-10 h-10 rounded-full bg-red-50 items-center justify-center mr-4">
                                <Ionicons name="trash-outline" size={20} color="#ef4444" />
                            </View>
                            <ThemedText className="text-base font-bold text-red-500">
                                Delete account
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <ChangePasswordModal
                    visible={isPasswordModalVisible}
                    onClose={() => setIsPasswordModalVisible(false)}
                />

                <LogoutConfirmationDialog
                    visible={isLogoutDialogVisible}
                    onCancel={() => setIsLogoutDialogVisible(false)}
                    onConfirm={confirmLogout}
                />

                {/* Delete Account Confirmation Dialog */}
                <Modal
                    visible={isDeleteDialogVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => !isDeleting && setIsDeleteDialogVisible(false)}
                >
                    <View className="flex-1 bg-black/50 items-center justify-center px-6">
                        <View className="bg-white rounded-2xl w-full max-w-sm overflow-hidden">
                            <View className="p-6 pb-4 items-center">
                                <View className="w-14 h-14 rounded-full bg-red-50 items-center justify-center mb-4">
                                    <Ionicons name="warning-outline" size={28} color="#ef4444" />
                                </View>
                                <ThemedText className="text-xl font-bold text-red-500 text-center mb-2">
                                    Delete Account
                                </ThemedText>
                                <ThemedText className="text-gray-500 text-center text-sm leading-relaxed">
                                    Are you sure you want to delete your account? You can still log back in within 30
                                    days to recover it. After that, your account and all associated data will be
                                    permanently deleted.
                                </ThemedText>
                            </View>

                            <View className="flex-row border-t border-gray-100">
                                <TouchableOpacity
                                    onPress={() => setIsDeleteDialogVisible(false)}
                                    disabled={isDeleting}
                                    className="flex-1 py-4 items-center justify-center bg-gray-100"
                                    activeOpacity={0.7}
                                >
                                    <ThemedText className="text-gray-700 font-bold text-base">Cancel</ThemedText>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={confirmDeleteAccount}
                                    disabled={isDeleting}
                                    className="flex-1 py-4 items-center justify-center bg-red-500 flex-row gap-2"
                                    activeOpacity={0.7}
                                >
                                    {isDeleting && <ActivityIndicator color="white" size="small" />}
                                    <ThemedText className="text-white font-bold text-base">
                                        {isDeleting ? 'Deleting...' : 'Delete'}
                                    </ThemedText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </ThemedView>
    )
}

export default Security
