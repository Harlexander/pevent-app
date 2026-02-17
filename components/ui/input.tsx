import { TextInput, type TextInputProps, View } from 'react-native'
import React from 'react'
import { ThemedText } from '../themed-text'

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    className?: string;
}

const Input = ({ label, error, className, editable = true, ...props }: InputProps) => {
    const isDisabled = editable === false

    return (
        <View className={`gap-2 ${className}`}>
            {label && <ThemedText className={`text-base font-medium text-black dark:text-white ${isDisabled ? 'opacity-50' : 'opacity-80'}`}>{label}</ThemedText>}
            <View className={`border rounded-xl justify-center ${error ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} ${isDisabled ? 'bg-gray-100 dark:bg-dark-card' : 'bg-white dark:bg-dark-bg'}`}>
                <TextInput
                    className={`p-4 ${isDisabled ? 'text-gray-500' : 'text-black dark:text-white'}`}
                    placeholderTextColor="#9CA3AF"
                    editable={editable}
                    {...props}
                />
            </View>
            {error && <ThemedText className='text-red-500 text-sm'>{error}</ThemedText>}
        </View>
    )
}

export default Input
