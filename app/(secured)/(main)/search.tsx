import BackButton from '@/components/back-button';
import SearchBar from '@/components/home/search-bar';
import FilterModal from '@/components/search/filter-modal';
import SearchResultCard from '@/components/search/search-result-card';
import SearchSkeleton from '@/components/search/search-skeleton';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { endpoints } from '@/constants/endpoints';
import { useRecommendedEvents, useSearchEvents } from '@/hooks/query/useEvent';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchHeader = () => (
  <View className="flex-row items-center mb-4 mt-2">
    <BackButton />
    <View className="flex-1 items-center mr-10">
      <ThemedText className="text-xl dark:text-white font-jost-semibold">Search</ThemedText>
    </View>
  </View>
);

const EmptyState = ({ hasQuery }: { hasQuery: boolean }) => (
  <View className="flex-1 items-center justify-center">
    <Ionicons name={hasQuery ? 'search-outline' : 'calendar-outline'} size={56} color="#d1d5db" />
    <ThemedText className="text-gray-400 mt-3 text-sm">
      {hasQuery ? 'No events found' : 'No recommended events available'}
    </ThemedText>
  </View>
);

const ErrorState = () => (
  <View className="flex-1 items-center justify-center">
    <Ionicons name="alert-circle-outline" size={56} color="#ef4444" />
    <ThemedText className="text-red-400 mt-3 text-sm">Error loading results</ThemedText>
  </View>
);

const Search = () => {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, error } = useSearchEvents(searchQuery);
  const { data: recommendedData, isLoading: isLoadingRecommended } = useRecommendedEvents();

  const hasQuery = searchQuery.length > 0;
  const events = hasQuery ? data?.data : recommendedData?.data;
  const loading = hasQuery ? isLoading : isLoadingRecommended;
  const isEmpty = !loading && events && events.length === 0;

  return (
    <ThemedView className='flex-1'>
      <SafeAreaView edges={['top']} className='flex-1'>
        <View className="px-5 flex-1">
          <SearchHeader />

          <SearchBar onFilterPress={() => setFilterVisible(true)} value={searchQuery} onChangeText={setSearchQuery} />

          {/* Section Label */}
          {!hasQuery && !isLoadingRecommended && (
            <ThemedText className="text-base font-semibold text-gray-800 dark:text-gray-300 mt-4 mb-3">Recommended for you</ThemedText>
          )}

          {hasQuery && !isLoading && data?.data && data.data.length > 0 && (
            <ThemedText className="text-sm text-gray-400 mt-2 mb-3">
              {data.data.length} result{data.data.length !== 1 ? 's' : ''} found
            </ThemedText>
          )}

          {/* Loading Skeleton */}
          {loading && <SearchSkeleton />}

          {/* Empty State */}
          {isEmpty && <EmptyState hasQuery={hasQuery} />}

          {/* Error */}
          {error && <ErrorState />}

          {/* Results */}
          {!loading && events && events.length > 0 && (
            <FlatList
              data={events}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <SearchResultCard event={item} imageUrl={endpoints.IMAGE_URL + item.images[0]} />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}
        </View>

        <FilterModal visible={isFilterVisible} onClose={() => setFilterVisible(false)} />
      </SafeAreaView>
    </ThemedView>
  );
};

export default Search;
