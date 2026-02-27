import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import { TicketBought } from '@/types'
import { EvilIcons, Feather, FontAwesome5 } from '@expo/vector-icons'
import { format } from 'date-fns'
import { Image } from 'expo-image'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

interface TicketCardProps {
    ticket: TicketBought
    imageUrl: string
    onPress: () => void
}

const getLastEightDigits = (id: string) => {
    return id.slice(-6).toUpperCase()
}

const TicketCard = ({ ticket, imageUrl, onPress }: TicketCardProps) => {
    const event = ticket.ticket.event
    const isCheckedIn = ticket.checkedIn !== null
    const ticketNumber = getLastEightDigits(ticket.id)
    const formattedDate = format(event.date, 'dd MMM yyyy ');

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className="mb-3"
        >
            <View className="bg-white dark:bg-dark-bg rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                {/* Main Content */}
                <View className="p-4">
                    {/* Top Row: Logo, Event Info, and Badge */}
                    <View className="flex-row items-start justify-between mb-4">
                        {/* Left: Logo and Event Info */}
                        <View className="flex-row items-center flex-1 mr-3">
                            {/* Event Logo */}
                            <View className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-card mr-3">
                                <Image
                                    source={{ uri: imageUrl }}
                                    contentFit="cover"
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </View>

                            {/* Event Name and Organizer */}
                            <View className="flex-1">
                                <ThemedText
                                    numberOfLines={1}
                                    className="text-base font-semibold text-gray-900 dark:text-gray-100 capitalize mb-0.5"
                                >
                                    {event.name}
                                </ThemedText>
                                <ThemedText
                                    numberOfLines={1}
                                    className="text-xs text-gray-500 capitalize dark:text-gray-400"
                                >
                                    {event.venue}
                                </ThemedText>
                            </View>
                        </View>

                        {/* Right: Status Badge */}
                        <View
                            className={`rounded-full px-4 py-1.5 ${isCheckedIn ? 'bg-green-500' : 'bg-gray-500'
                                }`}
                        >
                            <ThemedText className={`text-xs font-semibold ${isCheckedIn ? 'text-white' : 'text-white'
                                }`}>
                                {isCheckedIn ? 'Checked In' : 'Not Checked In'}
                            </ThemedText>
                        </View>
                    </View>

                    {/* Bottom Row: Amount, No, Date */}
                    <View className="flex-row items-end justify-between">
                        {/* Amount */}
                        <View className="flex-1">
                            <ThemedText className="text-[10px] text-gray-400 mb-1">
                                Admits
                            </ThemedText>
                            <ThemedText className="text-base font-semibold text-gray-900 dark:text-gray-100 flex-row items-center gap-2">
                                <Feather name={'users'} size={16} color={Colors.primary} /> {ticket.ticket.numPersons}
                            </ThemedText>
                        </View>

                        {/* Ticket Number */}
                        <View className="flex-1">
                            <ThemedText className="text-[10px] text-gray-400 mb-1">
                                ID
                            </ThemedText>
                            <ThemedText className="text-base font-semibold text-gray-900 dark:text-gray-100">
                                #{ticketNumber}
                            </ThemedText>
                        </View>

                        {/* Date */}
                        <View className="flex-1">
                            <ThemedText className="text-[10px] text-gray-400 mb-1">
                                Date
                            </ThemedText>
                            <ThemedText className="text-base font-semibold text-gray-900 dark:text-gray-100">
                                {formattedDate}
                            </ThemedText>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default TicketCard
