import { ThemedText } from '@/components/themed-text';
import Currency from '@/components/currency';
import { Event } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

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
  const router = useRouter();
  const minPrice = getMinPrice(event);

  return (
    <TouchableOpacity
      onPress={() => router.push(`/${event.slug}`)}
      activeOpacity={0.7}
      className="mb-3 bg-white rounded-2xl border border-gray-100"
    >
      <View className="flex-row">
        {/* Image */}
        <View className="w-28 h-28">
          <Image
            source={{ uri: imageUrl }}
            contentFit="cover"
            style={{
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
            }}
          />
          <View className="absolute top-2 left-2 bg-white/95 rounded-lg px-2 py-1 items-center min-w-[38px]">
            <ThemedText className="text-sm font-extrabold text-primary leading-4">{day}</ThemedText>
            <ThemedText className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide">
              {month}
            </ThemedText>
          </View>
        </View>

        {/* Details */}
        <View className="flex-1 px-3 py-2.5 justify-between">
          <ThemedText numberOfLines={2} className="font-bold capitalize text-gray-900 text-[15px] leading-5">
            {event.name}
          </ThemedText>

          <View className="flex-row gap-3">
            {event.time && (
              <View className="flex-row items-center gap-1.5">
                <View className="w-4 h-4 bg-blue-50 rounded-full items-center justify-center">
                  <Ionicons name="time-outline" size={10} color="#004cff" />
                </View>
                <ThemedText className="text-gray-600 text-xs">{event.time}</ThemedText>
              </View>
            )}
            <View className="flex-row items-center gap-1.5 flex-1">
              <View className="w-4 h-4 bg-purple-50 rounded-full items-center justify-center">
                <Ionicons name="location-outline" size={10} color="#8B5CF6" />
              </View>
              <ThemedText numberOfLines={1} className="text-gray-600 text-xs flex-1">
                {event.city || 'Location TBA'}
              </ThemedText>
            </View>
          </View>

          <View className="flex-row items-center">
            {minPrice !== null ? (
              minPrice === 0 ? (
                <ThemedText className="text-green-600 text-xs font-bold">Free</ThemedText>
              ) : (
                <View className="flex-row items-center gap-0.5">
                  <ThemedText className="text-gray-400 text-xs">From</ThemedText>
                  <Currency className="text-primary text-xs font-bold">
                    {minPrice.toLocaleString()}
                  </Currency>
                </View>
              )
            ) : (
              <ThemedText className="text-gray-400 text-xs">No tickets</ThemedText>
            )}
          </View>
        </View>

        {/* Arrow */}
        <View className="items-center justify-center pr-3">
          <View className="w-6 h-6 bg-gray-50 rounded-full items-center justify-center">
            <Ionicons name="chevron-forward" size={12} color="#9CA3AF" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResultCard;
