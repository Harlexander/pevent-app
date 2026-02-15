import BackButton from '@/components/back-button';
import EventGridSkeleton from '@/components/events/event-grid-skeleton';
import EventCardCompact from '@/components/home/event-card-compact';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { endpoints } from '@/constants/endpoints';
import { useAppEvents } from '@/hooks/query/useEvent';
import { Ionicons } from '@expo/vector-icons';
import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SECTION_CONFIG: Record<string, { title: string; description: string; icon: keyof typeof Ionicons.glyphMap; color: string; bg: string }> = {
  featured: {
    title: 'Featured Events',
    description: "Hand-picked events you don't want to miss",
    icon: 'star',
    color: '#f59e0b',
    bg: 'bg-amber-50',
  },
  trending: {
    title: 'Trending Events',
    description: 'The hottest events everyone is talking about',
    icon: 'flame',
    color: '#ef4444',
    bg: 'bg-red-50',
  },
  latest: {
    title: 'Latest Events',
    description: 'Fresh events just added to the platform',
    icon: 'sparkles',
    color: '#8b5cf6',
    bg: 'bg-purple-50',
  },
};

const EventSection = () => {
  const { section } = useLocalSearchParams<{ section: string }>();
  const { data, isLoading } = useAppEvents();

  const config = SECTION_CONFIG[section] || {
    title: 'Events',
    description: 'Browse all events',
    icon: 'calendar' as const,
    color: '#3b82f6',
    bg: 'bg-blue-50',
  };
  const events = data?.data?.[section as keyof typeof data.data] || [];

  const renderEmpty = () => (
    <View className="flex-1 items-center justify-center pt-20">
      <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center mb-4">
        <Ionicons name="calendar-outline" size={36} color="#D1D5DB" />
      </View>
      <ThemedText className="text-gray-500 font-semibold text-base mb-1">No events found</ThemedText>
      <ThemedText className="text-gray-400 text-sm text-center px-10">
        Check back later for new {section} events
      </ThemedText>
    </View>
  );

  return (
    <ThemedView className="flex-1 bg-gray-50">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="bg-white px-5 pt-4 pb-5 border-b border-gray-100">
          <View className="flex-row items-center gap-3 mb-3">
            <BackButton />
            <View className={`w-10 h-10 rounded-xl items-center justify-center ${config.bg}`}>
              <Ionicons name={config.icon} size={20} color={config.color} />
            </View>
            <View className="flex-1">
              <ThemedText className="text-xl font-bold text-gray-900">{config.title}</ThemedText>
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

export default EventSection;
