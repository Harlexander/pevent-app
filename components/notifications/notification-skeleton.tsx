import Skeleton from '@/components/ui/skeleton';
import React from 'react';
import { View } from 'react-native';

const NotificationItemSkeleton = () => (
  <View className="flex-row gap-3 px-5 py-4">
    <Skeleton width={48} height={48} borderRadius={12} />
    <View className="flex-1 gap-2">
      <View className="flex-row items-center justify-between">
        <Skeleton width="60%" height={14} borderRadius={4} />
        <Skeleton width={40} height={12} borderRadius={4} />
      </View>
      <Skeleton width="90%" height={12} borderRadius={4} />
      <Skeleton width="50%" height={12} borderRadius={4} />
    </View>
  </View>
);

export const NotificationListSkeleton = () => (
  <View>
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <React.Fragment key={i}>
        <NotificationItemSkeleton />
        {i < 6 && <View className="h-px bg-gray-100 dark:bg-dark-card ml-[76]" />}
      </React.Fragment>
    ))}
  </View>
);
