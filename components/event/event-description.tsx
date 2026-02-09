import { ThemedText } from '@/components/themed-text'
import React from 'react'
import { View } from 'react-native'

interface EventDescriptionProps {
    description: string;
}

const EventDescription = ({ description }: EventDescriptionProps) => {
    return (
        <View className='mb-6'>
            <ThemedText className='text-black font-bold text-base mb-2'>About this event:</ThemedText>
            <ThemedText className='text-gray-500 text-base leading-6'>
                {description}
            </ThemedText>
            {/* <ThemedText className='text-blue-500 text-base font-medium mt-1'>Read more</ThemedText> */}
        </View>
    )
}

export default EventDescription
