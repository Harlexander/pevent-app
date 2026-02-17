import React from 'react'
import { Pressable } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    interpolateColor,
} from 'react-native-reanimated'

interface CustomSwitchProps {
    value: boolean
    onValueChange: (value: boolean) => void
    disabled?: boolean
    activeColor?: string
    inactiveColor?: string
}

const TRACK_WIDTH = 40
const TRACK_HEIGHT = 22
const THUMB_SIZE = 18
const TRACK_PADDING = 2

const CustomSwitch = ({
    value,
    onValueChange,
    disabled = false,
    activeColor = '#3b82f6',
    inactiveColor = '#767577',
}: CustomSwitchProps) => {
    const progress = useSharedValue(value ? 1 : 0)

    React.useEffect(() => {
        progress.value = withTiming(value ? 1 : 0, { duration: 200 })
    }, [value, progress])

    const trackStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            progress.value,
            [0, 1],
            [inactiveColor, activeColor],
        ),
    }))

    const thumbStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: withTiming(
                    value ? TRACK_WIDTH - THUMB_SIZE - TRACK_PADDING : TRACK_PADDING,
                    { duration: 200 },
                ),
            },
        ],
    }))

    return (
        <Pressable
            onPress={() => !disabled && onValueChange(!value)}
            disabled={disabled}
            style={{ opacity: disabled ? 0.5 : 1 }}
        >
            <Animated.View
                style={[
                    {
                        width: TRACK_WIDTH,
                        height: TRACK_HEIGHT,
                        borderRadius: TRACK_HEIGHT / 2,
                        justifyContent: 'center',
                    },
                    trackStyle,
                ]}
            >
                <Animated.View
                    style={[
                        {
                            width: THUMB_SIZE,
                            height: THUMB_SIZE,
                            borderRadius: THUMB_SIZE / 2,
                            backgroundColor: '#fff',
                        },
                        thumbStyle,
                    ]}
                />
            </Animated.View>
        </Pressable>
    )
}

export default CustomSwitch
