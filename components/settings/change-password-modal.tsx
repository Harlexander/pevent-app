import UIModal from '@/components/UIModal'
import Input from '@/components/ui/input'
import { ThemedText } from '@/components/themed-text'
import { useChangePassword } from '@/hooks/query/useAuth'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native'
import { AxiosError } from 'axios'

interface ChangePasswordModalProps {
    visible: boolean
    onClose: () => void
}

const ChangePasswordModal = ({ visible, onClose }: ChangePasswordModalProps) => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const { mutate: changePassword, isPending, error } = useChangePassword()

    console.log((error as AxiosError)?.response)

    const handleClose = () => {
        setCurrentPassword('')
        setNewPassword('')
        onClose()
    }

    const handleSubmit = () => {
        if (!currentPassword || !newPassword) {
            Alert.alert('Error', 'Please fill in all fields')
            return
        }

        if (newPassword.length < 8) {
            Alert.alert('Error', 'New password must be at least 8 characters')
            return
        }

        changePassword(
            { currentPassword, newPassword },
            {
                onSuccess: () => {
                    Alert.alert('Success', 'Password updated successfully')
                    handleClose()
                },
                onError: () => {
                    Alert.alert('Error', 'Failed to update password. Please check your current password.')
                },
            },
        )
    }

    return (
        <UIModal isVisible={visible} close={handleClose}>
            <View className="bg-white dark:bg-dark-bg rounded-t-3xl p-6">
                <View className="w-10 h-1 bg-gray-200 dark:bg-gray-700 rounded-full self-center mb-6" />

                <ThemedText className="text-xl font-bold text-center text-blue-900 dark:text-blue-200 mb-8">
                    Set New Password
                </ThemedText>

                <View className="mb-4">
                    <Input
                        placeholder="Current Password"
                        secureTextEntry
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                    />
                </View>

                <View className="mb-4">
                    <Input
                        placeholder="New Password"
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <ThemedText className="text-gray-400 text-xs mt-3 leading-relaxed">
                        Your password must be 8 or more characters & contain a mix of upper & lower
                        case letter, numbers & symbols.
                    </ThemedText>
                </View>

                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={isPending}
                    className={`w-full py-4 rounded-xl items-center justify-center flex-row gap-2 mt-4 mb-4 ${isPending ? 'bg-blue-300' : 'bg-blue-500 shadow-lg shadow-blue-500/30'}`}
                >
                    {isPending && <ActivityIndicator color="white" size="small" />}
                    <ThemedText className="text-white font-bold text-base">
                        {isPending ? 'Updating...' : 'Set password'}
                    </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleClose} className="py-2">
                    <ThemedText className="text-red-500 font-medium text-center text-base">
                        Cancel
                    </ThemedText>
                </TouchableOpacity>
            </View>
        </UIModal>
    )
}

export default ChangePasswordModal
