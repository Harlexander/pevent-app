import UIModal from '@/components/UIModal'
import Select from '@/components/ui/select'
import { ThemedText } from '@/components/themed-text'
import { countries, states } from '@/constants/location'
import { useUpdateUser } from '@/hooks/query/useAuth'
import * as Location from 'expo-location'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface LocationModalProps {
    visible: boolean
    onClose: () => void
}

const LocationModal = ({ visible, onClose }: LocationModalProps) => {
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [isLocating, setIsLocating] = useState(false)
    const { mutate: updateUser, isPending } = useUpdateUser()

    const stateOptions = country && states[country] ? states[country] : []

    const handleCountryChange = (value: string) => {
        setCountry(value)
        setState('')
    }

    const handleUseCurrentLocation = async () => {
        setIsLocating(true)
        try {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location permission is required to auto-detect your location.')
                return
            }

            const position = await Location.getCurrentPositionAsync({})
            const [geocoded] = await Location.reverseGeocodeAsync({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })

            if (geocoded) {
                setCountry(geocoded.country || '')
                setState(geocoded.region || '')
            }
        } catch {
            Alert.alert('Error', 'Failed to get your location. Please select manually.')
        } finally {
            setIsLocating(false)
        }
    }

    const handleSubmit = () => {
        if (!state || !country) {
            Alert.alert('Error', 'Please provide both state and country.')
            return
        }

        updateUser(
            { state, country },
            {
                onSuccess: () => {
                    setState('')
                    setCountry('')
                    onClose()
                },
                onError: () => {
                    Alert.alert('Error', 'Failed to update location. Please try again.')
                },
            },
        )
    }

    return (
        <UIModal isVisible={visible}>
            <View className="bg-white dark:bg-dark-bg rounded-t-3xl p-6">
                <View className="w-10 h-1 bg-gray-200 dark:bg-gray-700 rounded-full self-center mb-6" />

                <ThemedText className="text-xl font-bold text-center text-blue-900 dark:text-blue-200 mb-2">
                    Set Your Location
                </ThemedText>

                <ThemedText className="text-gray-400 text-sm text-center mb-6">
                    We need your location to show you relevant events nearby.
                </ThemedText>

                <TouchableOpacity
                    onPress={handleUseCurrentLocation}
                    disabled={isLocating}
                    className="flex-row items-center justify-center gap-2 py-3 px-4 rounded-xl border border-blue-500 mb-6"
                >
                    {isLocating ? (
                        <ActivityIndicator color="#3b82f6" size="small" />
                    ) : (
                        <Ionicons name="locate" size={20} color="#3b82f6" />
                    )}
                    <ThemedText className="text-blue-500 font-semibold text-sm">
                        {isLocating ? 'Detecting location...' : 'Use current location'}
                    </ThemedText>
                </TouchableOpacity>

                <View className="flex-row items-center mb-6">
                    <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                    <ThemedText className="text-gray-400 text-xs mx-3">or select manually</ThemedText>
                    <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                </View>

                <View className="mb-4">
                    <Select
                        label="Country"
                        placeholder="Select your country"
                        value={country}
                        options={countries}
                        onValueChange={handleCountryChange}
                        searchPlaceholder="Search countries..."
                        icon="earth"
                    />
                </View>

                <View className="mb-4">
                    <Select
                        label="State"
                        placeholder={country ? 'Select your state' : 'Select a country first'}
                        value={state}
                        options={stateOptions}
                        onValueChange={setState}
                        disabled={!country}
                        searchPlaceholder="Search states..."
                        icon="location"
                    />
                </View>

                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={isPending}
                    className={`w-full py-4 rounded-xl items-center justify-center flex-row gap-2 mt-4 mb-4 ${isPending ? 'bg-blue-300' : 'bg-blue-500 shadow-lg shadow-blue-500/30'}`}
                >
                    {isPending && <ActivityIndicator color="white" size="small" />}
                    <ThemedText className="text-white font-bold text-base">
                        {isPending ? 'Saving...' : 'Save location'}
                    </ThemedText>
                </TouchableOpacity>
            </View>
        </UIModal>
    )
}

export default LocationModal
