
import TicketCard from '@/components/passes/ticket-card'
import TicketSegmentControl from '@/components/passes/ticket-segment-control'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { endpoints } from '@/constants/endpoints'
import { useAppTickets } from '@/hooks/query/useTicket'
import { TicketBought } from '@/types'
import { useRouter } from 'expo-router'
import React, { useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TicketEmptyState from '@/assets/icons/ticket-EmptyState.svg'

const Passes = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past'>('Upcoming')

    const { data, isLoading, error } = useAppTickets()

    // Filter tickets based on event date
    const filteredTickets = useMemo(() => {
        if (!data?.data) return []

        const now = new Date()
        const tickets = data.data

        if (activeTab === 'Upcoming') {
            return tickets.filter((ticket: TicketBought) => {
                const eventDate = new Date(ticket.ticket.event.date)
                return eventDate >= now
            })
        } else { // Past
            return tickets.filter((ticket: TicketBought) => {
                const eventDate = new Date(ticket.ticket.event.date)
                return eventDate < now
            })
        }
    }, [data?.data, activeTab])

    return (
        <ThemedView className='flex-1'>
            <SafeAreaView edges={['top']} className='flex-1 px-5'>
                {/* Header */}
                <ThemedText className='text-xl text-black dark:text-white font-jost-semibold mt-2 mb-6'>My Ticket</ThemedText>

                {/* Tabs */}
                <TicketSegmentControl activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Loading State */}
                {isLoading && (
                    <View className='flex-1 items-center justify-center'>
                        <ActivityIndicator size="large" color="#3b82f6" />
                        <ThemedText className='text-gray-500 dark:text-gray-400 mt-4'>Loading tickets...</ThemedText>
                    </View>
                )}

                {/* Error State */}
                {error && (
                    <View className='flex-1 items-center justify-center'>
                        <ThemedText className='text-red-500'>Error loading tickets</ThemedText>
                    </View>
                )}

                {/* Empty State */}
                {!isLoading && !error && filteredTickets.length === 0 && (
                    <View className='flex-1 items-center pt-20'>
                        <TicketEmptyState width={235} height={188} />
                        <ThemedText className='text-xl font-jost-semibold mt-4 text-black dark:text-white'>
                            {activeTab === 'Upcoming' ? 'No upcoming tickets' : 'No past tickets'}
                        </ThemedText>
                        <ThemedText className='text-gray-500 dark:text-gray-400 text-center mt-1'>
                            {activeTab === 'Upcoming'
                                ? "You don't have any upcoming events yet."
                                : "You haven't attended any events yet."}
                        </ThemedText>
                        <Pressable
                            onPress={() => router.push('/home')}
                            className='bg-primary mt-6 px-8 py-3 rounded-lg'
                        >
                            <ThemedText className='text-white font-semibold'>Browse Events</ThemedText>
                        </Pressable>
                    </View>
                )}

                {/* List */}
                {!isLoading && !error && filteredTickets.length > 0 && (
                    <FlatList
                        data={filteredTickets}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TicketCard
                                ticket={item}
                                imageUrl={endpoints.IMAGE_URL + item.ticket.event.images[0]}
                                onPress={() => router.push(`/ticket/${item.id}`)}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                )}
            </SafeAreaView>
        </ThemedView>
    )
}

export default Passes