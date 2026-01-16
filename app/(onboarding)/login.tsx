import BackButton from '@/components/back-button'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { FontAwesome } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Login = () => {
    const router = useRouter()

    return (
        <ThemedView className='flex-1 h-screen bg-white'>
            <SafeAreaView className='flex-1 px-5 gap-8'>
                <BackButton/>

                <View className=''>
                    <View className='gap-2 mb-8'>
                        <ThemedText className='text-3xl font-bold text-black'>Hey,</ThemedText>
                        <ThemedText className='text-3xl font-bold text-black'>Welcome back!</ThemedText>
                        <ThemedText className='text-base opacity-60 text-black'>
                            Welcome back! Please enter your details.
                        </ThemedText>
                    </View>

                    {/* Form */}
                    <View className='gap-5'>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            autoCapitalize='none'
                            keyboardType='email-address'
                        />

                        <View className='gap-2'>
                            <Input
                                label="Password"
                                placeholder="••••••••"
                                secureTextEntry
                            />
                            <View className='items-end'>
                                <Link href="/(onboarding)/forgot-password" asChild>
                                    <Pressable>
                                        <ThemedText className='text-blue-500 font-medium'>Forgot password</ThemedText>
                                    </Pressable>
                                </Link>
                            </View>
                        </View>

                        <Button className='mt-2' onPress={() => { }}>
                            Sign in
                        </Button>
                    </View>

                    {/* Footer */}
                    <View className='flex-row justify-center mt-8 gap-1'>
                        <ThemedText className='opacity-60 text-black'>Don't have an account?</ThemedText>
                        <Link href="/(onboarding)/register" asChild>
                            <Pressable>
                                <ThemedText className='text-blue-500 font-semibold'>Sign up</ThemedText>
                            </Pressable>
                        </Link>
                    </View>

                    <View className='justify-center items-center'>
                        <FontAwesome.Button name="google" backgroundColor="#b01804ff" onPress={() => {}}>
                            Login with Google
                        </FontAwesome.Button>
                    </View>
                </View>

            </SafeAreaView>
        </ThemedView>
    )
}

export default Login