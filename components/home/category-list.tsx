import { ThemedText } from '@/components/themed-text'
import { useRouter } from 'expo-router'
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'

const categories = ['All', 'Music', 'Apartment', 'Festival', 'Sports', 'Art']

interface CategoryListProps {
  activeCategory: string
  onSelectCategory: (category: string) => void
}

const CategoryList = ({ activeCategory, onSelectCategory }: CategoryListProps) => {
  const router = useRouter()

  const handlePress = (category: string) => {
    onSelectCategory(category)
    if (category !== 'All') {
      router.push(`/events/category/${category}`)
    }
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 6, paddingRight: 20 }}
      className="mb-6 px-5"
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => handlePress(category)}
          className={`px-6 py-2 rounded-xl ${activeCategory === category ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-dark-card'}`}
        >
          <ThemedText
            className={`${activeCategory === category ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-300 font-medium'}`}
          >
            {category}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default CategoryList
