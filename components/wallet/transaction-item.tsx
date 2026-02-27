import { ThemedText } from '@/components/themed-text';
import { WalletTransaction } from '@/types/Wallet';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

const transactionIcons: Record<WalletTransaction['type'], keyof typeof Ionicons.glyphMap> = {
  funding: 'wallet-outline',
  ticketPurchase: 'ticket-outline',
  votePurchase: 'heart-outline',
};

const transactionLabels: Record<WalletTransaction['type'], string> = {
  funding: 'Wallet Funding',
  ticketPurchase: 'Ticket Purchase',
  votePurchase: 'Vote Purchase',
};

const formatAmount = (amount: number) => new Intl.NumberFormat('en-NG').format(amount);

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const TransactionItem = ({ transaction }: { transaction: WalletTransaction }) => {
  const isFunding = transaction.type === 'funding';

  return (
    <View className="flex-row items-center justify-between py-3">
      <View className="flex-row items-center gap-3">
        <View
          className={`w-10 h-10 rounded-full items-center justify-center ${isFunding ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}
        >
          <Ionicons
            name={transactionIcons[transaction.type]}
            size={18}
            color={isFunding ? '#22c55e' : '#ef4444'}
          />
        </View>
        <View>
          <ThemedText className="text-slate-800 dark:text-gray-200 font-medium text-sm">
            {transaction.description || transactionLabels[transaction.type]}
          </ThemedText>
          <ThemedText className="text-gray-400 text-xs">{formatDate(transaction.createdAt)}</ThemedText>
        </View>
      </View>
      <ThemedText className={`font-semibold text-sm ${isFunding ? 'text-green-500' : 'text-red-500'}`}>
        {isFunding ? '+' : '-'}₦{formatAmount(transaction.amount)}
      </ThemedText>
    </View>
  );
};

export default TransactionItem;
