import BackButton from '@/components/back-button';
import Currency from '@/components/currency';
import { ThemedText } from '@/components/themed-text';
import CardItem from '@/components/wallet/card-item';
import FundWalletModal from '@/components/wallet/fund-wallet-modal';
import { AddCardCheckout, FundWalletCheckout } from '@/components/wallet/paystack-checkout';
import TransactionItem from '@/components/wallet/transaction-item';
import { useCards, useDeleteCard } from '@/hooks/query/useCard';
import { useWallet, useWalletTransactions } from '@/hooks/query/useWallet';
import {
  BalanceCardSkeleton,
  CardListSkeleton,
  TabsSkeleton,
  TransactionListSkeleton,
} from '@/components/wallet/wallet-skeleton';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const formatAmount = (amount: number) => new Intl.NumberFormat('en-NG').format(amount);

const Wallet = () => {
  const { data: wallet, isLoading: walletLoading, refetch: refetchWallet } = useWallet();
  const { data: transactions, isLoading: txLoading, refetch: refetchTx } = useWalletTransactions();
  const { data: cards, isLoading: cardsLoading, refetch: refetchCards } = useCards();
  const { mutate: removeCard } = useDeleteCard();

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'cards' | 'transactions'>('transactions');

  // Fund wallet state
  const [showFundModal, setShowFundModal] = useState(false);
  const [fundAmount, setFundAmount] = useState('');
  const [checkoutAmount, setCheckoutAmount] = useState<number | null>(null);
  const [checkoutKey, setCheckoutKey] = useState(0);
  const pendingCheckout = useRef(false);
  const fundAmountRef = useRef('');

  // Add card state
  const [addCardActive, setAddCardActive] = useState(false);
  const [addCardKey, setAddCardKey] = useState(0);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchWallet(), refetchTx(), refetchCards()]);
    setRefreshing(false);
  };

  const handleDeleteCard = (cardId: string) => {
    Alert.alert('Remove Card', 'Are you sure you want to remove this card?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removeCard(cardId) },
    ]);
  };

  // Fund wallet handlers
  const handleFundWallet = useCallback(() => {
    const amount = parseFloat(fundAmount);
    if (!amount || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }
    fundAmountRef.current = fundAmount;
    pendingCheckout.current = true;
    setShowFundModal(false);
  }, [fundAmount]);

  const startCheckout = useCallback(() => {
    if (!pendingCheckout.current) return;
    pendingCheckout.current = false;
    const amount = parseFloat(fundAmountRef.current);
    setCheckoutKey((k) => k + 1);
    setCheckoutAmount(amount);
  }, []);

  const handleCheckoutComplete = useCallback(
    (success: boolean) => {
      setCheckoutAmount(null);
      setFundAmount('');
      fundAmountRef.current = '';
      if (success) {
        refetchWallet();
        refetchTx();
        Alert.alert('Success', 'Wallet funded successfully!');
      }
    },
    [refetchWallet, refetchTx],
  );

  // Add card handlers
  const handleAddCard = useCallback(() => {
    setAddCardKey((k) => k + 1);
    setAddCardActive(true);
  }, []);

  const handleAddCardComplete = useCallback(
    (success: boolean) => {
      setAddCardActive(false);
      if (success) {
        refetchCards();
        Alert.alert('Success', 'Card added successfully!');
      }
    },
    [refetchCards],
  );

  const isLoading = walletLoading || txLoading || cardsLoading;

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-dark-bg">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-2 mb-4">
        <BackButton />
        <ThemedText className="text-lg font-bold text-black dark:text-white">Wallet</ThemedText>
        <View className="w-10" />
      </View>

      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Balance Card */}
        {walletLoading && !refreshing ? (
          <BalanceCardSkeleton />
        ) : (
          <LinearGradient
            colors={['#00359E', '#002570']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 14, marginBottom: 16 }}
          >
            <View className="p-6">
              <View className="absolute -right-10 -bottom-20 w-64 h-64 rounded-full border border-white/10" />
              <View className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-blue-400/20" />

              <View>
                <ThemedText className="text-white font-medium mb-1">Balance</ThemedText>
                <Currency className="text-white text-3xl font-bold">
                  {formatAmount(wallet?.data?.balance ?? 0)}
                </Currency>
              </View>

              <TouchableOpacity
                className="self-end"
                onPress={() => setShowFundModal(true)}
                disabled={checkoutAmount !== null}
              >
                <View className="w-10 h-10 rounded-full border-2 border-white items-center justify-center">
                  {checkoutAmount !== null ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Ionicons name="add" size={24} color="white" />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        )}

        {/* Tabs */}
        {isLoading && !refreshing ? (
          <TabsSkeleton />
        ) : (
          <View className="flex-row bg-gray-100 dark:bg-dark-card p-1.5 rounded-xl mb-6">
            {(['Transactions', 'Cards'] as const).map((tab) => {
              const tabKey = tab === 'Cards' ? 'cards' : 'transactions';
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tabKey)}
                  className={`flex-1 py-3 items-center rounded-lg ${activeTab === tabKey ? 'bg-blue-500' : 'bg-gray-100 dark:bg-dark-card'}`}
                >
                  <ThemedText
                    className={`font-medium ${activeTab === tabKey ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {tab}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Tab Content */}
        {isLoading && !refreshing ? (
          activeTab === 'cards' ? <CardListSkeleton /> : <TransactionListSkeleton />
        ) : activeTab === 'cards' ? (
          <View className="gap-3">
            {cards?.data && cards.data.length > 0 ? (
              cards.data.map((card) => (
                <CardItem key={card.id} card={card} onDelete={handleDeleteCard} />
              ))
            ) : (
              <View className="items-center py-10">
                <Ionicons name="card-outline" size={48} color="#d1d5db" />
                <ThemedText className="text-gray-400 mt-3">No saved cards</ThemedText>
              </View>
            )}

            <TouchableOpacity
              onPress={handleAddCard}
              disabled={addCardActive}
              className={`flex-row items-center justify-center gap-2 py-4 rounded-xl border border-dashed ${addCardActive ? 'border-gray-200 dark:border-gray-700' : 'border-blue-300'}`}
            >
              {addCardActive ? (
                <ActivityIndicator size="small" color="#3b82f6" />
              ) : (
                <Ionicons name="add-circle-outline" size={20} color="#3b82f6" />
              )}
              <ThemedText className="text-blue-500 font-medium">
                {addCardActive ? 'Adding Card...' : 'Add New Card'}
              </ThemedText>
            </TouchableOpacity>

            <ThemedText className="text-center text-gray-400 text-xs mt-4">
              Bank cards are stored securely by Paystack
            </ThemedText>
          </View>
        ) : (
          <View>
            {transactions?.data && transactions.data.length > 0 ? (
              transactions.data.map((tx) => <TransactionItem key={tx.id} transaction={tx} />)
            ) : (
              <View className="items-center py-10">
                <Ionicons name="receipt-outline" size={48} color="#d1d5db" />
                <ThemedText className="text-gray-400 mt-3">No transactions yet</ThemedText>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Fund Wallet Modal */}
      <FundWalletModal
        isVisible={showFundModal}
        fundAmount={fundAmount}
        onChangeAmount={setFundAmount}
        onClose={() => setShowFundModal(false)}
        onSubmit={handleFundWallet}
        onModalHide={startCheckout}
      />

      {/* Paystack checkouts */}
      {checkoutAmount !== null && (
        <FundWalletCheckout
          checkoutKey={checkoutKey}
          amount={checkoutAmount}
          onComplete={handleCheckoutComplete}
        />
      )}
      {addCardActive && <AddCardCheckout checkoutKey={addCardKey} onComplete={handleAddCardComplete} />}
    </SafeAreaView>
  );
};

export default Wallet;
