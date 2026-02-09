import { User } from '@/types'
import { create } from 'zustand'

interface UserState {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    setUser: (user: User | null) => void
    setLoading: (loading: boolean) => void
    updateUser: (updates: Partial<User>) => void
    clearUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isLoading: true,
    isAuthenticated: false,

    setUser: (user) => set({
        user,
        isAuthenticated: !!user,
        isLoading: false,
    }),

    setLoading: (isLoading) => set({ isLoading }),

    updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null,
    })),

    clearUser: () => set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
    }),
}))
