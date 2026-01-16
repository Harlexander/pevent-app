import { Text, TextInput, type TextInputProps, View } from 'react-native'
import React from 'react'
import { ThemedText } from '../themed-text'

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    className?: string;
}

const Input = ({ label, error, className, ...props }: InputProps) => {
    return (
        <View className={`gap-2 ${className}`}>
            {label && <ThemedText className='text-base font-medium opacity-80'>{label}</ThemedText>}
            <View className={`bg-gray-300 rounded-xl px-4 h-14 justify-center ${error ? 'border-red-500' : ''}`}>
                <TextInput
                    className='text-base text-black'
                    placeholderTextColor="#9CA3AF"
                    {...props}
                />
            </View>
            {error && <ThemedText className='text-red-500 text-sm'>{error}</ThemedText>}
        </View>
    )
}

export default Input
