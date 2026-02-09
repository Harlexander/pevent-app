import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'

const categories = ['All', 'Music', 'Apartment', 'Festival', 'Sports', 'Art']

const CategoryList = () => {
    const [activeCategory, setActiveCategory] = useState('All')

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 6, paddingRight: 20 }}
            className='mb-6'
        >
            {categories.map((category) => (
                <TouchableOpacity
                    key={category}
                    onPress={() => setActiveCategory(category)}
                    className={`px-6 py-2 rounded-xl ${activeCategory === category ? 'bg-blue-100' : 'bg-gray-100'}`}
                >
                    <ThemedText
                        className={`${activeCategory === category ? 'text-primary font-bold' : 'text-gray-700 font-medium'}`}
                    >
                        {category}
                    </ThemedText>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default CategoryList
