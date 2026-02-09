
import TicketCard from '@/components/passes/ticket-card'
import TicketSegmentControl from '@/components/passes/ticket-segment-control'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { endpoints } from '@/constants/endpoints'
import { useAppTickets } from '@/hooks/query/useTicket'
import { TicketBought } from '@/types'
import { useRouter } from 'expo-router'
import React, { useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Passes = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<'All' | 'Upcoming' | 'Past'>('All')

    const { data, isLoading, error } = useAppTickets()

    // Filter tickets based on event date
    const filteredTickets = useMemo(() => {
        if (!data?.data) return []

        const now = new Date()
        const tickets = data.data

        if (activeTab === 'All') {
            return tickets
        } else if (activeTab === 'Upcoming') {
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
        <ThemedView className='flex-1 bg-white'>
            <SafeAreaView edges={['top']} className='flex-1 px-5'>
                {/* Header */}
                <ThemedText className='text-xl font-bold mt-2 mb-6'>My Ticket</ThemedText>

                {/* Tabs */}
                <TicketSegmentControl activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Loading State */}
                {isLoading && (
                    <View className='flex-1 items-center justify-center'>
                        <ActivityIndicator size="large" color="#3b82f6" />
                        <ThemedText className='text-gray-500 mt-4'>Loading tickets...</ThemedText>
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
                    <View className='flex-1 items-center justify-center'>
                        <ThemedText className='text-gray-500'>
                            {activeTab === 'All' ? 'No tickets found' :
                                activeTab === 'Upcoming' ? 'No upcoming tickets' :
                                    'No past tickets'}
                        </ThemedText>
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