import { ThemedText } from '@/components/themed-text'
import { Image } from 'expo-image'
import React from 'react'
import { View } from 'react-native'

interface OrganizerInfoProps {
    name: string;
    role: string;
    image: string | null;
}

const OrganizerInfo = ({ name, role, image }: OrganizerInfoProps) => {
    return (
        <View className='flex-row items-center gap-3 mb-6'>
            <View className='w-12 h-12 rounded-full overflow-hidden bg-blue-100 items-center justify-center'>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                />
            </View>
            <View>
                <ThemedText className='text-black font-bold text-lg capitalize'>{name}</ThemedText>
                <ThemedText className='text-gray-400 text-sm capitalize'>{role}</ThemedText>
            </View>
        </View>
    )
}

export default OrganizerInfo
