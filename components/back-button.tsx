import { useColorScheme } from '@/hooks/use-color-scheme'
import React from 'react'
import { Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'

const BackButton = () => {
    const { colorScheme } = useColorScheme()
    const router = useRouter()

    return (
        <Pressable onPress={() => router.back()}>
            <Entypo name="chevron-thin-left" size={18} color={colorScheme === 'dark' ? '#e5e7eb' : 'black'} />
        </Pressable>
    )
}

export default BackButton