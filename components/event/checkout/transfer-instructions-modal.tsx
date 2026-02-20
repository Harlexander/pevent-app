import Currency from '@/components/currency';
import { ThemedText } from '@/components/themed-text';
import { usePaymentIntent } from '@/hooks/query/useWallet';
import { PaymentIntent } from '@/types/Wallet';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useToast } from '@/components/ui/toast';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, TouchableOpacity, View } from 'react-native';

interface TransferInstructionsModalProps {
  visible: boolean;
  intent: PaymentIntent | null;
  onClose: () => void;
  onSuccess: () => void;
}

const formatCountdown = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const TransferInstructionsModal = ({ visible, intent, onClose, onSuccess }: TransferInstructionsModalProps) => {
  const toast = useToast();
  const [countdown, setCountdown] = useState(0);
  const [intentStatus, setIntentStatus] = useState<string>(intent?.status || 'pending');
  const [hasSentMoney, setHasSentMoney] = useState(false);

  const { data: polledIntent } = usePaymentIntent(intent?.id || null, intentStatus, hasSentMoney);

  // Update status from polling
  useEffect(() => {
    if (polledIntent?.data?.status) {
      setIntentStatus(polledIntent.data.status);
    }
  }, [polledIntent?.data?.status]);

  // Handle fulfilled
  useEffect(() => {
    if (intentStatus === 'fulfilled') {
      onSuccess();
    }
  }, [intentStatus, onSuccess]);

  // Countdown timer
  useEffect(() => {
    if (!intent?.expiresAt) return;

    const updateCountdown = () => {
      const remaining = Math.max(0, Math.floor((new Date(intent.expiresAt).getTime() - Date.now()) / 1000));
      setCountdown(remaining);
      if (remaining <= 0) {
        setIntentStatus('expired');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [intent?.expiresAt]);

  // Reset status when intent changes
  useEffect(() => {
    if (intent) {
      setIntentStatus(intent.status);
      setHasSentMoney(false);
    }
  }, [intent]);

  if (!intent) return null;

  const isExpired = intentStatus === 'expired';
  const isPending = intentStatus === 'pending';

  const handleCopy = async (text: string, label: string) => {
    await Clipboard.setStringAsync(text);
    toast.info(`${label} copied to clipboard`, 2000);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black/60 justify-end">
        <View className="bg-white dark:bg-dark-bg rounded-t-3xl">
          {/* Header */}
          <View className="items-center pt-4 pb-2">
            <View className="w-10 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-4" />
            <View className="flex-row items-center gap-2">
              <ThemedText className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Bank Transfer
              </ThemedText>
            </View>
          </View>

          <View className="px-6 pb-8">
            {/* Status */}
            {isExpired ? (
              <View className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 mb-5 items-center">
                <Ionicons name="time-outline" size={24} color="#ef4444" />
                <ThemedText className="text-red-600 dark:text-red-400 font-bold mt-2">
                  Transfer Expired
                </ThemedText>
                <ThemedText className="text-red-500/70 text-sm text-center mt-1">
                  This payment session has expired. Please try again.
                </ThemedText>
              </View>
            ) : (
              <>
                {/* Countdown */}
                <View className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 mb-5 flex-row items-center justify-center gap-2">
                  <Ionicons name="timer-outline" size={18} color="#f59e0b" />
                  <ThemedText className="text-amber-700 dark:text-amber-300 font-bold">
                    Expires in {formatCountdown(countdown)}
                  </ThemedText>
                </View>

                {/* Amount */}
                <View className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-5 items-center">
                  <ThemedText className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                    Transfer Exactly
                  </ThemedText>
                  <Currency className="text-3xl font-bold text-blue-900 dark:text-blue-200">
                    {intent.amount.toLocaleString('en-US')}
                  </Currency>
                </View>

                {/* Account Details */}
                <View className="bg-gray-50 dark:bg-dark-card rounded-xl p-4 mb-5" style={{ gap: 16 }}>
                  {/* Account Number */}
                  <View className="flex-row items-center justify-between">
                    <View>
                      <ThemedText className="text-xs text-gray-400 mb-0.5">Account Number</ThemedText>
                      <ThemedText className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {intent.dva.accountNumber}
                      </ThemedText>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleCopy(intent.dva.accountNumber, 'Account number')}
                      className="bg-blue-100 dark:bg-blue-900/30 px-3 py-2 rounded-lg flex-row items-center gap-1"
                      hitSlop={8}
                    >
                      <Ionicons name="copy-outline" size={14} color="#3b82f6" />
                      <ThemedText className="text-xs text-blue-500 font-medium">Copy</ThemedText>
                    </TouchableOpacity>
                  </View>

                  {/* Bank Name */}
                  <View>
                    <ThemedText className="text-xs text-gray-400 mb-0.5">Bank Name</ThemedText>
                    <ThemedText className="text-base font-medium text-gray-900 dark:text-gray-100">
                      {intent.dva.bankName}
                    </ThemedText>
                  </View>

                  {/* Account Name */}
                  <View>
                    <ThemedText className="text-xs text-gray-400 mb-0.5">Account Name</ThemedText>
                    <ThemedText className="text-base font-medium text-gray-900 dark:text-gray-100">
                      {intent.dva.accountName}
                    </ThemedText>
                  </View>
                </View>

                {/* Confirmation waiting state */}
                {hasSentMoney && isPending && (
                  <View className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 mb-5 items-center">
                    <ActivityIndicator size="large" color="#3b82f6" />
                    <ThemedText className="text-base font-bold text-blue-900 dark:text-blue-200 mt-3">
                      Confirming Transfer
                    </ThemedText>
                    <ThemedText className="text-sm text-blue-700/70 dark:text-blue-300/70 text-center mt-1">
                      Kindly wait while we confirm your transfer. This may take a moment.
                    </ThemedText>
                  </View>
                )}
              </>
            )}

            {/* I have sent the money button */}
            {isPending && !hasSentMoney && !isExpired && (
              <TouchableOpacity
                onPress={() => setHasSentMoney(true)}
                className="w-full py-4 rounded-2xl bg-primary items-center mb-3"
                activeOpacity={0.8}
              >
                <ThemedText className="font-bold text-base text-white">I have sent the money</ThemedText>
              </TouchableOpacity>
            )}

            {/* Close/Cancel button */}
            <TouchableOpacity
              onPress={onClose}
              className="w-full py-4 rounded-2xl bg-gray-100 dark:bg-dark-card items-center"
              activeOpacity={0.8}
            >
              <ThemedText className="font-bold text-base text-gray-600 dark:text-gray-300">
                {isExpired ? 'Close' : 'Cancel'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TransferInstructionsModal;
