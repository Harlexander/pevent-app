import Skeleton from '@/components/ui/skeleton';
import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - 40 - 12) / 2;

const BannerSkeleton = () => (
  <View className="px-5 mb-6">
    <Skeleton width={SCREEN_WIDTH - 40} height={96} borderRadius={12} />
  </View>
);

const CategorySkeleton = () => (
  <View className="px-5 flex-row gap-3 mb-4">
    {[80, 60, 70, 90, 65].map((w, i) => (
      <Skeleton key={i} width={w} height={32} borderRadius={16} />
    ))}
  </View>
);

const EventCardSkeleton = () => (
  <View className="mr-4">
    <Skeleton width={260} height={180} borderRadius={24} />
  </View>
);

const EventCardCompactSkeleton = () => (
  <View className="mr-4">
    <Skeleton width={CARD_WIDTH} height={130} borderRadius={16} />
    <View className="p-2.5 gap-2">
      <Skeleton width={CARD_WIDTH - 20} height={14} borderRadius={4} />
      <Skeleton width={CARD_WIDTH - 50} height={12} borderRadius={4} />
      <Skeleton width={60} height={12} borderRadius={4} />
    </View>
  </View>
);

const SectionSkeleton = ({ compact = false }: { compact?: boolean }) => (
  <View className="bg-white dark:bg-dark-bg p-5">
    <View className="flex-row justify-between items-center mb-4">
      <Skeleton width={140} height={18} borderRadius={4} />
      <Skeleton width={50} height={14} borderRadius={4} />
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {[1, 2, 3].map((i) =>
        compact ? <EventCardCompactSkeleton key={i} /> : <EventCardSkeleton key={i} />,
      )}
    </ScrollView>
  </View>
);

const HomeSkeleton = () => (
  <>
    {/* Header skeleton */}
    <View className="px-5 flex-row justify-between items-center mb-6">
      <View className="flex-row gap-3 items-center">
        <Skeleton width={45} height={45} borderRadius={25} />
        <View className="gap-2">
          <Skeleton width={120} height={16} borderRadius={4} />
          <Skeleton width={80} height={12} borderRadius={4} />
        </View>
      </View>
      <View className="flex-row gap-3">
        <Skeleton width={30} height={30} borderRadius={15} />
        <Skeleton width={30} height={30} borderRadius={15} />
      </View>
    </View>

    <BannerSkeleton />
    <CategorySkeleton />

    <View className="gap-2">
      <SectionSkeleton />
      <SectionSkeleton compact />
      <SectionSkeleton />
    </View>
  </>
);

export default HomeSkeleton;
