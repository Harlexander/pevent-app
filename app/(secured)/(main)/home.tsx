import CategoryList from '@/components/home/category-list'
import EventCard from '@/components/home/event-card'
import HomeHeader from '@/components/home/home-header'
import SearchBar from '@/components/home/search-bar'
import SectionHeader from '@/components/home/section-header'
import VotingCard from '@/components/home/voting-card'
import { ThemedView } from '@/components/themed-view'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppEvents } from '@/hooks/query/useEvent'
import { endpoints } from '@/constants/endpoints'

const Home = () => {
    const { data, isLoading, error } = useAppEvents();
    return (
        <ThemedView className='flex-1 h-screen bg-white'>
            <SafeAreaView className='flex-1'>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View className='px-5 pt-2'>
                        <HomeHeader />
                        <SearchBar />

                        {/* Banner */}
                        <View className='w-full h-24 rounded-xl overflow-hidden mb-6'>
                            <Image
                                source={require('@/assets/images/home/banner.png')}
                                style={{ width: '100%', height: '100%' }}
                                contentFit="cover"
                            />
                        </View>

                        <CategoryList />

                        {/* Featured Events */}
                        <SectionHeader title="Featured Events" onPressSeeAll={() => { }} />
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className='mb-2 overflow-visible'
                        >
                            {
                                data && data.data?.featured.map((event) => (
                                    <Link href={`/${event.slug}`} key={event.id} className='mr-4'>
                                        <EventCard
                                            image={endpoints.IMAGE_URL + event.images[0]}
                                            title={event.name}
                                            location={event.city || "undisclosed"}
                                            date={event.date}
                                            price={"2000"}
                                        />
                                    </Link>
                                ))
                            }
                        </ScrollView>

                        {/* Popular Voting */}
                        <SectionHeader title="Popular Voting" onPressSeeAll={() => { }} />
                        <View className='gap-2'>
                            <VotingCard
                                image={require('@/assets/images/home/dance.png')}
                                title="The dance"
                                time="10 AM"
                                date="Thu 31st, Jul 2025"
                                price="N 50"
                            />
                            <VotingCard
                                image={require('@/assets/images/home/dance.png')} // Reuse dance as placeholder
                                title="The dance (Batch B)"
                                time="02 PM"
                                date="Thu 31st, Jul 2025"
                                price="N 50"
                            />
                        </View>

                        {/* Trending Events */}
                        <SectionHeader title="Trending Events" onPressSeeAll={() => { }} />
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className='mb-2 overflow-visible'
                        >
                            {
                                data && data.data?.trending.map((event) => (
                                    <Link href={`/${event.slug}`} key={event.id} className='mr-4'>
                                        <EventCard
                                            image={endpoints.IMAGE_URL + event.images[0]}
                                            title={event.name}
                                            location={event.city || "undisclosed"}
                                            date={event.date}
                                            price={"2000"}
                                        />
                                    </Link>
                                ))
                            }
                        </ScrollView>

                        {/* Latest Events */}
                        <SectionHeader title="Latest Events" onPressSeeAll={() => { }} />
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className='mb-4 overflow-visible'
                        >
                            {
                                data && data.data?.latest.map((event) => (
                                    <Link href={`/${event.slug}`} key={event.id} className='mr-4'>
                                        <EventCard
                                            image={endpoints.IMAGE_URL + event.images[0]}
                                            title={event.name}
                                            location={event.city || "undisclosed"}
                                            date={event.date}
                                            price={"2000"}
                                        />
                                    </Link>
                                ))
                            }
                        </ScrollView>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </ThemedView>
    )
}

export default Home