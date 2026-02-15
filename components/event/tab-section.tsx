import { ThemedText } from '@/components/themed-text'
import React from 'react'
import { Pressable, View } from 'react-native'

interface TabSectionProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const TabSection = ({ activeTab, onTabChange }: TabSectionProps) => {
    const tabs = ['Description', 'Gallery']

    return (
        <View className='flex-row border-b border-gray-100'>
            {tabs.map((tab) => (
                <Pressable
                    key={tab}
                    onPress={() => onTabChange(tab)}
                    className={`flex-1 items-center pb-3 ${activeTab === tab ? 'border-b-2 border-primary' : ''}`}
                >
                    <ThemedText className={`${activeTab === tab ? 'text-blue-500 font-bold' : 'text-gray-400 font-medium'}`}>
                        {tab}
                    </ThemedText>
                </Pressable>
            ))}
        </View>
    )
}

export default TabSection
