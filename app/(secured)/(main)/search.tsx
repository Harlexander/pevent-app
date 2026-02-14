import BackButton from '@/components/back-button';
import SearchBar from '@/components/home/search-bar';
import FilterModal from '@/components/search/filter-modal';
import SearchResultCard from '@/components/search/search-result-card';
import { ThemedText } from '@/components/themed-text';
import { endpoints } from '@/constants/endpoints';
import { useRecommendedEvents, useSearchEvents } from '@/hooks/query/useEvent';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, error } = useSearchEvents(searchQuery);
  const { data: recommendedData, isLoading: isLoadingRecommended } = useRecommendedEvents();

  const events = searchQuery.length > 0 ? data?.data : recommendedData?.data;
  const loading = searchQuery.length > 0 ? isLoading : isLoadingRecommended;
  const isEmpty = !loading && events && events.length === 0;

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
      <View className="px-5 flex-1">
        {/* Header */}
        <View className="flex-row items-center mb-4 mt-2">
          <BackButton />
          <View className="flex-1 items-center mr-10">
            <ThemedText className="text-lg font-bold">Search</ThemedText>
          </View>
        </View>

        {/* Search Input */}
        <SearchBar
          onFilterPress={() => setFilterVisible(true)}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Section Label */}
        {searchQuery.length === 0 && !isLoadingRecommended && (
          <ThemedText className="text-base font-semibold text-gray-800 mt-4 mb-3">
            Recommended for you
          </ThemedText>
        )}

        {searchQuery.length > 0 && !isLoading && data?.data && data.data.length > 0 && (
          <ThemedText className="text-sm text-gray-400 mt-2 mb-3">
            {data.data.length} result{data.data.length !== 1 ? 's' : ''} found
          </ThemedText>
        )}

        {/* Loading */}
        {loading && (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#3b82f6" />
            {searchQuery.length > 0 && (
              <ThemedText className="text-gray-400 mt-3 text-sm">Searching...</ThemedText>
            )}
          </View>
        )}

        {/* Empty State */}
        {isEmpty && (
          <View className="flex-1 items-center justify-center">
            <Ionicons
              name={searchQuery.length > 0 ? 'search-outline' : 'calendar-outline'}
              size={56}
              color="#d1d5db"
            />
            <ThemedText className="text-gray-400 mt-3 text-sm">
              {searchQuery.length > 0 ? 'No events found' : 'No recommended events available'}
            </ThemedText>
          </View>
        )}

        {/* Error */}
        {error && (
          <View className="flex-1 items-center justify-center">
            <Ionicons name="alert-circle-outline" size={56} color="#ef4444" />
            <ThemedText className="text-red-400 mt-3 text-sm">Error loading results</ThemedText>
          </View>
        )}

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
  );
};

export default Search;
