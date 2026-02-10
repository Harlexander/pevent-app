import BackButton from '@/components/back-button'
import SearchBar from '@/components/home/search-bar'
import FilterModal from '@/components/search/filter-modal'
import SearchResultCard from '@/components/search/search-result-card'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { endpoints } from '@/constants/endpoints'
import { useRecommendedEvents, useSearchEvents } from '@/hooks/query/useEvent'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Search = () => {
    const [isFilterVisible, setFilterVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const { data, isLoading, error } = useSearchEvents(searchQuery)
    const { data: recommendedData, isLoading: isLoadingRecommended } = useRecommendedEvents()

    return (
        <ThemedView className='flex-1 bg-white'>
            <SafeAreaView edges={['top']} className='flex-1'>
                <View className='px-5 flex-1'>
                    {/* Header */}
                    <View className='flex-row items-center mb-6 mt-2'>
                        <BackButton />
                        <View className='flex-1 items-center mr-10'>
                            <ThemedText className='text-lg font-bold'>Search results</ThemedText>
                        </View>
                    </View>

                    {/* Search Input */}
                    <SearchBar
                        onFilterPress={() => setFilterVisible(true)}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />

                    {/* Result List */}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {isLoading && searchQuery.length > 0 && (
                            <View className='py-10 items-center'>
                                <ActivityIndicator size="large" color="#3b82f6" />
                                <ThemedText className='text-gray-500 mt-4'>Searching...</ThemedText>
                            </View>
                        )}

                        {!isLoading && searchQuery.length === 0 && (
                            <>
                                <ThemedText className='text-lg font-semibold mb-4'>Recommended for you</ThemedText>
                                {isLoadingRecommended && (
                                    <View className='py-10 items-center'>
                                        <ActivityIndicator size="large" color="#3b82f6" />
                                    </View>
                                )}
                                
                                <View>
                                    {!isLoadingRecommended && recommendedData?.data && recommendedData.data.length > 0 && (
                                        recommendedData.data.map((event) => (
                                                <SearchResultCard
                                                    event={event}
                                                    imageUrl={endpoints.IMAGE_URL + event.images[0]}
                                                />
                                        ))
                                    )}
                                </View>


                                {!isLoadingRecommended && recommendedData?.data && recommendedData.data.length === 0 && (
                                    <View className='py-10 items-center'>
                                        <ThemedText className='text-gray-500'>No recommended events available</ThemedText>
                                    </View>
                                )}
                            </>
                        )}

                        {!isLoading && searchQuery.length > 0 && data?.data && data.data.length === 0 && (
                            <View className='py-10 items-center'>
                                <ThemedText className='text-gray-500'>No events found</ThemedText>
                            </View>
                        )}

                        {!isLoading && data?.data && data.data.length > 0 && (
                            data.data.map((event) => (
                                <Link href={`/${event.slug}`} key={event.id}>
                                    <SearchResultCard
                                        event={event}
                                        imageUrl={endpoints.IMAGE_URL + event.images[0]}
                                    />
                                </Link>
                            ))
                        )}

                        {error && (
                            <View className='py-10 items-center'>
                                <ThemedText className='text-red-500'>Error loading results</ThemedText>
                            </View>
                        )}
                    </ScrollView>
                </View>

                <FilterModal
                    visible={isFilterVisible}
                    onClose={() => setFilterVisible(false)}
                />
            </SafeAreaView>
        </ThemedView>
    )
}

export default Search