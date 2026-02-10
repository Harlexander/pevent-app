import React from 'react'
import { Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'

const BackButton = () => {
    const router = useRouter()

    return (
        <Pressable onPress={() => router.back()}>
            <Entypo name="chevron-thin-left" size={18} color="black" />
        </Pressable>
    )
}

export default BackButton