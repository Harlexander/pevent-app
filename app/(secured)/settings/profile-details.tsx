import BackButton from '@/components/back-button'
import UIModal from '@/components/UIModal'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '@/components/ui/input'

const ProfileDetails = () => {
    const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false)

    return (
        <ThemedView className='flex-1 bg-white'>
            <SafeAreaView className='flex-1'>
                {/* Header */}
                <View className='flex-row items-center justify-between px-5 py-2 mb-4'>
                    <BackButton />
                    <ThemedText className='text-lg font-bold'>Profile</ThemedText>
                    <View className='w-10' />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>

                    {/* Avatar Section */}
                    <View className='items-center mb-8'>
                        <View className='relative'>
                            <View className='w-28 h-28 rounded-full overflow-hidden border-2 border-white shadow-sm'>
                                <Image
                                    source={require('@/assets/images/home/avatar.png')}
                                    style={{ width: '100%', height: '100%' }}
                                    contentFit="cover"
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => setIsPhotoModalVisible(true)}
                                className='absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full items-center justify-center border-2 border-white'
                            >
                                <Ionicons name="pencil" size={14} color="white" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setIsPhotoModalVisible(true)}>
                            <ThemedText className='text-blue-400 font-medium mt-3 text-sm'>Change profile picture</ThemedText>
                        </TouchableOpacity>
                    </View>

                    {/* Personal Information */}
                    <View className='mb-6'>
                        <ThemedText className='text-lg font-bold text-slate-800'>Personal</ThemedText>
                        <ThemedText className='text-gray-400 text-sm mb-4'>Update your personal information</ThemedText>

                        <View className='gap-4'>
                            <Input value="Micheal" />
                            <Input value="Adejunje" />
                            <Input value="@michealadejunje" />
                        </View>
                    </View>

                    {/* Contact Information */}
                    <View className='mb-4'>
                        <ThemedText className='text-lg font-bold text-slate-800'>Contact</ThemedText>
                        <ThemedText className='text-gray-400 text-sm mb-4'>Update your contact information</ThemedText>

                        <View className='gap-4'>
                            <Input value="michealadejunje@gmail.com" />
                            <View className='flex-row items-center bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-100'>
                                <View className='flex-row items-center gap-2 mr-3 border-r border-gray-200 pr-3'>
                                    {/* Simulated Nigeria Flag */}
                                    <View className='flex-row w-6 h-4 overflow-hidden rounded-[2px] border border-gray-200'>
                                        <View className='flex-1 bg-green-600' />
                                        <View className='flex-1 bg-white' />
                                        <View className='flex-1 bg-green-600' />
                                    </View>
                                    <Ionicons name="chevron-down" size={16} color="black" />
                                </View>
                                <ThemedText className='text-base font-medium text-slate-800'>+132 456 7890</ThemedText>
                            </View>
                        </View>
                    </View>

                </ScrollView>

                {/* Footer Button */}
                <View className='absolute bottom-0 w-full p-5 bg-white border-t border-gray-100 safe-bottom'>
                    <TouchableOpacity className='w-full bg-blue-500 py-4 rounded-xl items-center justify-center shadow-lg shadow-blue-500/30'>
                        <ThemedText className='text-white font-bold text-base'>Update profile</ThemedText>
                    </TouchableOpacity>
                </View>

                {/* Photo Modal */}
                <UIModal isVisible={isPhotoModalVisible} close={() => setIsPhotoModalVisible(false)}>
                    <View className='bg-white rounded-t-3xl p-6 pb-10'>
                        <View className='w-10 h-1 bg-gray-200 rounded-full self-center mb-6' />

                        <ThemedText className='text-xl font-bold text-center text-blue-900 mb-2'>Photo</ThemedText>
                        <ThemedText className='text-center text-gray-400 mb-8'>Select an option to edit your profile image</ThemedText>

                        <TouchableOpacity className='flex-row items-center gap-4 py-4 border-b border-gray-100'>
                            <View className='w-10 h-10 rounded-full bg-gray-50 items-center justify-center'>
                                <Ionicons name="image-outline" size={20} color="#64748b" />
                            </View>
                            <ThemedText className='text-base font-medium text-slate-600'>Upload from device</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity className='flex-row items-center gap-4 py-4 border-b border-gray-100'>
                            <View className='w-10 h-10 rounded-full bg-gray-50 items-center justify-center'>
                                <Ionicons name="camera-outline" size={20} color="#64748b" />
                            </View>
                            <ThemedText className='text-base font-medium text-slate-600'>Take a photo</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity className='flex-row items-center gap-4 py-4'>
                            <View className='w-10 h-10 rounded-full bg-red-50 items-center justify-center'>
                                <Ionicons name="trash-outline" size={20} color="#ef4444" />
                            </View>
                            <ThemedText className='text-base font-medium text-red-500'>Remove photo</ThemedText>
                        </TouchableOpacity>
                    </View>
                </UIModal>

            </SafeAreaView>
        </ThemedView>
    )
}

export default ProfileDetails
