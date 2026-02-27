import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { endpoints } from '@/constants/endpoints';
import { useOrganiser } from '@/hooks/query/useOrganiser';
import {
  EventsListSkeleton,
  OrganiserHeaderSkeleton,
  ProfileCardSkeleton,
} from '@/components/organiser/organiser-skeleton';
import { Event } from '@/types';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Image } from 'expo-image';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Linking, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const socialLinks = {
  instagram: 'https://instagram.com/pevent',
  twitter: 'https://twitter.com/pevent',
  facebook: 'https://facebook.com/pevent',
  website: 'https://pevent.com',
};

const getMinPrice = (event: Event) => {
  if (!event.tickets || event.tickets.length === 0) return 'Free';
  const prices = event.tickets.map((t) => t.price).filter((p) => p > 0);
  if (prices.length === 0) return 'Free';
  return `₦${Math.min(...prices).toLocaleString()}`;
};

const OrganiserProfile = () => {
  const { colorScheme } = useColorScheme();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: organiser, isLoading, error } = useOrganiser(id as string);

  if (error && !isLoading) {
    return (
      <ThemedView className="flex-1 bg-gray-50 dark:bg-dark-card items-center justify-center px-5">
        <Ionicons name="alert-circle-outline" size={64} color="#D1D5DB" />
        <ThemedText className="text-gray-400 text-center mt-4">Failed to load organiser information</ThemedText>
      </ThemedView>
    );
  }

  const { name, firstName, lastName, image, bio, events } = organiser?.data ?? {};
  const displayName = firstName && lastName ? `${firstName} ${lastName}` : name;
  const imageUrl = image ? (image.startsWith('http') ? image : endpoints.IMAGE_URL + image) : null;

  return (
    <ThemedView className="flex-1 bg-gray-50 dark:bg-dark-card">
      <SafeAreaView className="flex-1">
        {/* Header */}
        {isLoading ? (
          <OrganiserHeaderSkeleton />
        ) : (
          <View className="px-5 py-4 flex-row items-center bg-white dark:bg-dark-bg">
            <Pressable onPress={() => router.back()} className="mr-3 active:opacity-70">
              <Ionicons name="arrow-back" size={24} color={colorScheme === 'dark' ? '#e5e7eb' : '#000'} />
            </Pressable>
            <ThemedText className="text-xl font-jost-semibold text-black dark:text-white">Organiser Profile</ThemedText>
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Profile Card */}
          {isLoading ? (
            <ProfileCardSkeleton />
          ) : (
            <View className="mx-5 mt-5 bg-white dark:bg-dark-bg rounded-3xl overflow-hidden shadow-sm">
              <View className="h-32 bg-gradient-to-r from-blue-500 to-purple-600" />

              <View className="px-6 pb-6">
                {/* Avatar */}
                <View className="-mt-16 mb-4 items-center">
                  <View className="w-32 h-32 rounded-full bg-white dark:bg-dark-bg p-2 shadow-lg">
                    <View className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 items-center justify-center">
                      {imageUrl ? (
                        <Image
                          source={{ uri: imageUrl }}
                          style={{ width: '100%', height: '100%' }}
                          contentFit="cover"
                        />
                      ) : (
                        <Ionicons name="person" size={56} color="#9CA3AF" />
                      )}
                    </View>
                  </View>
                </View>

                {/* Name */}
                <ThemedText className="text-2xl font-jost-semibold text-black dark:text-white text-center mb-2 capitalize">
                  {displayName}
                </ThemedText>

                {/* Bio */}
                {bio ? (
                  <ThemedText className="text-gray-600 dark:text-gray-300 text-center mb-6 leading-5">{bio}</ThemedText>
                ) : (
                  <ThemedText className="text-gray-400 text-center mb-6 italic">
                    Event organiser passionate about creating memorable experiences
                  </ThemedText>
                )}

                {/* Stats */}
                <View className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-6">
                  <View className="flex-row justify-around">
                    <View className="items-center">
                      <ThemedText className="text-3xl font-semibold text-blue-600">{events?.length || 0}</ThemedText>
                      <ThemedText className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                        {events?.length === 1 ? 'Event' : 'Events'}
                      </ThemedText>
                    </View>
                    <View className="w-px bg-gray-300 dark:bg-gray-600" />
                    <View className="items-center">
                      <ThemedText className="text-3xl font-semibold text-purple-600">
                        {events?.reduce((sum: number, e: Event) => sum + (e.tickets?.length || 0), 0) || 0}
                      </ThemedText>
                      <ThemedText className="text-gray-600 dark:text-gray-300 text-sm mt-1">Ticket Types</ThemedText>
                    </View>
                  </View>
                </View>

                {/* Social Links */}
                <View>
                  <View className="flex-row justify-around">
                    <Pressable
                      onPress={() => Linking.openURL(socialLinks.instagram)}
                      className="items-center active:opacity-70"
                    >
                      <View className="w-12 h-12 rounded-full items-center justify-center">
                        <Ionicons name="logo-instagram" size={28} color={colorScheme === 'dark' ? '#FFF' : '#374151'} />
                      </View>
                      <ThemedText className="text-xs text-gray-600 dark:text-gray-300 mt-2">Instagram</ThemedText>
                    </Pressable>

                    <Pressable
                      onPress={() => Linking.openURL(socialLinks.twitter)}
                      className="items-center active:opacity-70"
                    >
                      <View className="w-12 h-12 rounded-full items-center justify-center">
                        <Ionicons name="logo-twitter" size={28} color={colorScheme === 'dark' ? '#FFF' : '#374151'} />
                      </View>
                      <ThemedText className="text-xs text-gray-600 dark:text-gray-300 mt-2">X</ThemedText>
                    </Pressable>

                    <Pressable
                      onPress={() => Linking.openURL(socialLinks.facebook)}
                      className="items-center active:opacity-70"
                    >
                      <View className="w-12 h-12 rounded-full items-center justify-center">
                        <Ionicons name="logo-facebook" size={28} color={colorScheme === 'dark' ? '#FFF' : '#374151'} />
                      </View>
                      <ThemedText className="text-xs text-gray-600 dark:text-gray-300 mt-2">Facebook</ThemedText>
                    </Pressable>

                    <Pressable
                      onPress={() => Linking.openURL(socialLinks.website)}
                      className="items-center active:opacity-70"
                    >
                      <View className="w-12 h-12 rounded-full items-center justify-center">
                        <Ionicons name="globe-outline" size={28} color={colorScheme === 'dark' ? '#FFF' : '#374151'} />
                      </View>
                      <ThemedText className="text-xs text-gray-600 dark:text-gray-300 mt-2">Website</ThemedText>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Events Section */}
          {isLoading ? (
            <EventsListSkeleton />
          ) : (
            <View className="px-5 mt-6">
              <View className="flex-row items-center justify-between mb-4">
                <ThemedText className="text-lg font-jost-semibold text-black dark:text-white">Events</ThemedText>
                {events && events.length > 0 && (
                  <View className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                    <ThemedText className="text-blue-600 font-semibold text-xs">{events.length} Total</ThemedText>
                  </View>
                )}
              </View>

              {events && events.length > 0 ? (
                <View className="flex-row flex-wrap justify-between">
                  {events.map((event: Event) => (
                    <Link href={`/${event.slug}`} key={event.id} asChild>
                      <Pressable className="w-[48%] mb-4 bg-white dark:bg-dark-bg rounded-2xl overflow-hidden shadow-sm active:opacity-90">
                        <View className="w-full h-36 bg-gradient-to-br from-gray-100 dark:from-gray-800 to-gray-200 dark:to-gray-700">
                          {event.images && event.images.length > 0 ? (
                            <Image
                              source={{ uri: endpoints.IMAGE_URL + event.images[0] }}
                              style={{ width: '100%', height: '100%' }}
                              contentFit="cover"
                            />
                          ) : (
                            <View className="w-full h-full items-center justify-center">
                              <Ionicons name="image-outline" size={32} color="#9CA3AF" />
                            </View>
                          )}
                        </View>

                        <View className="p-3">
                          <ThemedText
                            className="text-black dark:text-white font-semibold text-sm mb-2 capitalize leading-5"
                            numberOfLines={2}
                          >
                            {event.name}
                          </ThemedText>

                          <View className="flex-row items-center mb-2">
                            <View className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/20 items-center justify-center mr-2">
                              <Ionicons name="calendar-outline" size={12} color="#3B82F6" />
                            </View>
                            <ThemedText className="text-gray-600 dark:text-gray-300 text-xs flex-1">
                              {format(new Date(event.date), 'MMM d, yyyy')}
                            </ThemedText>
                          </View>
                        </View>
                      </Pressable>
                    </Link>
                  ))}
                </View>
              ) : (
                <View className="bg-white dark:bg-dark-bg rounded-2xl p-8 items-center">
                  <View className="w-20 h-20 rounded-full bg-gray-100 dark:bg-dark-card items-center justify-center mb-4">
                    <Ionicons name="calendar-outline" size={40} color="#D1D5DB" />
                  </View>
                  <ThemedText className="text-gray-400 font-semibold mb-1">No Events Yet</ThemedText>
                  <ThemedText className="text-gray-400 text-xs text-center">
                    Check back soon for upcoming events
                  </ThemedText>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default OrganiserProfile;
