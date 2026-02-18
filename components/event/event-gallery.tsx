import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Dimensions, Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

interface EventGalleryProps {
  images: string[];
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const EventGallery = ({ images = [] }: EventGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  if (!images || images.length === 0) return null;

  // Split images into two columns for masonry effect
  const col1 = images.filter((_, i) => i % 2 === 0);
  const col2 = images.filter((_, i) => i % 2 !== 0);

  return (
    <View className="mb-6">
      <View className="flex-row flex-wrap justify-between">
        {/* Column 1 */}
        <View className="w-[48%] gap-3">
          {col1.map((img, index) => (
            <Pressable
              key={`col1-${index}`}
              onPress={() => setSelectedImage(img)}
              className={`w-full ${index % 2 === 0 ? 'h-40' : 'h-56'} rounded-xl overflow-hidden`}
            >
              <Image source={{ uri: img }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
            </Pressable>
          ))}
        </View>

        {/* Column 2 */}
        <View className="w-[48%] gap-3">
          {col2.map((img, index) => (
            <Pressable
              key={`col2-${index}`}
              onPress={() => setSelectedImage(img)}
              className={`w-full ${index % 2 === 0 ? 'h-64' : 'h-32'} rounded-xl overflow-hidden`}
            >
              <Image source={{ uri: img }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
            </Pressable>
          ))}
        </View>
      </View>

      {/* Fullscreen Image Modal */}
      <Modal visible={!!selectedImage} transparent animationType="fade" statusBarTranslucent>
        <View className="flex-1 bg-black justify-center items-center">
          <Pressable
            onPress={() => setSelectedImage(null)}
            style={{ position: 'absolute', top: insets.top + 12, right: 16, zIndex: 10 }}
          >
            <Ionicons name="close-circle" size={36} color="white" />
          </Pressable>

          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.75 }}
              contentFit="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default EventGallery;
