import Skeleton from '@/components/ui/skeleton';
import React from 'react';
import { View } from 'react-native';

export const BalanceCardSkeleton = () => (
  <View className="bg-gray-200 rounded-2xl p-6 mb-4">
    <Skeleton width={60} height={14} borderRadius={4} className="mb-2" />
    <Skeleton width={160} height={34} borderRadius={6} />
    <View className="self-end mt-4">
      <Skeleton width={40} height={40} borderRadius={20} />
    </View>
  </View>
);

export const TabsSkeleton = () => (
  <View className="flex-row bg-gray-100 p-1.5 rounded-xl mb-6">
    <Skeleton width="50%" height={44} borderRadius={8} />
    <Skeleton width="50%" height={44} borderRadius={8} className="ml-1" />
  </View>
);

export const TransactionListSkeleton = () => (
  <View className="gap-3">
    {[1, 2, 3, 4, 5].map((i) => (
      <View key={i} className="flex-row items-center gap-3 py-3">
        <Skeleton width={44} height={44} borderRadius={12} />
        <View className="flex-1 gap-2">
          <Skeleton width="60%" height={14} borderRadius={4} />
          <Skeleton width="40%" height={12} borderRadius={4} />
        </View>
        <Skeleton width={70} height={16} borderRadius={4} />
      </View>
    ))}
  </View>
);

export const CardListSkeleton = () => (
  <View className="gap-3">
    {[1, 2].map((i) => (
      <View key={i} className="bg-gray-100 rounded-2xl p-4">
        <View className="flex-row items-center">
          <Skeleton width={48} height={36} borderRadius={8} />
          <View className="ml-4 flex-1 gap-2">
            <Skeleton width="70%" height={16} borderRadius={4} />
            <Skeleton width="50%" height={12} borderRadius={4} />
          </View>
          <Skeleton width={24} height={24} borderRadius={12} />
        </View>
      </View>
    ))}
  </View>
);
