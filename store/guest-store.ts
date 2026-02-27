import { create } from 'zustand'

interface GuestState {
  isGuest: boolean
  enterGuestMode: () => void
  exitGuestMode: () => void
}

export const useGuestStore = create<GuestState>((set) => ({
  isGuest: false,
  enterGuestMode: () => set({ isGuest: true }),
  exitGuestMode: () => set({ isGuest: false }),
}))
