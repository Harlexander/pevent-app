import { ThemedText } from '@/components/themed-text'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

interface TicketSegmentControlProps {
    activeTab: 'All' | 'Upcoming' | 'Past';
    onTabChange: (tab: 'All' | 'Upcoming' | 'Past') => void;
}

const TicketSegmentControl = ({ activeTab, onTabChange }: TicketSegmentControlProps) => {
    const tabs = ['All', 'Upcoming', 'Past'] as const

    return (
        <View className='flex-row bg-gray-100 p-1.5 rounded-xl mb-6'>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab}
                    onPress={() => onTabChange(tab)}
                    className={`flex-1 py-3 items-center rounded-lg ${activeTab === tab ? 'bg-blue-500' : 'bg-gray-100'}`}
                >
                    <ThemedText className={`font-medium ${activeTab === tab ? 'text-white' : 'text-gray-500'}`}>
                        {tab}
                    </ThemedText>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default TicketSegmentControl
