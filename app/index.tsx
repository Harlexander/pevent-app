import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import Button from '@/components/ui/button'
import UIModal from '@/components/UIModal'
import { onboardingSteps } from '@/constants/onboarding'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Dimensions, View, ViewToken } from 'react-native'
import Animated, {
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width } = Dimensions.get('window')

const Index = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const router = useRouter()
    const flatListRef = useRef<Animated.FlatList<any>>(null)
    const scrollX = useSharedValue(0)

    const onScroll = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x
    })

    const navigateTo = (path: string) => {
        setIsModalVisible(false)
        router.push(path as any)
    }

    const onViewableItemsChanged = useRef(
        ({ viewableItems }: { viewableItems: ViewToken[] }) => {
            if (viewableItems.length > 0 && viewableItems[0].index !== null) {
                setCurrentIndex(viewableItems[0].index)
            }
        }
    ).current

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current

    const handleNext = () => {
        if (currentIndex < onboardingSteps.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 })
        } else {
            setIsModalVisible(true)
        }
    }

    const PaginationDot = ({ index }: { index: number }) => {
        const animatedDotStyle = useAnimatedStyle(() => {
            const widthAnimation = interpolate(
                scrollX.value,
                [(index - 1) * width, index * width, (index + 1) * width],
                [8, 24, 8],
                Extrapolation.CLAMP
            )

            const opacityAnimation = interpolate(
                scrollX.value,
                [(index - 1) * width, index * width, (index + 1) * width],
                [0.5, 1, 0.5],
                Extrapolation.CLAMP
            )

            return {
                width: withSpring(widthAnimation),
                opacity: opacityAnimation,
            }
        })

        return (
            <Animated.View
                className="h-2 rounded-full bg-white mx-1"
                style={animatedDotStyle}
            />
        )
    }

    const RenderItem = ({ item }: { item: typeof onboardingSteps[0] }) => {
        return (
            <View style={{ width }} className="flex-1 justify-end pb-10 gap-4">
                <View className="p-5">
                    <Image
                        source={item.image}
                        style={{ width: "100%", height: 400 }}
                        contentFit='contain'
                    />
                </View>
                <View className="gap-2 px-5">
                    <ThemedText className="text-4xl font-semibold text-white">
                        {item.title}
                    </ThemedText>
                    <ThemedText className="text-lg leading-7 opacity-80 text-white">
                        {item.subtext}
                    </ThemedText>
                </View>
            </View>
        )
    }

    return (
        <ThemedView className="flex-1">
            <SafeAreaView className="flex-1 bg-[#002C73] gap-4">
                <View className="px-5 justify-start">
                    <Image
                        source={require("@/assets/logo-full-white.png")}
                        style={{ height: 40, width: 100 }}
                        contentFit='contain'
                    />
                </View>
                <Animated.FlatList
                    ref={flatListRef}
                    data={onboardingSteps}
                    renderItem={({ item }) => <RenderItem item={item} />}
                    keyExtractor={(item) => item.step.toString()}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    className="flex-1"
                />

                <View className="px-5 pb-5 gap-10">
                    {/* Pagination */}
                    <View className="flex-row justify-start">
                        {onboardingSteps.map((_, index) => (
                            <PaginationDot key={index} index={index} />
                        ))}
                    </View>

                    {/* Button */}
                    <Button onPress={handleNext}>
                        {currentIndex === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
                    </Button>
                </View>
            </SafeAreaView>
            <UIModal isVisible={isModalVisible} close={() => setIsModalVisible(false)}>
                <ThemedView className='rounded-t-3xl p-5 pb-10 gap-6 items-center'>
                    <View className='w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mb-2' />
                    <Image
                        source={require('@/assets/logo.png')}
                        style={{ width: 60, height: 60 }}
                        contentFit="contain"
                    />
                    <ThemedView className='items-center gap-2 mb-4'>
                        <ThemedText className='text-3xl font-bold text-black dark:text-gray-100'>Get Started</ThemedText>
                        <ThemedText className='text-center text-base opacity-70 px-4 text-black dark:text-gray-100'>
                            Your business network is a reflection of your career. Grow it today!
                        </ThemedText>
                    </ThemedView>
                    <ThemedView className='w-full gap-3'>
                        <Button onPress={() => navigateTo('/(onboarding)/register')} className='rounded-full'>
                            Sign up
                        </Button>
                        <Button onPress={() => navigateTo('/(onboarding)/login')} className='bg-gray-100 dark:bg-dark-card rounded-full'>
                            <ThemedText className='text-black dark:text-gray-100'>Log in</ThemedText>
                        </Button>
                    </ThemedView>
                </ThemedView>
            </UIModal>
        </ThemedView>
    )
}

export default Index