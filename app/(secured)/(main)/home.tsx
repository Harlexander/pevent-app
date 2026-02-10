import CategoryList from '@/components/home/category-list'
import EventCard from '@/components/home/event-card'
import EventCardCompact from '@/components/home/event-card-compact'
import HomeHeader from '@/components/home/home-header'
import SearchBar from '@/components/home/search-bar'
import SectionHeader from '@/components/home/section-header'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { endpoints } from '@/constants/endpoints'
import { useAppEvents, useEventsByCategory } from '@/hooks/query/useEvent'
import { Image } from 'expo-image'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
    const router = useRouter()
    const [activeCategory, setActiveCategory] = useState('All')
    const { data, isLoading } = useAppEvents()
    const { data: categoryData, isLoading: isCategoryLoading } = useEventsByCategory(
        activeCategory === 'All' ? '' : activeCategory,
    )

    const showCategoryResults = activeCategory !== 'All'

    return (
        <ThemedView className="flex-1 h-screen bg-white">
            <SafeAreaView className="flex-1">
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View className="px-5 pt-2">
                        <HomeHeader />
                        <SearchBar />

                        {/* Banner */}
                        <View className="w-full h-24 rounded-xl overflow-hidden mb-6">
                            <Image
                                source={require('@/assets/images/home/banner.png')}
                                style={{ width: '100%', height: '100%' }}
                                contentFit="cover"
                            />
                        </View>

                        <CategoryList
                            activeCategory={activeCategory}
                            onSelectCategory={setActiveCategory}
                        />

                        {showCategoryResults ? (
                            <>
                                <SectionHeader title={`${activeCategory} Events`} />

                                {isCategoryLoading ? (
                                    <View className="items-center py-10">
                                        <ActivityIndicator size="large" color="#007bff" />
                                    </View>
                                ) : categoryData?.data && categoryData.data.length > 0 ? (
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        className="mb-4 overflow-visible"
                                    >
                                        {categoryData.data.map((event) => (
                                            <Link
                                                href={`/${event.slug}`}
                                                key={event.id}
                                                className="mr-4"
                                            >
                                                <EventCard
                                                    image={endpoints.IMAGE_URL + event.images[0]}
                                                    title={event.name}
                                                    location={event.city || 'undisclosed'}
                                                    date={event.date}
                                                    price={'2000'}
                                                />
                                            </Link>
                                        ))}
                                    </ScrollView>
                                ) : (
                                    <View className="items-center py-10">
                                        <ThemedText className="text-gray-400">
                                            No events found in this category
                                        </ThemedText>
                                    </View>
                                )}
                            </>
                        ) : (
                            <>
                                {/* Featured Events */}
                                <SectionHeader title="Featured Events" onPressSeeAll={() => router.push('/events/featured')} />
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    className="mb-2 overflow-visible"
                                >
                                    {data?.data?.featured.map((event) => (
                                        <Link
                                            href={`/${event.slug}`}
                                            key={event.id}
                                            className="mr-4"
                                        >
                                            <EventCard
                                                image={endpoints.IMAGE_URL + event.images[0]}
                                                title={event.name}
                                                location={event.city || 'undisclosed'}
                                                date={event.date}
                                                price={'2000'}
                                            />
                                        </Link>
                                    ))}
                                </ScrollView>

                                {/* Trending Events */}
                                <SectionHeader title="Trending Events" onPressSeeAll={() => router.push('/events/trending')} />
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    className="mb-2 overflow-visible"
                                >
                                    {data?.data?.trending.map((event) => (
                                        <Link
                                            href={`/${event.slug}`}
                                            key={event.id}
                                            className="mr-4"
                                        >
                                            <EventCardCompact
                                                image={endpoints.IMAGE_URL + event.images[0]}
                                                title={event.name}
                                                location={event.city || 'undisclosed'}
                                                date={event.date}
                                                price={'2000'}
                                            />
                                        </Link>
                                    ))}
                                </ScrollView>

                                {/* Latest Events */}
                                <SectionHeader title="Latest Events" onPressSeeAll={() => router.push('/events/latest')} />
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    className="mb-4 overflow-visible"
                                >
                                    {data?.data?.latest.map((event) => (
                                        <Link
                                            href={`/${event.slug}`}
                                            key={event.id}
                                            className="mr-4"
                                        >
                                            <EventCard
                                                image={endpoints.IMAGE_URL + event.images[0]}
                                                title={event.name}
                                                location={event.city || 'undisclosed'}
                                                date={event.date}
                                                price={'2000'}
                                            />
                                        </Link>
                                    ))}
                                </ScrollView>
                            </>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ThemedView>
    )
}

export default Home
