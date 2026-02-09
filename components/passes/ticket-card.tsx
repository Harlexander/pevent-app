import { ThemedText } from '@/components/themed-text'
import { TicketBought } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

interface TicketCardProps {
    ticket: TicketBought;
    imageUrl: string;
    onPress: () => void;
}

const TicketCard = ({ ticket, imageUrl, onPress }: TicketCardProps) => {
    return (
        <TouchableOpacity onPress={onPress} className='mb-6 bg-white'>
            {/* Image */}
            <View className='w-full h-40 rounded-3xl overflow-hidden mb-3 bg-gray-100'>
                <Image
                    source={{ uri: imageUrl }}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                />
            </View>

            {/* Content */}
            <View className='flex-row justify-between items-center'>
                <View className='gap-1'>
                    <ThemedText className='text-lg font-bold text-slate-900 capitalize'>{ticket.ticket.event.name}</ThemedText>
                    <ThemedText className='text-gray-400'>Ticket type: <ThemedText className='text-gray-500 font-medium'>{ticket.ticket.name}</ThemedText></ThemedText>
                </View>

                <TouchableOpacity
                    onPress={onPress}
                    className='w-10 h-10 bg-blue-50 rounded-full items-center justify-center'
                >
                    <Ionicons name="chevron-forward" size={20} color="#3b82f6" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default TicketCard
