import BackButton from '@/components/back-button'
import Currency from '@/components/currency'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { endpoints } from '@/constants/endpoints'
import { useTicket } from '@/hooks/query/useTicket'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const TicketDetail = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { data, isLoading, error } = useTicket(id)

    const ticket = data?.data

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    }

    if (isLoading) {
        return (
            <ThemedView className='flex-1 bg-white'>
                <SafeAreaView className='flex-1'>
                    <View className='flex-row items-center justify-between px-5 py-2'>
                        <BackButton />
                        <ThemedText className='text-lg font-bold'>Detail Ticket</ThemedText>
                        <View className='w-6' />
                    </View>
                    <View className='flex-1 items-center justify-center'>
                        <ActivityIndicator size="large" color="#3b82f6" />
                        <ThemedText className='text-gray-500 mt-4'>Loading ticket...</ThemedText>
                    </View>
                </SafeAreaView>
            </ThemedView>
        )
    }

    if (error || !ticket) {
        return (
            <ThemedView className='flex-1 bg-white'>
                <SafeAreaView className='flex-1'>
                    <View className='flex-row items-center justify-between px-5 py-2'>
                        <BackButton />
                        <ThemedText className='text-lg font-bold'>Detail Ticket</ThemedText>
                        <View className='w-6' />
                    </View>
                    <View className='flex-1 items-center justify-center'>
                        <ThemedText className='text-red-500'>Error loading ticket</ThemedText>
                    </View>
                </SafeAreaView>
            </ThemedView>
        )
    }

    return (
        <ThemedView className='flex-1 bg-white'>
            <SafeAreaView className='flex-1'>
                {/* Header */}
                <View className='flex-row items-center justify-between px-5 py-2'>
                    <BackButton />
                    <ThemedText className='text-lg font-bold'>Detail Ticket</ThemedText>
                    <Ionicons name="information-circle-outline" size={24} color="black" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
                    {/* Image */}
                    <View className='w-full h-48 rounded-3xl overflow-hidden mb-6 bg-gray-100'>
                        <Image
                            source={{ uri: endpoints.IMAGE_URL + ticket.ticket.event.images[0] }}
                            style={{ width: '100%', height: '100%' }}
                            contentFit="cover"
                        />
                    </View>

                    {/* Title */}
                    <View className='mb-8'>
                        <ThemedText className='text-xl font-bold text-slate-900 mb-1 capitalize'>{ticket.ticket.event.name}</ThemedText>
                        <ThemedText className='text-gray-400'>Ticket ID: #{ticket.id.slice(0, 12)}</ThemedText>
                    </View>

                    {/* Details Grid */}
                    <View className='gap-6 mb-8'>
                        <View className='flex-row'>
                            <View className='flex-1 gap-1'>
                                <ThemedText className='text-gray-400 text-sm'>Ticket Type</ThemedText>
                                <ThemedText className='font-bold text-slate-800 text-base'>{ticket.ticket.name}</ThemedText>
                            </View>
                            <View className='flex-1 gap-1'>
                                <ThemedText className='text-gray-400 text-sm'>Date</ThemedText>
                                <ThemedText className='font-bold text-slate-800 text-base'>{formatDate(ticket.ticket.event.date)}</ThemedText>
                            </View>
                        </View>

                        <View className='flex-row'>
                            <View className='flex-1 gap-1'>
                                <ThemedText className='text-gray-400 text-sm'>First Name</ThemedText>
                                <ThemedText className='font-bold text-slate-800 text-base capitalize'>{ticket.firstName}</ThemedText>
                            </View>
                            <View className='flex-1 gap-1'>
                                <ThemedText className='text-gray-400 text-sm'>Last Name</ThemedText>
                                <ThemedText className='font-bold text-slate-800 text-base capitalize'>{ticket.lastName}</ThemedText>
                            </View>
                        </View>

                        <View>
                            <ThemedText className='text-gray-400 text-sm mb-1'>Email</ThemedText>
                            <ThemedText className='font-bold text-slate-800 text-base'>{ticket.email}</ThemedText>
                        </View>

                        {ticket.ticket.event.venue && (
                            <View>
                                <ThemedText className='text-gray-400 text-sm mb-1'>Venue</ThemedText>
                                <ThemedText className='font-bold text-slate-800 text-base capitalize'>{ticket.ticket.event.venue}</ThemedText>
                            </View>
                        )}

                        <View className='flex-row'>
                            <View className='flex-1 gap-1'>
                                <ThemedText className='text-gray-400 text-sm'>Location</ThemedText>
                                <ThemedText className='font-bold text-slate-800 text-base capitalize'>
                                    {ticket.ticket.event.city || 'TBA'}, {ticket.ticket.event.state || ''}
                                </ThemedText>
                            </View>
                            <View className='flex-1 gap-1'>
                                <ThemedText className='text-gray-400 text-sm'>Time</ThemedText>
                                <ThemedText className='font-bold text-slate-800 text-base'>{ticket.ticket.event.time || 'TBA'}</ThemedText>
                            </View>
                        </View>

                        {ticket.checkedIn && (
                            <View className='bg-green-50 p-4 rounded-xl'>
                                <View className='flex-row items-center gap-2'>
                                    <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                                    <ThemedText className='text-green-600 font-semibold'>Checked In</ThemedText>
                                </View>
                                <ThemedText className='text-gray-600 text-sm mt-1'>
                                    {formatDate(ticket.checkedIn.toString())}
                                </ThemedText>
                            </View>
                        )}
                    </View>

                    {/* Barcode Placeholder */}
                    <View className='h-24 bg-white border border-gray-200 rounded-xl mb-8 items-center justify-center overflow-hidden'>
                        <View className='flex-row gap-[2px] h-full items-center justify-center w-full px-4'>
                            {[...Array(60)].map((_, i) => (
                                <View key={i} className={`h-16 bg-black ${Math.random() > 0.5 ? 'w-[2px]' : 'w-[4px]'}`} />
                            ))}
                        </View>
                    </View>

                    {/* Cost Breakdown */}
                    <View className='gap-3 mb-6'>
                        <View className='flex-row justify-between'>
                            <ThemedText className='text-gray-400'>Ticket Price</ThemedText>
                            <Currency className='text-slate-800 font-medium'>{ticket.ticket.price.toFixed(2)}</Currency>
                        </View>

                        <View className='h-[1px] bg-gray-100 my-1' />

                        <View className='flex-row justify-between'>
                            <ThemedText className='text-gray-400 font-medium'>Total</ThemedText>
                            <Currency className='text-slate-900 font-bold'>{ticket.ticket.price.toFixed(2)}</Currency>
                        </View>
                    </View>

                    {/* Purchase Date */}
                    <View className='flex-row justify-between items-center mb-4'>
                        <ThemedText className='text-gray-400 font-medium'>Purchase Date</ThemedText>
                        <ThemedText className='font-bold text-slate-900'>{formatDate(ticket.createdAt.toString())}</ThemedText>
                    </View>
                </ScrollView>

                {/* Footer Button */}
                <View className='absolute bottom-0 w-full p-5 bg-white border-t border-gray-100 safe-bottom'>
                    <TouchableOpacity className='w-full bg-blue-500 py-4 rounded-2xl flex-row items-center justify-center gap-2 shadow-lg shadow-blue-500/30'>
                        <Ionicons name="download-outline" size={20} color="white" />
                        <ThemedText className='text-white font-bold text-base'>Download Ticket</ThemedText>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ThemedView>
    )
}

export default TicketDetail
