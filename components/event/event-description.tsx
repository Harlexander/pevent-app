import { ThemedText } from '@/components/themed-text'
import React, { useCallback, useState } from 'react'
import { Pressable, View, type NativeSyntheticEvent, type TextLayoutEventData } from 'react-native'

interface EventDescriptionProps {
    description: string;
}

const MAX_LINES = 4

const EventDescription = ({ description }: EventDescriptionProps) => {
    const [expanded, setExpanded] = useState(false)
    const [showToggle, setShowToggle] = useState(false)
    const [measured, setMeasured] = useState(false)

    const onTextLayout = useCallback((e: NativeSyntheticEvent<TextLayoutEventData>) => {
        if (!measured) {
            setMeasured(true)
            if (e.nativeEvent.lines.length > MAX_LINES) {
                setShowToggle(true)
            }
        }
    }, [measured])

    return (
        <View className='mb-6'>
            <ThemedText className='text-black dark:text-gray-100 font-jost-semibold text-base mb-2'>About this event:</ThemedText>

            {/* Hidden text to measure full line count */}
            {!measured && (
                <ThemedText
                    className='text-gray-500 dark:text-gray-400 text-base leading-6'
                    style={{ position: 'absolute', opacity: 0 }}
                    onTextLayout={onTextLayout}
                >
                    {description}
                </ThemedText>
            )}

            <ThemedText
                className='text-gray-500 dark:text-gray-400 text-base leading-6'
                numberOfLines={expanded ? undefined : MAX_LINES}
            >
                {description}
            </ThemedText>
            {showToggle && (
                <Pressable onPress={() => setExpanded(!expanded)}>
                    <ThemedText className='text-blue-500 text-base font-medium mt-1'>
                        {expanded ? 'Show less' : 'Read more'}
                    </ThemedText>
                </Pressable>
            )}
        </View>
    )
}

export default EventDescription
