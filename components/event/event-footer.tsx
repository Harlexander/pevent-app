import { ThemedText } from '@/components/themed-text'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Button from '../ui/button';

interface EventFooterProps {
    onBuyPress?: () => void;
}

const EventFooter = ({ onBuyPress }: EventFooterProps) => {
    return (
        <View className='absolute bottom-0 w-full bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-gray-700 p-5 pb-8 flex-row items-center justify-between shadow-lg gap-4'>
            <Button onPress={onBuyPress}>
                Buy Tickets
            </Button>
        </View>
    )
}

export default EventFooter
