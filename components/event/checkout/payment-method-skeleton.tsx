import Skeleton from '@/components/ui/skeleton';
import React from 'react';
import { View } from 'react-native';

export const SavedCardsSkeleton = () => (
  <View className="mb-6">
    <View className="flex-row items-center mb-4 gap-2">
      <Skeleton width={18} height={18} borderRadius={4} />
      <Skeleton width={100} height={14} borderRadius={4} />
    </View>
    {[1, 2].map((i) => (
      <View key={i} className="bg-gray-100 dark:bg-dark-card rounded-2xl p-4 mb-3">
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

export const PaymentMethodsSkeleton = () => (
  <View>
    <View className="flex-row items-center mb-4 gap-2">
      <Skeleton width={18} height={18} borderRadius={4} />
      <Skeleton width={130} height={14} borderRadius={4} />
    </View>
    {[1, 2, 3, 4].map((i) => (
      <View key={i} className="bg-white dark:bg-dark-bg rounded-2xl p-3 mb-3">
        <View className="flex-row items-center">
          <Skeleton width={48} height={48} borderRadius={12} />
          <View className="ml-4 flex-1 gap-2">
            <Skeleton width="50%" height={16} borderRadius={4} />
            <Skeleton width="35%" height={12} borderRadius={4} />
          </View>
          <Skeleton width={24} height={24} borderRadius={12} />
        </View>
      </View>
    ))}
  </View>
);
