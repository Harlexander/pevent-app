import { ThemedText } from '@/components/themed-text'
import { Link } from 'expo-router'
import React from 'react'
import { Pressable, View } from 'react-native'

interface SectionHeaderProps {
    title: string;
    onPressSeeAll?: () => void;
}

const SectionHeader = ({ title, onPressSeeAll }: SectionHeaderProps) => {
    return (
        <View className='flex-row justify-between items-center mb-4 mt-6'>
            <ThemedText className='text-lg font-bold text-black'>{title}</ThemedText>
            <Pressable onPress={onPressSeeAll}>
                <ThemedText className='text-gray-400 text-sm font-medium'>See all</ThemedText>
            </Pressable>
        </View>
    )
}

export default SectionHeader
