import Skeleton from '@/components/ui/skeleton';
import React from 'react';
import { Dimensions, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - 40 - 12) / 2;

const EventGridItemSkeleton = () => (
  <View style={{ width: CARD_WIDTH }} className="mb-3">
    <Skeleton width={CARD_WIDTH} height={130} borderRadius={16} />
    <View className="p-2.5 gap-2">
      <Skeleton width={CARD_WIDTH - 20} height={14} borderRadius={4} />
      <View className="flex-row gap-3">
        <Skeleton width={60} height={12} borderRadius={4} />
        <Skeleton width={50} height={12} borderRadius={4} />
      </View>
      <Skeleton width={60} height={14} borderRadius={4} />
    </View>
  </View>
);

const EventGridSkeleton = () => (
  <View className="flex-row flex-wrap justify-between px-5 pt-4">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <EventGridItemSkeleton key={i} />
    ))}
  </View>
);

export default EventGridSkeleton;
