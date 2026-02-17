import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import React from 'react'

const PlaceholderPage = () => {
    return (
        <ThemedView className='flex-1 justify-center items-center'>
            <ThemedText className="text-black dark:text-white">Page Content Coming Soon</ThemedText>
        </ThemedView>
    )
}

export default PlaceholderPage
