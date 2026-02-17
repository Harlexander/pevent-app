import { useColorScheme } from '@/hooks/use-color-scheme'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'

interface SearchBarProps {
    onFilterPress?: () => void;
    value?: string;
    onChangeText?: (text: string) => void;
}

const SearchBar = ({ onFilterPress, value, onChangeText }: SearchBarProps) => {
    const { colorScheme } = useColorScheme()
    return (
        <View className='flex-row gap-3 mb-6'>
            <View className='flex-1 flex-row bg-white dark:bg-dark-bg items-center rounded-2xl px-4 h-12 gap-2'>
                <Ionicons name="search-outline" size={20} color={colorScheme === 'dark' ? '#9ca3af' : 'gray'} />
                <TextInput
                    placeholder="Search here"
                    className='flex-1 text-base text-black dark:text-white'
                    placeholderTextColor="gray"
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>
            <TouchableOpacity onPress={onFilterPress} className='w-12 h-12 bg-white dark:bg-dark-bg rounded-2xl items-center justify-center'>
                <Ionicons name="options-outline" size={24} color={colorScheme === 'dark' ? '#e5e7eb' : 'black'} />
            </TouchableOpacity>
        </View>
    )
}

export default SearchBar
