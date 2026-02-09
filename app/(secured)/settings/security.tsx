import BackButton from '@/components/back-button'
import UIModal from '@/components/UIModal'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { EvilIcons, Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { ScrollView, Switch, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '@/components/ui/input'

const Security = () => {
    const [twoFactor, setTwoFactor] = useState(false)
    const [biometrics, setBiometrics] = useState(true)
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)

    return (
        <ThemedView className='flex-1 bg-white'>
            <SafeAreaView className='flex-1'>
                {/* Header */}
                <View className='flex-row items-center justify-between px-5 py-2 mb-4'>
                    <BackButton />
                    <ThemedText className='text-lg font-bold'>Security</ThemedText>
                    <View className='w-10' />
                </View>

                <ScrollView className='px-5'>
                    {/* 2FA */}
                    <View className='flex-row justify-between items-center py-4 border-b border-gray-50'>
                        <View className='flex-1 pr-4'>
                            <ThemedText className='text-base font-bold text-slate-800 mb-1'>Two-factor authentication</ThemedText>
                            <ThemedText className='text-gray-400 text-xs leading-relaxed'>Protect your account from unauthorised access by requiring an second authentication method.</ThemedText>
                        </View>
                        <Switch
                            value={twoFactor}
                            onValueChange={setTwoFactor}
                            trackColor={{ false: '#e2e8f0', true: '#3b82f6' }}
                            thumbColor={'#fff'}
                        />
                    </View>

                    {/* Biometrics */}
                    <View className='flex-row justify-between items-center py-6 border-b border-gray-50'>
                        <View className='flex-1 pr-4'>
                            <ThemedText className='text-base font-bold text-slate-800 mb-1'>Enable biometrics</ThemedText>
                            <ThemedText className='text-gray-400 text-xs leading-relaxed'>Protect your account using your device biometric authentication method.</ThemedText>
                        </View>
                        <Switch
                            value={biometrics}
                            onValueChange={setBiometrics}
                            trackColor={{ false: '#e2e8f0', true: '#3b82f6' }}
                            thumbColor={'#fff'}
                        />
                    </View>

                    {/* Password */}
                    <TouchableOpacity
                        onPress={() => setIsPasswordModalVisible(true)}
                    >
                        <View className='flex-row justify-between items-center py-6'>
                            <View className='flex-1 pr-4'>
                                <ThemedText className='text-base font-bold text-slate-800 mb-1'>Password</ThemedText>
                                <ThemedText className='text-gray-400 text-xs'>Update your account password</ThemedText>
                            </View>
                            <EvilIcons name='chevron-right' size={28} color="#94a3b8" />
                        </View>
                    </TouchableOpacity>

                    {/* Log out */}
                    <TouchableOpacity className='flex-row items-center py-6 border-t border-gray-50 mt-4'>
                        <View className='w-10 h-10 rounded-full bg-red-50 items-center justify-center mr-4'>
                            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                        </View>
                        <ThemedText className='text-base font-bold text-red-500'>Log out</ThemedText>
                    </TouchableOpacity>

                    {/* Delete Account */}
                    <TouchableOpacity className='flex-row items-center py-6'>
                        <View className='w-10 h-10 rounded-full bg-red-50 items-center justify-center mr-4'>
                            <Ionicons name="trash-outline" size={20} color="#ef4444" />
                        </View>
                        <ThemedText className='text-base font-bold text-red-500'>Delete account</ThemedText>
                    </TouchableOpacity>


                </ScrollView>

                {/* Password Modal */}
                <UIModal isVisible={isPasswordModalVisible} close={() => setIsPasswordModalVisible(false)}>
                    <View className='bg-white rounded-t-3xl p-6'>
                        <View className='w-10 h-1 bg-gray-200 rounded-full self-center mb-6' />

                        <ThemedText className='text-xl font-bold text-center text-blue-900 mb-8'>Set New Password</ThemedText>

                        <View className='mb-4'>
                            <Input
                                placeholder="Current Password"
                                className='border-0 bg-transparent' // Override input styles if needed for transparent bg
                            />
                        </View>

                        <View className='mb-4'>
                            <Input
                                placeholder="New Password"
                                className='border-0 bg-transparent' // Override input styles if needed for transparent bg
                            />
                            <ThemedText className='text-gray-400 text-xs mt-3 leading-relaxed'>
                                Your password must be 8 or more characters & contain a mix of upper & lower case letter, numbers & symbols.
                            </ThemedText>
                        </View>

                        <TouchableOpacity className='w-full bg-blue-500 py-4 rounded-xl items-center justify-center shadow-lg shadow-blue-500/30 mt-4 mb-4'>
                            <ThemedText className='text-white font-bold text-base'>Set password</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setIsPasswordModalVisible(false)} className='py-2'>
                            <ThemedText className='text-red-500 font-medium text-center text-base'>Cancel</ThemedText>
                        </TouchableOpacity>
                    </View>
                </UIModal>

            </SafeAreaView>
        </ThemedView>
    )
}

export default Security
