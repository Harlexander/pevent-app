import Currency from '@/components/currency'
import { ThemedText } from '@/components/themed-text'
import { Feather, Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'

import { Ticket } from '@/types'

interface TicketSelectionStepProps {
    tickets: Ticket[];
    quantities: Record<string, number>;
    onUpdateQuantity: (id: string, delta: number) => void;
}

const TicketSelectionStep = ({ quantities, onUpdateQuantity, tickets }: TicketSelectionStepProps) => {
    const getMaxQuantity = (ticket: Ticket) => {
        const limits = [ticket.volume]
        if (ticket.maxPerUser) limits.push(ticket.maxPerUser)
        return Math.min(...limits)
    }

    const isAtMax = (ticket: Ticket) => {
        const current = quantities[ticket.id] || 0
        return current >= getMaxQuantity(ticket)
    }

    const isSoldOut = (ticket: Ticket) => ticket.volume === 0

    return (
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
            <View className='p-5 gap-4'>
                {tickets.filter(t => !t.unlisted).map((ticket) => {
                    const soldOut = isSoldOut(ticket)
                    const current = quantities[ticket.id] || 0

                    return (
                        <View
                            key={ticket.id}
                            className={`p-4 rounded-xl border ${current > 0 ? 'border-primary bg-blue-50/50' : 'border-gray-100 bg-white'} ${soldOut ? 'opacity-60' : ''}`}
                        >
                            <View className='flex-row justify-between items-start'>
                                <View className='flex-1 pr-4'>
                                    <View className='flex-row items-center gap-2 mb-1'>
                                        <ThemedText className='font-bold text-base'>{ticket.name}</ThemedText>
                                        {soldOut && (
                                            <View className='bg-red-100 px-2 py-0.5 rounded'>
                                                <ThemedText className='text-red-600 text-xs font-medium'>Sold Out</ThemedText>
                                            </View>
                                        )}
                                    </View>

                                    <View className='flex-row items-center gap-1 mb-2'>
                                        {ticket.originalPrice && ticket.originalPrice > ticket.price && (
                                            <ThemedText className='text-gray-400 text-sm line-through'>
                                                <Currency>{ticket.originalPrice}</Currency>
                                            </ThemedText>
                                        )}
                                        <Currency className='text-primary font-bold text-lg'>{ticket.price}</Currency>
                                        {ticket.price === 0 && (
                                            <View className='bg-green-100 px-2 py-0.5 rounded ml-1'>
                                                <ThemedText className='text-green-600 text-xs font-medium'>Free</ThemedText>
                                            </View>
                                        )}
                                    </View>

                                    {ticket.description && (
                                        <ThemedText className='text-gray-500 text-sm mb-2'>{ticket.description}</ThemedText>
                                    )}

                                    <View className='flex-row items-center gap-3'>
                                        {ticket.numPersons > 1 && (
                                            <View className='flex-row items-center gap-1'>
                                                <Feather name='users' size={12} color='#6b7280' />
                                                <ThemedText className='text-gray-500 text-xs'>{ticket.numPersons} persons</ThemedText>
                                            </View>
                                        )}
                                        {ticket.show_volume && ticket.volume > 0 && (
                                            <View className='flex-row items-center gap-1'>
                                                <Ionicons name='ticket-outline' size={12} color='#6b7280' />
                                                <ThemedText className='text-gray-500 text-xs'>{ticket.volume} left</ThemedText>
                                            </View>
                                        )}
                                        {ticket.maxPerUser && (
                                            <View className='flex-row items-center gap-1'>
                                                <Ionicons name='person-outline' size={12} color='#6b7280' />
                                                <ThemedText className='text-gray-500 text-xs'>Max {ticket.maxPerUser}</ThemedText>
                                            </View>
                                        )}
                                    </View>
                                </View>

                                {!soldOut && (
                                    <View className='flex-row items-center bg-gray-100 rounded-xl p-1'>
                                        <TouchableOpacity
                                            onPress={() => onUpdateQuantity(ticket.id, -1)}
                                            className={`w-9 h-9 items-center justify-center rounded-lg ${current > 0 ? 'bg-white' : 'bg-transparent'}`}
                                            disabled={current === 0}
                                        >
                                            <Ionicons name="remove" size={18} color={current > 0 ? "#000" : "#ccc"} />
                                        </TouchableOpacity>

                                        <View className='w-10 items-center'>
                                            <ThemedText className='font-bold text-base'>{current}</ThemedText>
                                        </View>

                                        <TouchableOpacity
                                            onPress={() => onUpdateQuantity(ticket.id, 1)}
                                            className={`w-9 h-9 items-center justify-center rounded-lg ${!isAtMax(ticket) ? 'bg-white' : 'bg-transparent'}`}
                                            disabled={isAtMax(ticket)}
                                        >
                                            <Ionicons name="add" size={18} color={!isAtMax(ticket) ? "#000" : "#ccc"} />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}

export default TicketSelectionStep
