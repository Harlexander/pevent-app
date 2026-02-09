import BackButton from '@/components/back-button'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { useRouter } from 'expo-router'
import React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ResetPassword = () => {
    const router = useRouter()

    return (
        <ThemedView className='flex-1 h-screen bg-white'>
            <SafeAreaView className='flex-1'>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className='flex-1'
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <BackButton />

                        <View className='mt-8'>
                            <View className='gap-2 mb-8'>
                                <ThemedText className='text-3xl font-bold text-black'>Reset Password</ThemedText>
                                <ThemedText className='text-base opacity-60 text-black'>
                                    Enter your email address to reset your password.
                                </ThemedText>
                            </View>

                            {/* Form */}
                            <View className='gap-5'>
                                <Input
                                    label="Email"
                                    placeholder="Enter your email"
                                    autoCapitalize='none'
                                    keyboardType='email-address'
                                    textContentType='emailAddress'
                                />

                                <Button className='mt-2' onPress={() => { }}>
                                    Send Reset Link
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ThemedView>
    )
}

export default ResetPassword