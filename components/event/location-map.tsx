import { ThemedText } from '@/components/themed-text'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Coordinates } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import * as Linking from 'expo-linking'
import { useToast } from '@/components/ui/toast'
import React, { useCallback } from 'react'
import { Platform, TouchableOpacity, View } from 'react-native'

interface LocationMapProps {
  location: string
  coordinates?: Coordinates | null
}

const LocationMap = ({ location, coordinates }: LocationMapProps) => {
  const { colorScheme } = useColorScheme()
  const toast = useToast()
  const hasCoordinates = coordinates?.lat && coordinates?.lng

  const handlePress = useCallback(() => {
    if (hasCoordinates) {
      const latNum = parseFloat(coordinates.lat)
      const lngNum = parseFloat(coordinates.lng)

      const url = Platform.select({
        ios: `maps:0,0?q=${location}@${latNum},${lngNum}`,
        android: `geo:${latNum},${lngNum}?q=${latNum},${lngNum}(${location})`,
        default: `https://www.google.com/maps/search/?api=1&query=${latNum},${lngNum}`,
      })

      Linking.openURL(url).catch(() => {
        toast.error('Could not open maps application')
      })
    }
  }, [coordinates, location, hasCoordinates, toast])

  return (
    <View className="mb-24">
      <ThemedText className="text-black dark:text-gray-100 font-jost-semibold text-base mb-4">
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

        <View className="absolute bottom-0 w-full bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm h-12 flex-row items-center justify-center gap-2">
          <Ionicons name="navigate-outline" size={16} color={colorScheme === 'dark' ? '#d1d5db' : '#4b5563'} />
          <ThemedText className="text-gray-600 dark:text-gray-300 font-medium">
            {hasCoordinates ? 'Open in Maps' : 'View direction'}
          </ThemedText>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default LocationMap
