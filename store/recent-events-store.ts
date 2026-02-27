import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const MAX_RECENT = 5;

export interface RecentEvent {
  id: string;
  name: string;
  slug: string;
  date: string;
  city: string | null;
  image: string;
}

interface RecentEventsState {
  recentEvents: RecentEvent[];
  addRecentEvent: (event: RecentEvent) => void;
}

export const useRecentEventsStore = create<RecentEventsState>()(
  persist(
    (set) => ({
      recentEvents: [],
      addRecentEvent: (event) =>
        set((state) => {
          const filtered = state.recentEvents.filter((e) => e.id !== event.id);
          return { recentEvents: [event, ...filtered].slice(0, MAX_RECENT) };
        }),
    }),
    {
      name: 'recent-events-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
