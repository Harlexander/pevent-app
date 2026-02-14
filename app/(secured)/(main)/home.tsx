import BannerCarousel from '@/components/home/banner-carousel'
import CategoryList from '@/components/home/category-list'
import EventCard from '@/components/home/event-card'
import EventCardCompact from '@/components/home/event-card-compact'
import HomeHeader from '@/components/home/home-header'
import SearchBar from '@/components/home/search-bar'
import SectionHeader from '@/components/home/section-header'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { endpoints } from '@/constants/endpoints'
import { useAppEvents } from '@/hooks/query/useEvent'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
    const router = useRouter()
    const [activeCategory, setActiveCategory] = useState('All')
    const { data, isLoading } = useAppEvents()

    return (
        <ThemedView className="flex-1 h-screen">
            <SafeAreaView className="flex-1 bg-gray-50">
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 100, gap : 6 }}
                    showsVerticalScrollIndicator={false}
                >
                    <>
                    <View className='bg-white'>
                        <HomeHeader />

                        <BannerCarousel
                            images={[
                                'https://www.pevent.ng/explore.png',
                                require('@/assets/images/home/banner.png'),
                                require('@/assets/images/home/banner.png'),

                            ]}
                        />

                        <CategoryList
                            activeCategory={activeCategory}
                            onSelectCategory={setActiveCategory}
                        />
                    </View>
                    <View className='gap-2'>
                        <View className="bg-white p-5">
                            {/* Featured Events */}
                            <SectionHeader title="Featured Events" onPressSeeAll={() => router.push('/events/featured')} />
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                className="overflow-visible"
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
                                            price={event.tickets[0].price}
                                        />
                                    </Link>
                                ))}
                            </ScrollView>
                        </View>

                        <View className="bg-white p-5">
                            {/* Trending Events */}
                        <SectionHeader title="Trending Events" onPressSeeAll={() => router.push('/events/trending')} />
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="overflow-visible"
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
                                        price={event.tickets[0].price}
                                    />
                                </Link>
                            ))}
                        </ScrollView>
                        </View>

                        <View className="bg-white p-5">
                            {/* Latest Events */}
                        <SectionHeader title="Latest Events" onPressSeeAll={() => router.push('/events/latest')} />
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="overflow-visible"
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
                                        price={event.tickets[0].price}
                                    />
                                </Link>
                            ))}
                        </ScrollView>
                        </View>
                    </View>
                    </>
                </ScrollView>
            </SafeAreaView>
        </ThemedView>
    )
}

export default Home
