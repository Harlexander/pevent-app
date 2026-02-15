import EventDescription from '@/components/event/event-description';
import EventFooter from '@/components/event/event-footer';
import EventGallery from '@/components/event/event-gallery';
import EventHeader from '@/components/event/event-header';
import EventInfoCard from '@/components/event/event-info-card';
import {
  DescriptionSkeleton,
  EventHeaderSkeleton,
  EventInfoCardSkeleton,
  EventTitleSkeleton,
  FooterSkeleton,
  OrganizerSkeleton,
  TabSectionSkeleton,
} from '@/components/event/event-skeleton';
import LocationMap from '@/components/event/location-map';
import OrganizerInfo from '@/components/event/organizer-info';
import TabSection from '@/components/event/tab-section';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { endpoints } from '@/constants/endpoints';
import { useEvent } from '@/hooks/query/useEvent';
import { format } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

const EventSlug = () => {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Description');

  const { data: event, isLoading } = useEvent(slug as string);

  return (
    <ThemedView className="flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header */}
        {isLoading ? (
          <EventHeaderSkeleton />
        ) : (
          <EventHeader images={event?.data?.images?.map((img: string) => endpoints.IMAGE_URL + img) || []} />
        )}

        <View className="px-5 py-5 bg-white flex-1 gap-5">
          {/* Title */}
          {isLoading ? (
            <EventTitleSkeleton />
          ) : (
            <ThemedText className="text-2xl capitalize font-bold text-black">{event?.data?.name}</ThemedText>
          )}

          {/* Info Card */}
          {isLoading ? (
            <EventInfoCardSkeleton />
          ) : (
            <EventInfoCard
              date={event?.data?.date ? format(new Date(event.data.date), 'MMM d') : ''}
              time={event?.data?.time || ''}
              location={event?.data?.city || 'Undisclosed'}
            />
          )}

          <View className="gap-6">
            {/* Tabs */}
            {isLoading ? (
              <TabSectionSkeleton />
            ) : (
              <TabSection activeTab={activeTab} onTabChange={setActiveTab} />
            )}

            {/* Organizer */}
            {activeTab === 'Description' &&
              (isLoading ? (
                <OrganizerSkeleton />
              ) : (
                <OrganizerInfo
                  name={event?.data?.user?.name || 'Organizer'}
                  role="Organizer"
                  image={
                    event?.data?.user?.image
                      ? event.data.user.image.startsWith('http')
                        ? event.data.user.image
                        : endpoints.IMAGE_URL + event.data.user.image
                      : null
                  }
                  organiserId={event?.data.userId}
                />
              ))}

            {/* Content Sections */}
            {activeTab === 'Description' &&
              (isLoading ? (
                <DescriptionSkeleton />
              ) : (
                <>
                  <EventDescription description={event?.data?.description || ''} />
                  <LocationMap
                    location={event?.data?.venue || event?.data?.city || 'Undisclosed'}
                    coordinates={event?.data?.coordinates}
                  />
                </>
              ))}

            {activeTab === 'Gallery' && !isLoading && (
              <EventGallery images={event?.data?.images?.map((img: string) => endpoints.IMAGE_URL + img) || []} />
            )}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      {isLoading ? <FooterSkeleton /> : <EventFooter onBuyPress={() => router.push(`/(secured)/(event)/${slug}/checkout`)} />}
    </ThemedView>
  );
};

export default EventSlug;
