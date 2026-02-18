import { ThemedText } from '@/components/themed-text';
import { useCreateDVA, useDVA } from '@/hooks/query/useWallet';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native';

const DVABanner = () => {
  const { data: dva, isError } = useDVA();
  const { mutate: createDVA, isPending } = useCreateDVA();
  const [dismissed, setDismissed] = useState(false);

  // Hide if DVA exists, user dismissed, or query hasn't errored (still loading)
  if (dismissed || (dva?.data && !isError)) return null;
  if (!isError) return null;

  const handleSetup = () => {
    createDVA(undefined, {
      onSuccess: () => Alert.alert('Success', 'Your virtual account has been created!'),
      onError: (error) =>
        Alert.alert('Error', error instanceof Error ? error.message : 'Failed to create virtual account.'),
    });
  };

  return (
    <View className="mx-5 mb-4 rounded-2xl bg-blue-50 border dark:border-blue-800 border-blue-100 dark:bg-blue-900/20 p-5">
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center gap-3 flex-1">
          <View className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800/40 items-center justify-center">
            <Ionicons name="wallet-outline" size={20} color="#3b82f6" />
          </View>
          <View className="flex-1">
            <ThemedText className="text-sm font-bold text-blue-900 dark:text-blue-200">
              Set Up Virtual Account
            </ThemedText>
            <ThemedText className="text-xs text-blue-700/70 dark:text-blue-300/70 mt-0.5">
              Get a dedicated account number for easy wallet funding
            </ThemedText>
          </View>
        </View>
        <TouchableOpacity onPress={() => setDismissed(true)} hitSlop={8}>
          <Ionicons name="close" size={18} color="#93c5fd" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleSetup}
        disabled={isPending}
        className="mt-4 bg-primary py-3 rounded-xl items-center flex-row justify-center gap-2"
        activeOpacity={0.8}
      >
        {isPending ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Ionicons name="add-circle-outline" size={18} color="white" />
        )}
        <ThemedText className="text-white font-bold text-sm">
          {isPending ? 'Setting Up...' : 'Set Up Now'}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default DVABanner;
