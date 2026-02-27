import SectionHeader from '@/components/home/section-header';
import { ThemedText } from '@/components/themed-text';
import { endpoints } from '@/constants/endpoints';
import { useRecentEventsStore } from '@/store/recent-events-store';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

const RecentlyViewed = () => {
  const recentEvents = useRecentEventsStore((s) => s.recentEvents);

  if (recentEvents.length === 0) return null;

  return (
    <View className="bg-white dark:bg-dark-bg p-5">
      <SectionHeader title="Recently Viewed" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible">
        {recentEvents.map((event) => (
          <Link href={`/${event.slug}`} key={event.id} className="mr-3">
            <View className="flex-row items-center bg-gray-50 dark:bg-dark-card rounded-2xl overflow-hidden w-64">
              <View className="w-20 h-20">
                {event.image ? (
                  <Image
                    source={{ uri: endpoints.IMAGE_URL + event.image }}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                  />
                ) : (
                  <View className="w-full h-full bg-gray-200 dark:bg-gray-700 items-center justify-center">
                    <Ionicons name="image-outline" size={24} color="#9ca3af" />
                  </View>
                )}
              </View>
              <View className="flex-1 px-3 py-2 gap-1">
                <ThemedText className="text-sm font-semibold text-black dark:text-white capitalize" numberOfLines={1}>
                  {event.name}
                </ThemedText>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="calendar-outline" size={12} color="#9ca3af" />
                  <ThemedText className="text-xs text-gray-400">
                    {format(new Date(event.date), 'MMM d, yyyy')}
                  </ThemedText>
                </View>
                {event.city && (
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="location-outline" size={12} color="#9ca3af" />
                    <ThemedText className="text-xs text-gray-400 capitalize" numberOfLines={1}>
                      {event.city}
                    </ThemedText>
                  </View>
                )}
              </View>
            </View>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecentlyViewed;
