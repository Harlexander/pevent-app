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

function getStaticMapUrl(lat: string, lng: string): string {
  const zoom = 15
  const latNum = parseFloat(lat)
  const lngNum = parseFloat(lng)

  const n = Math.pow(2, zoom)
  const xtile = Math.floor(((lngNum + 180) / 360) * n)
  const ytile = Math.floor(
    ((1 - Math.log(Math.tan((latNum * Math.PI) / 180) + 1 / Math.cos((latNum * Math.PI) / 180)) / Math.PI) / 2) * n,
  )

  return `https://tile.openstreetmap.org/${zoom}/${xtile}/${ytile}.png`
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
        {hasCoordinates ? (
          <Image
            source={{ uri: getStaticMapUrl(coordinates.lat, coordinates.lng) }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
        ) : (
          <Image
            source={require('@/assets/images/map_placeholder.png')}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
        )}

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
