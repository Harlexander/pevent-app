import { Image, ImageSource } from 'expo-image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, View, ViewToken } from 'react-native'

const AUTO_SCROLL_INTERVAL = 4000
const { width: SCREEN_WIDTH } = Dimensions.get('window')

interface BannerCarouselProps {
  images: ImageSource[]
  height?: number
}

const BannerCarousel = ({ images, height = 96 }: BannerCarouselProps) => {
  const flatListRef = useRef<FlatList>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  const itemWidth = SCREEN_WIDTH - 40 // px-5 on both sides

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index != null) {
      setActiveIndex(viewableItems[0].index)
    }
  }).current

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const scrollToIndex = useCallback(
    (index: number) => {
      flatListRef.current?.scrollToIndex({ index, animated: true })
    },
    [],
  )

  useEffect(() => {
    if (images.length <= 1) return

    autoScrollTimer.current = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % images.length
        scrollToIndex(nextIndex)
        return nextIndex
      })
    }, AUTO_SCROLL_INTERVAL)

    return () => {
      if (autoScrollTimer.current) clearInterval(autoScrollTimer.current)
    }
  }, [images.length, scrollToIndex])

  if (images.length === 0) return null

  return (
    <View className="mb-6 px-5">
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: itemWidth,
          offset: itemWidth * index,
          index,
        })}
        snapToInterval={itemWidth}
        decelerationRate="fast"
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ width: itemWidth, height }} className="rounded-xl overflow-hidden mr-2">
            <Image source={item} style={{ width: '100%', height: '100%' }} contentFit="cover" />
          </View>
        )}
      />

      {images.length > 1 && (
        <View className="flex-row justify-center gap-1.5 mt-2">
          {images.map((_, i) => (
            <View
              key={i}
              className={`h-1.5 rounded-full ${i === activeIndex ? 'bg-primary w-4' : 'bg-gray-300 w-1.5'}`}
            />
          ))}
        </View>
      )}
    </View>
  )
}

export default BannerCarousel
