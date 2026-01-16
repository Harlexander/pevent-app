import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Image } from 'expo-image'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Register = () => {
    const router = useRouter()

    return (
        <ThemedView className='flex-1 h-screen bg-white'>
            <SafeAreaView className='flex-1 px-5'>
                {/* Header / Logo */}
                <View className='items-center mt-10 mb-8'>
                    <Image
                        source={require('@/assets/logo.png')}
                        style={{ width: 80, height: 80 }}
                        contentFit="contain"
                    />
                </View>

                {/* Title */}
                <View className='items-center mb-8'>
                    <ThemedText className='text-3xl font-bold text-center text-black'>Create an account</ThemedText>
                </View>

                {/* Form */}
                <View className='gap-5'>
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                    />

                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        autoCapitalize='none'
                        keyboardType='email-address'
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

                {/* Footer */}
                <View className='flex-row justify-center mt-8 gap-1'>
                    <ThemedText className='opacity-60 text-black'>Already have an account?</ThemedText>
                    <Link href="/(onboarding)/login" asChild>
                        <Pressable>
                            <ThemedText className='text-blue-500 font-semibold'>Log in</ThemedText>
                        </Pressable>
                    </Link>
                </View>

            </SafeAreaView>
        </ThemedView>
    )
}

export default Register