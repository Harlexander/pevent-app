import { ThemedText } from '@/components/themed-text';
import { Card } from '@/types/Card';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const CardItem = ({ card, onDelete }: { card: Card; onDelete: (id: string) => void }) => {
  const isVisa = card.cardType?.toLowerCase() === 'visa';

  return (
    <View className="flex-row items-center justify-between bg-white dark:bg-dark-bg border border-gray-100 dark:border-gray-700 p-4 rounded-xl">
      <View className="flex-row items-center gap-4">
        <View
          className={`w-12 h-8 rounded items-center justify-center ${isVisa ? 'bg-blue-600' : 'bg-red-500'}`}
        >
          {isVisa ? (
            <ThemedText className="text-white text-[10px] font-bold">VISA</ThemedText>
          ) : (
            <View className="flex-row -space-x-2">
              <View className="w-3 h-3 rounded-full bg-red-500" />
              <View className="w-3 h-3 rounded-full bg-yellow-400" />
            </View>
          )}
        </View>
        <View>
          <ThemedText className="text-slate-900 dark:text-gray-100 font-bold">**** **** **** {card.last4}</ThemedText>
          <ThemedText className="text-gray-400 text-xs">
            {card.bank} - Expires {card.expMonth}/{card.expYear}
          </ThemedText>
        </View>
      </View>
      <TouchableOpacity onPress={() => onDelete(card.id)} hitSlop={8}>
        <Ionicons name="trash-outline" size={18} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );
};

export default CardItem;
