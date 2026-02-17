import Skeleton from '@/components/ui/skeleton';
import React from 'react';
import { Dimensions, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const EventHeaderSkeleton = () => (
  <View className="w-full h-[300px] relative">
    <Skeleton width="100%" height={300} borderRadius={0} />
    {/* Back & heart buttons */}
    <View className="absolute top-12 left-5 right-5 flex-row justify-between">
      <Skeleton width={40} height={40} borderRadius={20} />
      <Skeleton width={40} height={40} borderRadius={20} />
    </View>
    {/* Thumbnails */}
    <View className="absolute bottom-5 left-5 flex-row gap-2">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} width={64} height={64} borderRadius={12} />
      ))}
    </View>
  </View>
);

export const EventTitleSkeleton = () => (
  <View className="gap-2">
    <Skeleton width="80%" height={28} borderRadius={6} />
    <Skeleton width="50%" height={20} borderRadius={4} />
  </View>
);

export const EventInfoCardSkeleton = () => (
  <View className="bg-white dark:bg-dark-bg rounded-2xl p-4 flex-row justify-between mb-6 border border-gray-100 dark:border-gray-700">
    {[1, 2, 3].map((i) => (
      <View key={i} className="items-center flex-1 gap-2">
        <Skeleton width={40} height={12} borderRadius={4} />
        <Skeleton width={60} height={16} borderRadius={4} />
      </View>
    ))}
  </View>
);

export const TabSectionSkeleton = () => (
  <View className="flex-row gap-4">
    <Skeleton width={100} height={36} borderRadius={18} />
    <Skeleton width={80} height={36} borderRadius={18} />
  </View>
);

export const OrganizerSkeleton = () => (
  <View className="flex-row items-center gap-3">
    <Skeleton width={64} height={64} borderRadius={32} />
    <View className="flex-1 gap-2">
      <Skeleton width={120} height={18} borderRadius={4} />
      <Skeleton width={70} height={14} borderRadius={4} />
    </View>
  </View>
);

export const DescriptionSkeleton = () => (
  <View className="gap-2">
    <Skeleton width="100%" height={14} borderRadius={4} />
    <Skeleton width="100%" height={14} borderRadius={4} />
    <Skeleton width="90%" height={14} borderRadius={4} />
    <Skeleton width="75%" height={14} borderRadius={4} />
    <Skeleton width="60%" height={14} borderRadius={4} />
  </View>
);

export const FooterSkeleton = () => (
  <View className="absolute bottom-0 w-full bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-gray-700 p-5 pb-8">
    <Skeleton width="100%" height={48} borderRadius={12} />
  </View>
);
