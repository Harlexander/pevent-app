import { ThemedText } from '@/components/themed-text';
import UIModal from '@/components/UIModal';
import React from 'react';
import { KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View } from 'react-native';

const formatAmount = (amount: number) => new Intl.NumberFormat('en-NG').format(amount);

const FundWalletModal = ({
  isVisible,
  fundAmount,
  onChangeAmount,
  onClose,
  onSubmit,
  onModalHide,
}: {
  isVisible: boolean;
  fundAmount: string;
  onChangeAmount: (val: string) => void;
  onClose: () => void;
  onSubmit: () => void;
  onModalHide: () => void;
}) => {
  const isDisabled = !fundAmount || parseFloat(fundAmount) <= 0;

  return (
    <UIModal isVisible={isVisible} close={onClose} onModalHide={onModalHide}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View className="bg-white dark:bg-dark-bg rounded-t-3xl p-6 pb-10">
          <View className="w-10 h-1 bg-gray-200 dark:bg-gray-700 rounded-full self-center mb-6" />

          <ThemedText className="text-xl font-bold text-center text-blue-900 dark:text-blue-200 mb-2">Fund Wallet</ThemedText>
          <ThemedText className="text-center text-gray-400 mb-6">
            Enter the amount you want to add to your wallet
          </ThemedText>

          <View className="flex-row items-center bg-gray-50 dark:bg-dark-card rounded-xl px-4 py-3 mb-4">
            <ThemedText className="text-2xl font-bold text-gray-400 mr-2">₦</ThemedText>
            <TextInput
              className="flex-1 text-2xl font-bold text-slate-900 dark:text-gray-100"
              placeholder="0.00"
              placeholderTextColor="#d1d5db"
              keyboardType="numeric"
              value={fundAmount}
              onChangeText={onChangeAmount}
              autoFocus
            />
          </View>

          <View className="flex-row gap-2 mb-6">
            {[1000, 2000, 5000, 10000].map((preset) => (
              <TouchableOpacity
                key={preset}
                onPress={() => onChangeAmount(String(preset))}
                className="flex-1 py-2.5 rounded-lg bg-gray-100 dark:bg-dark-card items-center"
              >
                <ThemedText className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  ₦{formatAmount(preset)}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            onPress={onSubmit}
            disabled={isDisabled}
            className={`w-full py-4 rounded-xl items-center ${isDisabled ? 'bg-gray-300 dark:bg-gray-600' : 'bg-blue-500'}`}
          >
            <ThemedText className="text-white font-bold text-base">Continue to Payment</ThemedText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </UIModal>
  );
};

export default FundWalletModal;
