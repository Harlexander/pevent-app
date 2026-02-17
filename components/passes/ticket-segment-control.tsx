import { ThemedText } from '@/components/themed-text'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

interface TicketSegmentControlProps {
    activeTab: 'Upcoming' | 'Past';
    onTabChange: (tab: 'Upcoming' | 'Past') => void;
}

const TicketSegmentControl = ({ activeTab, onTabChange }: TicketSegmentControlProps) => {
    const tabs = ['Upcoming', 'Past'] as const

    return (
        <View className='flex-row bg-white dark:bg-dark-bg p-1.5 rounded-xl mb-6'>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab}
                    onPress={() => onTabChange(tab)}
                    className={`flex-1 py-3 items-center rounded-lg ${activeTab === tab ? 'bg-blue-500' : 'bg-white dark:bg-dark-bg'}`}
                >
                    <ThemedText className={`font-medium ${activeTab === tab ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                        {tab}
                    </ThemedText>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default TicketSegmentControl
