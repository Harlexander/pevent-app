import Skeleton from '@/components/ui/skeleton';
import React from 'react';
import { View } from 'react-native';

export const OrganiserHeaderSkeleton = () => (
  <View className="px-5 py-4 flex-row items-center bg-white">
    <Skeleton width={24} height={24} borderRadius={4} className="mr-3" />
    <Skeleton width={160} height={22} borderRadius={4} />
  </View>
);

export const ProfileCardSkeleton = () => (
  <View className="mx-5 mt-5 bg-white rounded-3xl overflow-hidden shadow-sm">
    {/* Gradient background */}
    <Skeleton width="100%" height={128} borderRadius={0} />

    <View className="px-6 pb-6">
      {/* Avatar */}
      <View className="-mt-16 mb-4 items-center">
        <View className="w-32 h-32 rounded-full bg-white p-2">
          <Skeleton width="100%" height="100%" borderRadius={999} />
        </View>
      </View>

      {/* Name */}
      <View className="items-center mb-2">
        <Skeleton width={180} height={26} borderRadius={6} />
      </View>

      {/* Bio */}
      <View className="items-center gap-1.5 mb-6">
        <Skeleton width="80%" height={14} borderRadius={4} />
        <Skeleton width="60%" height={14} borderRadius={4} />
      </View>

      {/* Stats */}
      <View className="rounded-2xl p-4 mb-6 bg-gray-50">
        <View className="flex-row justify-around">
          <View className="items-center gap-2">
            <Skeleton width={40} height={32} borderRadius={6} />
            <Skeleton width={50} height={14} borderRadius={4} />
          </View>
          <View className="w-px bg-gray-200" />
          <View className="items-center gap-2">
            <Skeleton width={40} height={32} borderRadius={6} />
            <Skeleton width={70} height={14} borderRadius={4} />
          </View>
        </View>
      </View>

      {/* Social links */}
      <View>
        <Skeleton width={120} height={14} borderRadius={4} className="mb-3" />
        <View className="flex-row justify-around">
          {[1, 2, 3, 4].map((i) => (
            <View key={i} className="items-center gap-2">
              <Skeleton width={48} height={48} borderRadius={24} />
              <Skeleton width={50} height={12} borderRadius={4} />
            </View>
          ))}
        </View>
      </View>
    </View>
  </View>
);

export const EventsListSkeleton = () => (
  <View className="px-5 mt-6">
    <View className="flex-row items-center justify-between mb-4">
      <Skeleton width={160} height={22} borderRadius={4} />
      <Skeleton width={60} height={24} borderRadius={12} />
    </View>

    <View className="flex-row flex-wrap justify-between">
      {[1, 2, 3, 4].map((i) => (
        <View key={i} className="w-[48%] mb-4 bg-white rounded-2xl overflow-hidden">
          <Skeleton width="100%" height={144} borderRadius={0} />
          <View className="p-3 gap-2">
            <Skeleton width={60} height={20} borderRadius={10} />
            <Skeleton width="90%" height={14} borderRadius={4} />
            <View className="flex-row items-center gap-2">
              <Skeleton width={24} height={24} borderRadius={12} />
              <Skeleton width={80} height={12} borderRadius={4} />
            </View>
            <Skeleton width="100%" height={34} borderRadius={8} />
          </View>
        </View>
      ))}
    </View>
  </View>
);
