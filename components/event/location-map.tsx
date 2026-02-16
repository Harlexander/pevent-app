import { ThemedText } from '@/components/themed-text'
import { Coordinates } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import * as Linking from 'expo-linking'
import React, { useCallback } from 'react'
import { Alert, Platform, TouchableOpacity, View } from 'react-native'

interface LocationMapProps {
  location: string
  coordinates?: Coordinates | null
}

function openMaps(lat: string, lng: string, label: string) {
  const latNum = parseFloat(lat)
  const lngNum = parseFloat(lng)

  const url = Platform.select({
    ios: `maps:0,0?q=${label}@${latNum},${lngNum}`,
    android: `geo:${latNum},${lngNum}?q=${latNum},${lngNum}(${label})`,
    default: `https://www.google.com/maps/search/?api=1&query=${latNum},${lngNum}`,
  })

  Linking.openURL(url).catch(() => {
    Alert.alert('Error', 'Could not open maps application')
  })
}

const LocationMap = ({ location, coordinates }: LocationMapProps) => {
  const hasCoordinates = coordinates?.lat && coordinates?.lng

  const handlePress = useCallback(() => {
    if (hasCoordinates) {
      openMaps(coordinates.lat, coordinates.lng, location)
    }
  }, [coordinates, location, hasCoordinates])

  return (
    <View className="mb-24">
      <ThemedText className="text-black font-bold text-base mb-4">
        Location: <ThemedText className="font-normal opacity-70">{location}</ThemedText>
      </ThemedText>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        disabled={!hasCoordinates}
        className="w-full h-48 rounded-3xl overflow-hidden relative"
      >
        <Image
          source={require('@/assets/images/map_placeholder.png')}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
        />

        <View className="absolute bottom-0 w-full bg-white/80 backdrop-blur-sm h-12 flex-row items-center justify-center gap-2">
          <Ionicons name="navigate-outline" size={16} color="#4b5563" />
          <ThemedText className="text-gray-600 font-medium">
            {hasCoordinates ? 'Open in Maps' : 'View direction'}
          </ThemedText>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default LocationMap
