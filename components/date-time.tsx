import React from 'react'
import { View } from 'react-native'
import { ThemedText } from './themed-text'

const DateTime = ({ day, month }: { day: string | number; month: string }) => {
  return (
    <View className="absolute top-3 left-3 bg-white/95 rounded-xl px-3 py-2 items-center min-w-[50px]">
        <ThemedText className="text-lg font-extrabold text-primary leading-5">
            {day}
        </ThemedText>
        <ThemedText className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
            {month}
        </ThemedText>
    </View>
  )
}

export default DateTime