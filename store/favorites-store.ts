import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface FavoriteEvent {
  id: string
  name: string
  slug: string
  date: string
  time: string
  city: string | null
  images: string[]
  price: number
}

interface FavoritesState {
  favorites: FavoriteEvent[]
  addFavorite: (event: FavoriteEvent) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  toggleFavorite: (event: FavoriteEvent) => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (event) =>
        set((state) => ({
          favorites: state.favorites.some((f) => f.id === event.id)
            ? state.favorites
            : [...state.favorites, event],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        })),
      isFavorite: (id) => get().favorites.some((f) => f.id === id),
      toggleFavorite: (event) => {
        const { isFavorite, addFavorite, removeFavorite } = get()
        if (isFavorite(event.id)) {
          removeFavorite(event.id)
        } else {
          addFavorite(event)
        }
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
