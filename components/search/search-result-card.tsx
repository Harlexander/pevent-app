import { ThemedText } from '@/components/themed-text';
import Currency from '@/components/currency';
import { Event } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface SearchResultCardProps {
  event: Event;
  imageUrl: string;
}

const formatEventDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    const month = d.toLocaleString('en-US', { month: 'short' });
    const day = d.getDate();
    return { month, day };
  } catch {
    return { month: 'TBD', day: '--' };
  }
};

const getMinPrice = (event: Event): number | null => {
  if (!event.tickets || event.tickets.length === 0) return null;
  return Math.min(...event.tickets.map((t) => t.price));
};

const SearchResultCard = ({ event, imageUrl }: SearchResultCardProps) => {
  const { month, day } = formatEventDate(event.date);
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const minPrice = getMinPrice(event);

  return (
    <TouchableOpacity
      onPress={() => router.push(`/${event.slug}`)}
      activeOpacity={0.7}
      className="border-b border-gray-200 dark:border-gray-700 py-3 overflow-hidden"
    >
      <View className="flex-row">
        {/* Image */}
        <View className="w-24 h-24 relative">
          <Image
            source={{ uri: imageUrl }}
            contentFit="cover"
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
          />
          <View className="absolute top-1.5 left-1.5 bg-white/90 dark:bg-dark-bg/90 rounded-md px-1.5 py-0.5 items-center">
            <ThemedText className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{day}</ThemedText>
            <ThemedText className="text-[8px] font-semibold text-gray-500 dark:text-gray-400 uppercase">
              {month}
            </ThemedText>
          </View>
        </View>

        {/* Details */}
        <View className="flex-1 px-3 py-2 justify-center gap-2">
          <ThemedText numberOfLines={2} className="capitalize text-gray-900 dark:text-white text-sm leading-tight">
            {event.name}
          </ThemedText>

          <View className="gap-1 flex-row gap-2 items-center">
            {event.time && (
              <View className="flex-row items-center gap-1">
                <Ionicons name="time-outline" size={12} color={colorScheme === 'dark' ? '#9CA3AF' : '#6B7280'} />
                <ThemedText className="text-gray-600 dark:text-gray-400 text-xs">{event.time}</ThemedText>
              </View>
            )}
            <View className="flex-row items-center gap-1">
              <Ionicons name="location-outline" size={12} color={colorScheme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              <ThemedText numberOfLines={1} className="text-gray-600 dark:text-gray-400 text-xs flex-1 capitalize">
                {event.city || 'Location TBA'}
              </ThemedText>
            </View>
          </View>

          <View>
            {minPrice !== null ? (
              minPrice === 0 ? (
                <ThemedText className="text-green-600 dark:text-green-500 text-xs font-bold">Free</ThemedText>
              ) : (
                <View className="flex-row items-center gap-1">
                  <ThemedText className="text-gray-400 dark:text-gray-500 text-[10px]">From</ThemedText>
                  <Currency className="text-blue-600 dark:text-blue-400 text-xs font-bold">
                    {minPrice.toLocaleString()}
                  </Currency>
                </View>
              )
            ) : (
              <ThemedText className="text-gray-400 dark:text-gray-500 text-xs">No tickets</ThemedText>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResultCard;
