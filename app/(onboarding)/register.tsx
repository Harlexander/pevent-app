import BackButton from '@/components/back-button'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { FontAwesome } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Register = () => {
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
                                <ThemedText className='text-3xl font-bold text-black'>Hey,</ThemedText>
                                <ThemedText className='text-3xl font-bold text-black'>Welcome to Pevent!</ThemedText>
                                <ThemedText className='text-base opacity-60 text-black'>
                                    Create an account to get started.
                                </ThemedText>
                            </View>

                            {/* Form */}
                            <View className='gap-5'>
                                <View className='flex-row gap-4'>
                                    <View className='flex-1'>
                                        <Input
                                            label="First Name"
                                            placeholder="First Name"
                                        />
                                    </View>
                                    <View className='flex-1'>
                                        <Input
                                            label="Last Name"
                                            placeholder="Last Name"
                                        />
                                    </View>
                                </View>

                                <Input
                                    label="Email"
                                    placeholder="Enter your email"
                                    autoCapitalize='none'
                                    keyboardType='email-address'
                                    textContentType='emailAddress'
                                />

                                <Input
                                    label="Password"
                                    placeholder="••••••••"
                                    secureTextEntry
                                />

                                <Button className='mt-2' onPress={() => { }}>
                                    Sign up
                                </Button>
                            </View>

                            {/* Divider */}
                            <View className='flex-row items-center gap-4 py-8'>
                                <View className='flex-1 h-[1px] bg-gray-200' />
                                <ThemedText className='text-gray-500 text-sm'>Or continue with</ThemedText>
                                <View className='flex-1 h-[1px] bg-gray-200' />
                            </View>

                            {/* Social Login */}
                            <View className='gap-4'>
                                <TouchableOpacity
                                    className='flex-row items-center justify-center bg-gray-100 h-14 rounded-xl border border-gray-200 gap-3'
                                    onPress={() => { }}
                                >
                                    <FontAwesome name="google" size={20} color="#000" />
                                    <ThemedText className='font-semibold text-black text-base'>Login with Google</ThemedText>
                                </TouchableOpacity>
                            </View>

                            {/* Footer */}
                            <View className='flex-row justify-center mt-8 gap-1 mb-4'>
                                <ThemedText className='opacity-60 text-black'>Already have an account?</ThemedText>
                                <Link href="/(onboarding)/login" asChild>
                                    <Pressable>
                                        <ThemedText className='text-blue-500 font-semibold'>Log in</ThemedText>
                                    </Pressable>
                                </Link>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ThemedView>
    )
}

export default Register