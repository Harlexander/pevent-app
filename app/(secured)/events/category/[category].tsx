import BackButton from '@/components/back-button';
import EventGridSkeleton from '@/components/events/event-grid-skeleton';
import EventCardCompact from '@/components/home/event-card-compact';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { endpoints } from '@/constants/endpoints';
import { useEventsByCategory } from '@/hooks/query/useEvent';
import { Ionicons } from '@expo/vector-icons';
import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORY_CONFIG: Record<
  string,
  { icon: keyof typeof Ionicons.glyphMap; color: string; bg: string; description: string }
> = {
  Music: {
    icon: 'musical-notes',
    color: '#8b5cf6',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    description: 'Live concerts, shows & performances',
  },
  Apartment: {
    icon: 'home',
    color: '#f59e0b',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    description: 'Apartment events & open houses',
  },
  Festival: {
    icon: 'bonfire',
    color: '#ef4444',
    bg: 'bg-red-50 dark:bg-red-900/20',
    description: 'Festivals, carnivals & celebrations',
  },
  Sports: {
    icon: 'football',
    color: '#10b981',
    bg: 'bg-green-50 dark:bg-green-900/20',
    description: 'Games, matches & sports events',
  },
  Art: {
    icon: 'color-palette',
    color: '#ec4899',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    description: 'Exhibitions, galleries & art shows',
  },
};

const CategoryEvents = () => {
  const { category } = useLocalSearchParams<{ category: string }>();
  const { data, isLoading } = useEventsByCategory(category);

  const events = data?.data || [];

  const config = CATEGORY_CONFIG[category] || {
    icon: 'grid' as const,
    color: '#3b82f6',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    description: `Browse ${category} events`,
  };

  const renderEmpty = () => (
    <View className="flex-1 items-center justify-center pt-20">
      <View className="w-20 h-20 rounded-full bg-gray-100 dark:bg-dark-card items-center justify-center mb-4">
        <Ionicons name="calendar-outline" size={36} color="#D1D5DB" />
      </View>
      <ThemedText className="text-gray-500 dark:text-gray-400 font-semibold text-base mb-1">
        No events found
      </ThemedText>
      <ThemedText className="text-gray-400 text-sm text-center px-10">
        There are no {category?.toLowerCase()} events at the moment. Check back later!
      </ThemedText>
    </View>
  );

  return (
    <ThemedView className="flex-1 bg-gray-50 dark:bg-dark-card">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="bg-white gap-4 dark:bg-dark-bg px-5 pt-4 pb-5 border-b border-gray-100 dark:border-gray-700">
          <BackButton />
          <View className="flex-row items-center gap-3 mb-3">
            <View className={`w-10 h-10 rounded-xl items-center justify-center ${config.bg}`}>
              <Ionicons name={config.icon} size={20} color={config.color} />
            </View>
            <View className="flex-1">
              <ThemedText className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {category} Events
              </ThemedText>
              <ThemedText className="text-xs text-gray-400 mt-0.5">{config.description}</ThemedText>
            </View>
          </View>
        </View>

        {/* Content */}
        {isLoading ? (
          <EventGridSkeleton />
        ) : events.length > 0 ? (
          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 20 }}
            contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Link href={`/${item.slug}`} className="mb-3">
                <EventCardCompact
                  image={endpoints.IMAGE_URL + item.images[0]}
                  title={item.name}
                  location={item.city || 'Undisclosed'}
                  date={item.date}
                  price={item.tickets?.[0]?.price ?? 0}
                  time={item.time}
                />
              </Link>
            )}
          />
        ) : (
          renderEmpty()
        )}
      </SafeAreaView>
    </ThemedView>
  );
};

export default CategoryEvents;
