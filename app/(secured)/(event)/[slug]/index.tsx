import EventDescription from '@/components/event/event-description'
import EventFooter from '@/components/event/event-footer'
import EventGallery from '@/components/event/event-gallery'
import EventHeader from '@/components/event/event-header'
import EventInfoCard from '@/components/event/event-info-card'
import LocationMap from '@/components/event/location-map'
import OrganizerInfo from '@/components/event/organizer-info'
import TabSection from '@/components/event/tab-section'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useEvent } from '@/hooks/query/useEvent'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { endpoints } from '@/constants/endpoints'
import { format } from 'date-fns'
const EventSlug = () => {
    const { slug } = useLocalSearchParams()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('Description')

    const { data: event, isLoading, error } = useEvent(slug as string)

    console.log(event);

    if (isLoading) {
        <View>
            <ThemedText>Loading</ThemedText>
        </View>
    }
    return (
        <ThemedView className='flex-1 h-screen bg-white'>
            {/* Main Content */}
            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                className='flex-1'
            >
                {/* Header */}
                <EventHeader images={event?.data?.images?.map((img: string) => endpoints.IMAGE_URL + img) || []} />

                <View className='px-5 mt-4'>
                    {/* Title */}
                    <ThemedText className='text-2xl capitalize font-bold text-black mb-6'>
                        {event?.data?.name}
                    </ThemedText>

                    {/* Info Card */}
                    <EventInfoCard
                        date={event?.data?.date ? format(new Date(event.data.date), "MMM d") : ""}
                        time={event?.data?.time || ''}
                        location={event?.data?.city || 'Undisclosed'}
                    />

                    {/* Tabs */}
                    <TabSection activeTab={activeTab} onTabChange={setActiveTab} />

                    {/* Organizer (Visible on Description tab) */}
                    {activeTab === 'Description' && <OrganizerInfo
                        name={event?.data?.user?.name || 'Organizer'}
                        role="Organizer"
                        image={event?.data?.user?.image ? (event.data.user.image.startsWith('http') ? event.data.user.image : endpoints.IMAGE_URL + event.data.user.image) : null}
                        organiserId={event?.data.userId}
                    />}

                    {/* Content Sections */}
                    {activeTab === 'Description' && (
                        <>
                            <EventDescription description={event?.data?.description || ''} />
                            <LocationMap location={event?.data?.venue || event?.data?.city || 'Undisclosed'} coordinates={event?.data?.coordinates} />
                        </>
                    )}

                    {activeTab === 'Gallery' && <EventGallery images={event?.data?.images?.map(img => endpoints.IMAGE_URL + img) || []} />}

                </View>
            </ScrollView>

            {/* Footer */}
            <EventFooter onBuyPress={() => router.push(`/(secured)/(event)/${slug}/checkout`)} />

        </ThemedView>
    )
}

export default EventSlug