import BannerCarousel from '@/components/home/banner-carousel';
import CategoryList from '@/components/home/category-list';
import DVABanner from '@/components/home/dva-banner';
import EventSection from '@/components/home/event-section';
import HomeHeader from '@/components/home/home-header';
import HomeSkeleton from '@/components/home/home-skeleton';
import LocationModal from '@/components/home/location-modal';
import { ThemedView } from '@/components/themed-view';
import { useAppEvents } from '@/hooks/query/useEvent';
import { useUserStore } from '@/store/user-store';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const { data, isLoading } = useAppEvents();
  const user = useUserStore((s) => s.user);
  const [locationModalVisible, setLocationModalVisible] = useState(true);
  const showLocationModal = locationModalVisible && !!user && !user.state && !user.country && user.email;

  return (
    <ThemedView className="flex-1 h-screen">
      {showLocationModal && <LocationModal visible onClose={() => setLocationModalVisible(false)} />}

      <ScrollView contentContainerStyle={{ paddingBottom: 100, gap: 6 }} showsVerticalScrollIndicator={false}>
        <SafeAreaView className="bg-white dark:bg-dark-bg" edges={['top']}>
          {isLoading ? (
            <HomeSkeleton />
          ) : (
            <>
              <HomeHeader />
              <BannerCarousel
                images={[
                  'https://www.pevent.ng/explore.png',
                  require('@/assets/images/home/banner.png'),
                  require('@/assets/images/home/banner.png'),
                ]}
              />
              <CategoryList activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
              <DVABanner />
            </>
          )}
        </SafeAreaView>

        {!isLoading && data?.data && (
          <View className="gap-2">
            <EventSection
              title="Featured Events"
              events={data.data.featured}
              onPressSeeAll={() => router.push('/events/featured')}
            />
            <EventSection
              title="Trending Events"
              events={data.data.trending}
              variant="compact"
              onPressSeeAll={() => router.push('/events/trending')}
            />
            <EventSection
              title="Latest Events"
              events={data.data.latest}
              onPressSeeAll={() => router.push('/events/latest')}
            />
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
};

export default Home;
