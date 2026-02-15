import Skeleton from '@/components/ui/skeleton';
import React from 'react';
import { View } from 'react-native';

const SearchResultSkeleton = () => (
  <View className="mb-3 flex-row bg-white rounded-2xl border border-gray-100 overflow-hidden">
    <Skeleton width={112} height={112} borderRadius={0} />
    <View className="flex-1 px-3 py-2.5 justify-between">
      <Skeleton width="90%" height={16} borderRadius={4} />
      <View className="flex-row gap-3">
        <Skeleton width={60} height={12} borderRadius={4} />
        <Skeleton width={80} height={12} borderRadius={4} />
      </View>
      <Skeleton width={70} height={12} borderRadius={4} />
    </View>
  </View>
);

const SearchSkeleton = () => (
  <View className="mt-4">
    <Skeleton width={160} height={16} borderRadius={4} className="mb-3" />
    {[1, 2, 3, 4, 5].map((i) => (
      <SearchResultSkeleton key={i} />
    ))}
  </View>
);

export default SearchSkeleton;
