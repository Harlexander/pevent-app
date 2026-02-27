import BackButton from '@/components/back-button'
import { ThemedText } from '@/components/themed-text'
import { endpoints } from '@/constants/endpoints'
import { useFavoritesStore, FavoriteEvent } from '@/store/favorites-store'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const EventCard = ({ event }: { event: FavoriteEvent }) => {
  const { removeFavorite } = useFavoritesStore()
  const imageUri = event.images?.[0]
    ? event.images[0].startsWith('http')
      ? event.images[0]
      : endpoints.IMAGE_URL + event.images[0]
    : null

  return (
    <Link href={`/${event.slug}` as any} asChild>
      <TouchableOpacity className="flex-1 bg-white dark:bg-dark-card rounded-2xl overflow-hidden" activeOpacity={0.8}>
        <View className="w-full h-32 bg-gray-100 dark:bg-dark-bg">
          {imageUri && (
            <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
          )}
          <TouchableOpacity
            onPress={() => removeFavorite(event.id)}
            className="absolute top-2 right-2 w-8 h-8 bg-white/80 dark:bg-dark-bg/80 rounded-full items-center justify-center"
            activeOpacity={0.7}
          >
            <Ionicons name="heart" size={16} color="#ef4444" />
          </TouchableOpacity>
        </View>
        <View className="p-3 gap-1">
          <ThemedText className="text-sm font-semibold text-slate-900 dark:text-gray-100 capitalize" numberOfLines={1}>
            {event.name}
          </ThemedText>
          <ThemedText className="text-xs text-gray-400" numberOfLines={1}>
            {event.city || 'TBA'}
          </ThemedText>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

const Favorites = () => {
  const { favorites } = useFavoritesStore()

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-dark-bg">
      <View className="flex-row items-center px-5 py-3">
        <BackButton />
        <ThemedText className="text-lg font-jost-semibold ml-3 text-black dark:text-white">Favorites</ThemedText>
      </View>

      {favorites.length === 0 ? (
        <View className="flex-1 items-center justify-center px-5">
          <View className="w-20 h-20 rounded-full bg-gray-100 dark:bg-dark-card items-center justify-center mb-4">
            <Ionicons name="heart-outline" size={40} color="#9ca3af" />
          </View>
          <ThemedText className="text-lg font-jost-semibold text-slate-900 dark:text-gray-100 mb-2">No favorites yet</ThemedText>
          <ThemedText className="text-sm text-gray-400 text-center">
            Tap the heart icon on events you love to save them here
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ padding: 16, gap: 12 }}
          columnWrapperStyle={{ gap: 12 }}
          renderItem={({ item }) => <EventCard event={item} />}
        />
      )}
    </SafeAreaView>
  )
}

export default Favorites
