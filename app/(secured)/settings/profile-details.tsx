import BackButton from '@/components/back-button'
import UIModal from '@/components/UIModal'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { endpoints } from '@/constants/endpoints'
import { useUpdateUser } from '@/hooks/query/useAuth'
import { useUserStore } from '@/store/user-store'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, ScrollView, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '@/components/ui/input'

const ProfileDetails = () => {
    const user = useUserStore((state) => state.user)
    const { mutate: updateUser, isPending } = useUpdateUser()
    const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false)

    const [firstName, setFirstName] = useState(user?.firstName || '')
    const [lastName, setLastName] = useState(user?.lastName || '')
    const [name, setName] = useState(user?.name || '')
    const [email] = useState(user?.email || '')
    const [mobile, setMobile] = useState(user?.mobile || '')
    const [address, setAddress] = useState(user?.address || '')
    const [bio, setBio] = useState(user?.bio || '')
    const [state, setState] = useState(user?.state || '')
    const [country, setCountry] = useState(user?.country || '')

    const avatarSource = user?.image
        ? { uri: user.image.startsWith('http') ? user.image : endpoints.IMAGE_URL + user.image }
        : require('@/assets/images/home/avatar.png')

    const handleUpdate = () => {
        updateUser(
            { firstName, lastName, name, mobile, address, bio, state, country },
            {
                onSuccess: () => {
                    Alert.alert('Success', 'Profile updated successfully')
                },
                onError: () => {
                    Alert.alert('Error', 'Failed to update profile')
                },
            },
        )
    }

    return (
        <ThemedView className="flex-1 bg-white">
            <SafeAreaView className="flex-1">
                {/* Header */}
                <View className="flex-row items-center justify-between px-5 py-2 mb-4">
                    <BackButton />
                    <ThemedText className="text-lg font-bold">Profile</ThemedText>
                    <View className="w-10" />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
                >
                    {/* Avatar Section */}
                    <View className="items-center mb-8">
                        <View className="relative">
                            <View className="w-28 h-28 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                <Image
                                    source={avatarSource}
                                    style={{ width: '100%', height: '100%' }}
                                    contentFit="cover"
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => setIsPhotoModalVisible(true)}
                                className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full items-center justify-center border-2 border-white"
                            >
                                <Ionicons name="pencil" size={14} color="white" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setIsPhotoModalVisible(true)}>
                            <ThemedText className="text-blue-400 font-medium mt-3 text-sm">
                                Change profile picture
                            </ThemedText>
                        </TouchableOpacity>
                    </View>

                    {/* Personal Information */}
                    <View className="mb-6">
                        <ThemedText className="text-lg font-bold text-slate-800">Personal</ThemedText>
                        <ThemedText className="text-gray-400 text-sm mb-4">
                            Update your personal information
                        </ThemedText>

                        <View className="gap-4">
                            <Input
                                label="First Name"
                                placeholder="First name"
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                            <Input
                                label="Last Name"
                                placeholder="Last name"
                                value={lastName}
                                onChangeText={setLastName}
                            />
                            <Input
                                label="Username"
                                placeholder="Username"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                    </View>

                    {/* Contact Information */}
                    <View className="mb-4">
                        <ThemedText className="text-lg font-bold text-slate-800">Contact</ThemedText>
                        <ThemedText className="text-gray-400 text-sm mb-4">
                            Update your contact information
                        </ThemedText>

                        <View className="gap-4">
                            <Input
                                label="Email"
                                placeholder="Email address"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                editable={false}
                            />
                            <Input
                                label="Mobile"
                                placeholder="+234 800 000 0000"
                                keyboardType="phone-pad"
                                value={mobile}
                                onChangeText={setMobile}
                            />
                            <Input
                                label="Address"
                                placeholder="Enter your address"
                                value={address}
                                onChangeText={setAddress}
                            />
                        </View>
                    </View>

                    {/* Location */}
                    <View className="mb-4">
                        <ThemedText className="text-lg font-bold text-slate-800">Location</ThemedText>
                        <ThemedText className="text-gray-400 text-sm mb-4">
                            Where are you based?
                        </ThemedText>

                        <View className="gap-4">
                            <Input
                                label="State"
                                placeholder="Enter your state"
                                value={state}
                                onChangeText={setState}
                            />
                            <Input
                                label="Country"
                                placeholder="Enter your country"
                                value={country}
                                onChangeText={setCountry}
                            />
                        </View>
                    </View>

                    {/* Bio */}
                    <View className="mb-4">
                        <ThemedText className="text-lg font-bold text-slate-800">About</ThemedText>
                        <ThemedText className="text-gray-400 text-sm mb-4">
                            Tell us about yourself
                        </ThemedText>

                        <Input
                            label="Bio"
                            placeholder="Write a short bio..."
                            value={bio}
                            onChangeText={setBio}
                            multiline
                            numberOfLines={4}
                            style={{ minHeight: 100, textAlignVertical: 'top' }}
                        />
                    </View>
                </ScrollView>

                {/* Footer Button */}
                <View className="absolute bottom-0 w-full p-5 bg-white border-t border-gray-100 safe-bottom">
                    <TouchableOpacity
                        onPress={handleUpdate}
                        disabled={isPending}
                        className={`w-full py-4 rounded-xl items-center justify-center flex-row gap-2 ${isPending ? 'bg-blue-300' : 'bg-blue-500 shadow-lg shadow-blue-500/30'}`}
                    >
                        {isPending && <ActivityIndicator color="white" size="small" />}
                        <ThemedText className="text-white font-bold text-base">
                            {isPending ? 'Updating...' : 'Update profile'}
                        </ThemedText>
                    </TouchableOpacity>
                </View>

                {/* Photo Modal */}
                <UIModal
                    isVisible={isPhotoModalVisible}
                    close={() => setIsPhotoModalVisible(false)}
                >
                    <View className="bg-white rounded-t-3xl p-6 pb-10">
                        <View className="w-10 h-1 bg-gray-200 rounded-full self-center mb-6" />

                        <ThemedText className="text-xl font-bold text-center text-blue-900 mb-2">
                            Photo
                        </ThemedText>
                        <ThemedText className="text-center text-gray-400 mb-8">
                            Select an option to edit your profile image
                        </ThemedText>

                        <TouchableOpacity className="flex-row items-center gap-4 py-4 border-b border-gray-100">
                            <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center">
                                <Ionicons name="image-outline" size={20} color="#64748b" />
                            </View>
                            <ThemedText className="text-base font-medium text-slate-600">
                                Upload from device
                            </ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-row items-center gap-4 py-4 border-b border-gray-100">
                            <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center">
                                <Ionicons name="camera-outline" size={20} color="#64748b" />
                            </View>
                            <ThemedText className="text-base font-medium text-slate-600">
                                Take a photo
                            </ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-row items-center gap-4 py-4">
                            <View className="w-10 h-10 rounded-full bg-red-50 items-center justify-center">
                                <Ionicons name="trash-outline" size={20} color="#ef4444" />
                            </View>
                            <ThemedText className="text-base font-medium text-red-500">
                                Remove photo
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </UIModal>
            </SafeAreaView>
        </ThemedView>
    )
}

export default ProfileDetails
