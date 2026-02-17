import EventCard from '@/components/home/event-card';
import EventCardCompact from '@/components/home/event-card-compact';
import SectionHeader from '@/components/home/section-header';
import { endpoints } from '@/constants/endpoints';
import { Event } from '@/types';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

interface EventSectionProps {
  title: string;
  events: Event[];
  onPressSeeAll?: () => void;
  variant?: 'default' | 'compact';
}

const EventSection = ({ title, events, onPressSeeAll, variant = 'default' }: EventSectionProps) => (
  <View className="bg-white dark:bg-dark-bg p-5">
    <SectionHeader title={title} onPressSeeAll={onPressSeeAll} />
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible">
      {events.map((event) => (
        <Link href={`/${event.slug}`} key={event.id} className="mr-4">
          {variant === 'compact' ? (
            <EventCardCompact
              image={endpoints.IMAGE_URL + event.images[0]}
              title={event.name}
              location={event.city || 'undisclosed'}
              date={event.date}
              time={event.time}
              price={event.tickets[0]?.price || 'Unlisted'}
            />
          ) : (
            <EventCard
              image={endpoints.IMAGE_URL + event.images[0]}
              title={event.name}
              location={event.city || 'undisclosed'}
              date={event.date}
              price={event.tickets[0]?.price || 'Unlisted'}
            />
          )}
        </Link>
      ))}
    </ScrollView>
  </View>
);

export default EventSection;
