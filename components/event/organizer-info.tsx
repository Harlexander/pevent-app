import { ThemedText } from '@/components/themed-text'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, View } from 'react-native'

interface OrganizerInfoProps {
    name: string;
    role: string;
    image: string | null;
    organiserId?: string;
}

const OrganizerInfo = ({ name, role, image, organiserId }: OrganizerInfoProps) => {
    const router = useRouter()

    const handlePress = () => {
        if (organiserId) {
            router.push(`/(secured)/organiser/${organiserId}`)
        }
    }

    return (
        <Pressable
            className='flex-row items-center gap-3 active:opacity-70'
            onPress={handlePress}
            disabled={!organiserId}
        >
            <View className='w-16 h-16 rounded-full overflow-hidden bg-blue-500 items-center justify-center'>
                {image ? (
                    <Image
                        source={{ uri: image }}
                        style={{ width: '100%', height: '100%' }}
                        contentFit="cover"
                    />
                ) : (
                    <FontAwesome5 name="user" size={18} color="white" />
                )}
            </View>
            <View className='flex-1'>
                <ThemedText className='text-black dark:text-gray-100 font-bold text-lg capitalize'>{name}</ThemedText>
                <ThemedText className='text-gray-400 text-sm capitalize'>{role}</ThemedText>
            </View>
            {organiserId && (
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            )}
        </Pressable>
    )
}

export default OrganizerInfo
