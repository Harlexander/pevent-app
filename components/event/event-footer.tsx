import { ThemedText } from '@/components/themed-text'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

interface EventFooterProps {
    onBuyPress?: () => void;
}

const EventFooter = ({ onBuyPress }: EventFooterProps) => {
    return (
        <View className='absolute bottom-0 w-full bg-white border-t border-gray-100 p-5 pb-8 flex-row items-center justify-between shadow-lg gap-4'>
            <TouchableOpacity onPress={onBuyPress} className='bg-primary px-8 py-3 rounded-xl flex-1  h-12 items-center justify-center'>
                <ThemedText className='text-white font-bold text-base'>Buy Tickets</ThemedText>
            </TouchableOpacity>
        </View>
    )
}

export default EventFooter
