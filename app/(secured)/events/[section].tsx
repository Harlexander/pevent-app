import BackButton from '@/components/back-button'
import EventCardCompact from '@/components/home/event-card-compact'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { endpoints } from '@/constants/endpoints'
import { useAppEvents } from '@/hooks/query/useEvent'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SECTION_TITLES: Record<string, string> = {
    featured: 'Featured Events',
    trending: 'Trending Events',
    latest: 'Latest Events',
}

const SECTION_DESCRIPTIONS: Record<string, string> = {
    featured: 'Hand-picked events you don\'t want to miss',
    trending: 'The hottest events everyone is talking about',
    latest: 'Fresh events just added to the platform',
}

const SECTION_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
    featured: 'star',
    trending: 'flame',
    latest: 'sparkles',
}

const EventSection = () => {
    const { section } = useLocalSearchParams<{ section: string }>()
    const { data, isLoading } = useAppEvents()

    const title = SECTION_TITLES[section] || 'Events'
    const description = SECTION_DESCRIPTIONS[section] || 'Browse all events'
    const icon = SECTION_ICONS[section] || 'calendar'
    const events = data?.data?.[section as keyof typeof data.data] || []

    return (
        <ThemedView className="flex-1 bg-white">
            <SafeAreaView className="flex-1">
                {/* Header Section */}
                <View>
                    <LinearGradient
                        colors={['#EEF2FF', '#F8FAFC']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            paddingHorizontal: 20,
                            paddingTop: 16,
                            paddingBottom: 20,
                        }}
                    >
                        {/* Title Row */}
                        <View className="flex-row items-center gap-2 mb-1">
                            <BackButton />
                            <ThemedText
                                style={{
                                    fontSize: 24,
                                    fontWeight: '800',
                                    color: '#1F2937',
                                }}
                            >
                                {title}
                            </ThemedText>
                        </View>

                        {/* Description and Count */}
                        <View className="flex-row items-center justify-between mt-1">
                            <ThemedText
                                style={{
                                    fontSize: 13,
                                    color: '#6B7280',
                                    flex: 1,
                                }}
                            >
                                {description}
                            </ThemedText>
                        </View>
                    </LinearGradient>
                </View>

                {/* Content */}
                {isLoading ? (
                    <View className="flex-1 items-center justify-center">
                        <View style={{ alignItems: 'center', gap: 12 }}>
                            <ActivityIndicator size="large" color="#004cff" />
                            <ThemedText style={{ fontSize: 14, color: '#9CA3AF' }}>
                                Loading events...
                            </ThemedText>
                        </View>
                    </View>
                ) : events.length > 0 ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 20,
                            paddingTop: 16,
                            paddingBottom: 100,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                gap: 8,
                            }}
                        >
                            {events.map((event) => (
                                <Link href={`/${event.slug}`} key={event.id}>
                                    <EventCardCompact
                                        image={endpoints.IMAGE_URL + event.images[0]}
                                        title={event.name}
                                        location={event.city || 'Undisclosed'}
                                        date={event.date}
                                        price={'2000'}
                                    />
                                </Link>
                            ))}
                        </View>
                    </ScrollView>
                ) : (
                    <View className="flex-1 items-center justify-center" style={{ gap: 12 }}>
                        <View
                            style={{
                                width: 64,
                                height: 64,
                                borderRadius: 32,
                                backgroundColor: '#F3F4F6',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Ionicons name="calendar-outline" size={28} color="#9CA3AF" />
                        </View>
                        <ThemedText
                            style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: '#6B7280',
                            }}
                        >
                            No events found
                        </ThemedText>
                        <ThemedText
                            style={{
                                fontSize: 13,
                                color: '#9CA3AF',
                                textAlign: 'center',
                                paddingHorizontal: 40,
                            }}
                        >
                            Check back later for new {section} events
                        </ThemedText>
                    </View>
                )}
            </SafeAreaView>
        </ThemedView>
    )
}

export default EventSection
