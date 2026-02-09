import BackButton from '@/components/back-button'
import Currency from '@/components/currency'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Wallet = () => {
    return (
        <ThemedView className='flex-1 bg-white'>
            <SafeAreaView className='flex-1'>
                {/* Header */}
                <View className='flex-row items-center justify-between px-5 py-2 mb-4'>
                    <BackButton />
                    <ThemedText className='text-lg font-bold'>Wallet</ThemedText>
                    <View className='w-10' />
                </View>

                <ScrollView className='px-5 gap-5' contentContainerStyle={{ paddingBottom: 100 }}>

                    {/* Balance Card */}
                    <LinearGradient
                        colors={['#00359E', '#002570']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ borderRadius: 14 }}
                        className='w-full h-48 justify-between relative overflow-hidden mb-8'
                    >
                        <View className='p-6'>
                            {/* Abstract Circle decoration */}
                            <View className='absolute -right-10 -bottom-20 w-64 h-64 rounded-full border border-white/10' />
                            <View className='absolute -left-10 -top-10 w-32 h-32 rounded-full bg-blue-400/20' />

                            <View>
                                <ThemedText className='text-white font-medium mb-1'>Balance</ThemedText>
                                <Currency className='text-white text-3xl font-bold'>1.234</Currency>
                            </View>

                            <TouchableOpacity className='self-end'>
                                <View className='w-10 h-10 rounded-full border-2 border-white items-center justify-center'>
                                    <Ionicons name="add" size={24} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>

                    {/* Cards */}
                    <View className='gap-4 py-5'>
                        <View className='flex-row items-center justify-between bg-white border border-gray-100 p-4 rounded-xl'>
                            <View className='flex-row items-center gap-4'>
                                <View className='w-12 h-8 bg-red-500 rounded items-center justify-center'>
                                    {/* Simulated Mastercard Logo */}
                                    <View className='flex-row -space-x-2'>
                                        <View className='w-3 h-3 rounded-full bg-red-500' />
                                        <View className='w-3 h-3 rounded-full bg-yellow-400' />
                                    </View>
                                </View>
                                <View>
                                    <ThemedText className='text-slate-900 font-bold'>**** **** **** 6789</ThemedText>
                                    <ThemedText className='text-gray-400 text-xs'>Expires 09/25</ThemedText>
                                </View>
                            </View>
                            <View className='bg-gray-100 px-2 py-1 rounded-lg'>
                                <ThemedText className='text-[10px] text-gray-500 font-bold'>default</ThemedText>
                            </View>
                        </View>

                        <View className='flex-row items-center justify-between bg-white border border-gray-100 p-4 rounded-xl'>
                            <View className='flex-row items-center gap-4'>
                                <View className='w-12 h-8 bg-red-500 rounded items-center justify-center'>
                                    {/* Simulated Mastercard Logo */}
                                    <View className='flex-row -space-x-2'>
                                        <View className='w-3 h-3 rounded-full bg-red-500' />
                                        <View className='w-3 h-3 rounded-full bg-yellow-400' />
                                    </View>
                                </View>
                                <View>
                                    <ThemedText className='text-slate-900 font-bold'>**** **** **** 4567</ThemedText>
                                    <ThemedText className='text-gray-400 text-xs'>Expires 09/25</ThemedText>
                                </View>
                            </View>
                        </View>
                    </View>

                    <ThemedText className='text-center text-gray-400 text-xs mt-8'>Bank cards are stored securely by Paystack</ThemedText>

                </ScrollView>

                {/* Footer Button */}
                <View className='absolute bottom-0 w-full p-5 bg-white border-t border-gray-100 safe-bottom'>
                    <TouchableOpacity className='w-full bg-blue-600 py-4 rounded-xl items-center justify-center shadow-lg shadow-blue-500/30'>
                        <ThemedText className='text-white font-bold text-base'>Add New Card</ThemedText>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </ThemedView>
    )
}

export default Wallet
