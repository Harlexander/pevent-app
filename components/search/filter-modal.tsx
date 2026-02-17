import { ThemedText } from '@/components/themed-text'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React, { useState } from 'react'
import { Pressable, TextInput, TouchableOpacity, View } from 'react-native'
import UIModal from '../UIModal'

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
}

const FilterModal = ({ visible, onClose }: FilterModalProps) => {
    const { colorScheme } = useColorScheme()
    const categories = ['All', 'Music', 'Apartment', 'Festival', 'Sports', 'Art']
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [location, setLocation] = useState('Benin')

    return (
        <UIModal isVisible={visible} close={onClose}>
            <View className='bg-white dark:bg-dark-bg rounded-t-3xl h-[85%]'>
                {/* Header */}
                <View className='flex-row justify-between items-center p-5'>
                    <ThemedText className='text-2xl font-bold text-slate-800 dark:text-gray-300'>Filter</ThemedText>
                    <TouchableOpacity onPress={() => {
                        setSelectedCategory('All')
                        setLocation('')
                    }} className='bg-blue-500 rounded-full px-6 py-2'>
                        <ThemedText className='text-white font-medium'>Reset</ThemedText>
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <View className='px-5 flex-1'>
                    {/* Event Type */}
                    <View className='mb-8'>
                        <ThemedText className='text-xl font-bold text-slate-800 dark:text-gray-300 mb-4'>Event Type</ThemedText>
                        <View className='flex-row flex-wrap gap-2'>
                            {categories.map((cat) => (
                                <Pressable
                                    key={cat}
                                    onPress={() => setSelectedCategory(cat)}
                                    className={`px-5 py-2.5 rounded-xl border ${selectedCategory === cat ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 dark:bg-dark-card border-gray-100 dark:border-gray-700'}`}
                                >
                                    <ThemedText className={`font-medium ${selectedCategory === cat ? 'text-blue-600' : 'text-gray-500 dark:text-gray-400'}`}>
                                        {cat}
                                    </ThemedText>
                                </Pressable>
                            ))}
                        </View>
                    </View>

                    {/* Location */}
                    <View className='mb-6'>
                        <ThemedText className='text-xl font-bold text-slate-800 dark:text-gray-300 mb-4'>Location</ThemedText>
                        <View className='flex-row items-center bg-gray-50 dark:bg-dark-card rounded-2xl px-4 h-14 border border-gray-100 dark:border-gray-700'>
                            <Ionicons name="location" size={20} color="#3b82f6" />
                            <TextInput
                                value={location}
                                onChangeText={setLocation}
                                className='flex-1 mx-3 text-base text-slate-800 dark:text-gray-300 font-medium'
                                placeholder="Search location"
                            />
                            <Ionicons name="search" size={20} color={colorScheme === 'dark' ? '#9ca3af' : 'gray'} />
                        </View>
                    </View>

                    {/* Price Range */}
                    <View className='mb-6'>
                        <ThemedText className='text-xl font-bold text-slate-800 dark:text-gray-300 mb-4'>Price Range</ThemedText>
                        <View className='flex-row gap-4'>
                            <View className='flex-1'>
                                <ThemedText className='text-gray-500 dark:text-gray-400 mb-2 font-medium'>Min Price</ThemedText>
                                <View className='bg-gray-50 dark:bg-dark-card rounded-2xl h-14 justify-center px-4 border border-gray-100 dark:border-gray-700'>
                                    <TextInput
                                        placeholder="0"
                                        keyboardType="numeric"
                                        className='text-base text-slate-800 dark:text-gray-300 font-bold'
                                    />
                                </View>
                            </View>
                            <View className='flex-1'>
                                <ThemedText className='text-gray-500 dark:text-gray-400 mb-2 font-medium'>Max Price</ThemedText>
                                <View className='bg-gray-50 dark:bg-dark-card rounded-2xl h-14 justify-center px-4 border border-gray-100 dark:border-gray-700'>
                                    <TextInput
                                        placeholder="10000"
                                        keyboardType="numeric"
                                        className='text-base text-slate-800 dark:text-gray-300 font-bold'
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Footer */}
                <View className='p-5 border-t border-gray-100 dark:border-gray-700 safe-bottom'>
                    <TouchableOpacity
                        onPress={onClose}
                        className='bg-blue-500 w-full py-4 rounded-xl items-center justify-center shadow-lg shadow-blue-500/30'
                    >
                        <ThemedText className='text-white font-bold text-lg'>Apply Filter</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        </UIModal>
    )
}

export default FilterModal
