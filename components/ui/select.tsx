import { ThemedText } from '@/components/themed-text'
import UIModal from '@/components/UIModal'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Ionicons } from '@expo/vector-icons'
import React, { useState, useMemo } from 'react'
import {
    View,
    TouchableOpacity,
    TextInput,
    FlatList,
    Pressable,
} from 'react-native'

export interface SelectOption {
    label: string
    value: string
}

interface SelectProps {
    label?: string
    placeholder?: string
    value?: string
    options: SelectOption[]
    onValueChange: (value: string) => void
    error?: string
    icon?: React.ComponentProps<typeof Ionicons>['name']
    iconColor?: string
    disabled?: boolean
    searchPlaceholder?: string
    className?: string
}

const Select = ({
    label,
    placeholder = 'Select an option',
    value,
    options,
    onValueChange,
    error,
    icon,
    iconColor = '#6B7280',
    disabled = false,
    searchPlaceholder = 'Search...',
    className,
}: SelectProps) => {
    const { colorScheme } = useColorScheme()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    // Find the selected option label
    const selectedOption = options.find((opt) => opt.value === value)

    // Filter options based on search query
    const filteredOptions = useMemo(() => {
        if (!searchQuery.trim()) return options
        return options.filter((option) =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [options, searchQuery])

    const handleSelect = (optionValue: string) => {
        onValueChange(optionValue)
        setIsModalVisible(false)
        setSearchQuery('')
    }

    const openModal = () => {
        if (!disabled) {
            setIsModalVisible(true)
        }
    }

    const closeModal = () => {
        setIsModalVisible(false)
        setSearchQuery('')
    }

    return (
        <>
            <View className={`gap-2 ${className}`}>
                {label && (
                    <ThemedText
                        className={`text-base font-medium text-black dark:text-white ${disabled ? 'opacity-50' : 'opacity-80'}`}
                    >
                        {label}
                    </ThemedText>
                )}

                <TouchableOpacity
                    onPress={openModal}
                    disabled={disabled}
                    className={`border rounded-xl px-4 h-14 flex-row items-center justify-between ${error ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                        } ${disabled ? 'bg-gray-100 dark:bg-dark-card' : 'bg-white dark:bg-dark-bg'}`}
                >
                    <View className="flex-row items-center gap-3 flex-1">
                        {icon && (
                            <Ionicons
                                name={icon}
                                size={20}
                                color={disabled ? '#9CA3AF' : iconColor}
                            />
                        )}
                        <ThemedText
                            className={`text-base flex-1 ${selectedOption
                                    ? disabled
                                        ? 'text-gray-500'
                                        : 'text-black dark:text-white'
                                    : 'text-gray-400'
                                }`}
                            numberOfLines={1}
                        >
                            {selectedOption ? selectedOption.label : placeholder}
                        </ThemedText>
                    </View>
                    <Ionicons
                        name="chevron-down"
                        size={20}
                        color={disabled ? '#9CA3AF' : colorScheme === 'dark' ? '#9ca3af' : '#6B7280'}
                    />
                </TouchableOpacity>

                {error && (
                    <ThemedText className="text-red-500 text-sm">{error}</ThemedText>
                )}
            </View>

            <UIModal isVisible={isModalVisible} close={closeModal}>
                <View className="bg-white dark:bg-dark-bg rounded-t-3xl max-h-[80%]">
                    {/* Header */}
                    <View className="px-5 pt-4 pb-3 border-b border-gray-100 dark:border-gray-700">
                        <View className="flex-row items-center justify-between mb-3">
                            <ThemedText className="text-lg font-bold text-black dark:text-white">
                                {label || 'Select an option'}
                            </ThemedText>
                            <TouchableOpacity
                                onPress={closeModal}
                                className="w-8 h-8 items-center justify-center"
                            >
                                <Ionicons name="close" size={24} color={colorScheme === 'dark' ? '#9ca3af' : '#6B7280'} />
                            </TouchableOpacity>
                        </View>

                        {/* Search Input */}
                        <View className="flex-row items-center bg-gray-100 dark:bg-dark-card rounded-xl px-4 h-12">
                            <Ionicons
                                name="search"
                                size={20}
                                color="#9CA3AF"
                                style={{ marginRight: 8 }}
                            />
                            <TextInput
                                placeholder={searchPlaceholder}
                                placeholderTextColor="#9CA3AF"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                className="flex-1 text-base text-black dark:text-white"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity onPress={() => setSearchQuery('')}>
                                    <Ionicons name="close-circle" size={20} color="#9CA3AF" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Options List */}
                    <FlatList
                        data={filteredOptions}
                        keyExtractor={(item) => item.value}
                        renderItem={({ item }) => {
                            const isSelected = item.value === value
                            return (
                                <Pressable
                                    onPress={() => handleSelect(item.value)}
                                    className={`px-5 py-4 flex-row items-center justify-between border-b border-gray-50 dark:border-gray-700 ${isSelected ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-white dark:bg-dark-bg'
                                        }`}
                                >
                                    <ThemedText
                                        className={`text-base flex-1 ${isSelected
                                                ? 'text-blue-600 font-semibold'
                                                : 'text-black dark:text-white'
                                            }`}
                                        numberOfLines={1}
                                    >
                                        {item.label}
                                    </ThemedText>
                                    {isSelected && (
                                        <Ionicons
                                            name="checkmark-circle"
                                            size={24}
                                            color="#3B82F6"
                                        />
                                    )}
                                </Pressable>
                            )
                        }}
                        ListEmptyComponent={
                            <View className="py-12 items-center">
                                <Ionicons
                                    name="search-outline"
                                    size={48}
                                    color="#D1D5DB"
                                />
                                <ThemedText className="text-gray-400 mt-3">
                                    No results found
                                </ThemedText>
                            </View>
                        }
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                </View>
            </UIModal>
        </>
    )
}

export default Select
