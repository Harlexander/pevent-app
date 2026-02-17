import { ThemedText } from '@/components/themed-text'
import React from 'react'
import { Modal, TouchableOpacity, View } from 'react-native'

interface LogoutConfirmationDialogProps {
    visible: boolean
    onCancel: () => void
    onConfirm: () => void
}

const LogoutConfirmationDialog = ({
    visible,
    onCancel,
    onConfirm,
}: LogoutConfirmationDialogProps) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View className="flex-1 bg-black/50 items-center justify-center px-6">
                <View className="bg-white dark:bg-dark-bg rounded-2xl w-full max-w-sm overflow-hidden">
                    {/* Header */}
                    <View className="p-6 pb-4">
                        <ThemedText className="text-xl font-bold text-blue-500 text-center mb-2">
                            Logout
                        </ThemedText>
                        <ThemedText className="text-gray-500 dark:text-gray-400 text-center text-sm">
                            Are you sure you want to sign out?
                        </ThemedText>
                    </View>

                    {/* Actions */}
                    <View className="flex-row border-t border-gray-100 dark:border-gray-700">
                        <TouchableOpacity
                            onPress={onCancel}
                            className="flex-1 py-4 items-center justify-center bg-blue-500"
                            activeOpacity={0.7}
                        >
                            <ThemedText className="text-white font-bold text-base">
                                Cancel
                            </ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onConfirm}
                            className="flex-1 py-4 items-center justify-center bg-blue-100 dark:bg-blue-900/30 border-l border-gray-100 dark:border-gray-700"
                            activeOpacity={0.7}
                        >
                            <ThemedText className="text-blue-500 font-normal text-base">
                                Log out
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default LogoutConfirmationDialog
