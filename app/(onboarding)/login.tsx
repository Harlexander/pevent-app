import BackButton from '@/components/back-button'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { useSignIn } from '@/hooks/query/useAuth'
import { useSession } from '@/Provider/session-provider'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { FontAwesome } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Axios, AxiosError } from 'axios'
import { useToast } from '@/components/ui/toast'
import { getErrorMessage } from '@/utils/error'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

const loginSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
})

type LoginForm = z.infer<typeof loginSchema>

const Login = () => {
    const { colorScheme } = useColorScheme()
    const router = useRouter()
    const { signIn } = useSession()
    const loginMutation = useSignIn()
    const toast = useToast()

    const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: LoginForm) => {
            const result = loginMutation.mutate(data, {
                onSuccess: (data) => {
                    signIn(data.data.accessToken)
                },
                onError: (error) => {
                    toast.error(getErrorMessage(error))
                }
            })
    }

    return (
        <ThemedView className='flex-1 h-screen bg-white dark:bg-dark-bg'>
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
                                <ThemedText className='text-3xl font-semibold text-black dark:text-gray-100'>Hey,</ThemedText>
                                <ThemedText className='text-3xl font-semibold text-black dark:text-gray-100'>Welcome back!</ThemedText>
                                <ThemedText className='text-base opacity-60 text-black dark:text-gray-100'>
                                    Please enter your details to sign in.
                                </ThemedText>
                            </View>

                            {/* Form */}
                            <View className='gap-5'>
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            label="Email"
                                            placeholder="Enter your email"
                                            autoCapitalize='none'
                                            keyboardType='email-address'
                                            value={value}
                                            onChangeText={onChange}
                                            error={errors.email?.message}
                                        />
                                    )}
                                />

                                <View className='gap-2'>
                                    <Controller
                                        control={control}
                                        name="password"
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                label="Password"
                                                placeholder="••••••••"
                                                secureTextEntry
                                                value={value}
                                                onChangeText={onChange}
                                                error={errors.password?.message}
                                            />
                                        )}
                                    />

                                    <View className='items-end'>
                                        <Link href="/(onboarding)/forgot-password" asChild>
                                            <Pressable>
                                                <ThemedText className='text-blue-500 font-medium'>Forgot password?</ThemedText>
                                            </Pressable>
                                        </Link>
                                    </View>
                                </View>

                                <Button
                                    className='mt-2'
                                    onPress={handleSubmit(onSubmit)}
                                    disabled={loginMutation.isPending}
                                >
                                    {loginMutation.isPending ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        "Sign in"
                                    )}
                                </Button>
                            </View>

                            {/* Divider */}
                            <View className='flex-row items-center gap-4 py-8'>
                                <View className='flex-1 h-2 bg-gray-50 dark:bg-gray-700' />
                                <ThemedText className='text-gray-500 text-sm'>Or continue with</ThemedText>
                                <View className='flex-1 h-2 bg-gray-50 dark:bg-gray-700' />
                            </View>

                            {/* Social Login */}
                            <View className='gap-4'>
                                <TouchableOpacity
                                    className='flex-row items-center justify-center bg-gray-100 dark:bg-dark-card h-14 rounded-xl border border-gray-200 dark:border-gray-700 gap-3'
                                    onPress={() => { }}
                                >
                                    <FontAwesome name="google" size={20} color={colorScheme === 'dark' ? '#e5e7eb' : '#000'} />
                                    <ThemedText className='font-semibold text-black dark:text-gray-100 text-base'>Login with Google</ThemedText>
                                </TouchableOpacity>
                            </View>

                            {/* Footer */}
                            <View className='flex-row justify-center mt-8 gap-1 mb-4'>
                                <ThemedText className='opacity-60 text-black dark:text-gray-100'>Don't have an account?</ThemedText>
                                <Link href="/(onboarding)/register" asChild>
                                    <Pressable>
                                        <ThemedText className='text-blue-500 font-semibold'>Sign up</ThemedText>
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

export default Login