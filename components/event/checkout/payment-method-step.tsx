import Currency from '@/components/currency'
import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useCards } from '@/hooks/query/useCard'
import { useWallet } from '@/hooks/query/useWallet'
import { PaymentChannel, useCheckoutStore } from '@/store/checkout-store'
import { Card } from '@/types/Card'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { PaymentMethodsSkeleton, SavedCardsSkeleton } from '@/components/event/checkout/payment-method-skeleton'
import Skeleton from '@/components/ui/skeleton'
import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'

const PAYMENT_METHODS: {
  id: PaymentChannel
  name: string
  icon: string
  description: string
}[] = [
    {
      id: 'card',
      name: 'Card Payment',
      icon: 'card',
      description: 'Visa, Mastercard, Verve',
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      icon: 'business',
      description: 'Direct bank payment',
    },
    {
      id: 'wallet',
      name: 'Pevent Wallet',
      icon: 'wallet',
      description: 'Instant & Secure',
    },
  ]

const SavedCardItem = ({
  card,
  isSelected,
  onPress,
}: {
  card: Card
  isSelected: boolean
  onPress: () => void
}) => {
  const isVisa = card.cardType?.toLowerCase() === 'visa'

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="overflow-hidden rounded-2xl mb-3"
    >
        <View className="flex-row items-center p-4 bg-white dark:bg-dark-bg">
          <View
            className={`w-12 h-9 rounded-lg items-center justify-center ${isVisa ? 'bg-blue-600' : 'bg-red-500'}`}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          >
            {isVisa ? (
              <ThemedText className="text-white text-[10px] font-bold">VISA</ThemedText>
            ) : (
              <View className="flex-row -space-x-1.5">
                <View className="w-3 h-3 rounded-full bg-red-500" />
                <View className="w-3 h-3 rounded-full bg-yellow-400" />
              </View>
            )}
          </View>
          <View className="ml-4 flex-1">
            <ThemedText className={`text-base font-bold ${isSelected ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>
              •••• •••• •••• {card.last4}
            </ThemedText>
            <ThemedText className={`text-xs mt-0.5 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
              {card.bank} • Expires {card.expMonth}/{card.expYear}
            </ThemedText>
          </View>
          <View
            className={`w-6 h-6 rounded-full border-2 items-center justify-center ${isSelected ? 'border-white' : 'border-gray-300 dark:border-gray-600'}`}
          >
            {isSelected && <View className="w-3 h-3 rounded-full bg-white" />}
          </View>
        </View>
    </TouchableOpacity>
  )
}

const PaymentMethodStep = () => {
  const { colorScheme } = useColorScheme()
  const paymentChannel = useCheckoutStore((state) => state.paymentChannel)
  const selectedCardId = useCheckoutStore((state) => state.selectedCardId)
  const setPaymentChannel = useCheckoutStore((state) => state.setPaymentChannel)
  const setSelectedCardId = useCheckoutStore((state) => state.setSelectedCardId)
  const { data: wallet, isLoading: walletLoading } = useWallet()
  const { data: cards, isLoading: cardsLoading } = useCards()

  const walletBalance = wallet?.data?.balance ?? 0
  const savedCards = cards?.data ?? []

  const handleSelectCard = (cardId: string) => {
    setPaymentChannel('saved_card')
    setSelectedCardId(cardId)
  }

  const handleSelectMethod = (id: PaymentChannel) => {
    setPaymentChannel(id)
    if (id !== 'saved_card') {
      setSelectedCardId(null)
    }
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-50 dark:bg-dark-card"
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="mb-6">
        <ThemedText className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
          Choose Payment Method
        </ThemedText>
      </View>

      {/* Saved Cards */}
      {cardsLoading ? (
        <>
          <PaymentMethodsSkeleton />
          <SavedCardsSkeleton />
        </>
      ) : (
        <>
          {/* Payment Methods */}
          <View className="flex-row items-center mb-4">
            <Ionicons name="options" size={18} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} />
            <ThemedText className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-2">
              PAYMENT METHODS
            </ThemedText>
          </View>

          {PAYMENT_METHODS.map((method, index) => {
            const isWallet = method.id === 'wallet'
            const isSelected = paymentChannel === method.id

            return (
              <TouchableOpacity
                key={method.id}
                onPress={() => handleSelectMethod(method.id)}
                activeOpacity={0.7}
                className="overflow-hidden rounded-2xl mb-3"
                style={{
                  shadowColor: isSelected ? '#004cff' : '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: isSelected ? 0.2 : 0.05,
                  shadowRadius: 8,
                  elevation: isSelected ? 4 : 2,
                }}
              >
                <View
                  className={isSelected ? 'bg-blue-500' : 'bg-white dark:bg-dark-bg'}
                  style={{ padding: 12 }}
                >
                  <View className="flex-row items-center">
                    <View
                      className={`w-12 h-12 rounded-xl items-center justify-center ${isSelected ? 'bg-white/20' : 'bg-gray-100 dark:bg-dark-card'}`}
                    >
                      <Ionicons
                        name={method.icon as any}
                        size={24}
                        color={isSelected ? '#ffffff' : Colors.primary}
                      />
                    </View>
                    <View className="ml-4 flex-1">
                      <View className="flex-row items-center">
                        <ThemedText
                          className={`text-base font-bold ${isSelected ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}
                        >
                          {method.name}
                        </ThemedText>
                      </View>
                      <ThemedText className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                        {method.description}
                      </ThemedText>
                      {isWallet && (
                        <View className="flex-row items-center mt-2">
                          {walletLoading ? (
                            <Skeleton width={80} height={14} borderRadius={4} />
                          ) : (
                            <>
                              <ThemedText className={`text-xs ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>
                                Balance:
                              </ThemedText>
                              <Currency className={`text-sm font-bold ml-1 ${isSelected ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>
                                {walletBalance.toLocaleString()}
                              </Currency>
                            </>
                          )}
                        </View>
                      )}
                    </View>

                    <View
                      className={`w-6 h-6 rounded-full border-2 items-center justify-center ${isSelected ? 'border-white' : 'border-gray-300 dark:border-gray-600'}`}
                    >
                      {isSelected && <View className="w-3.5 h-3.5 rounded-full bg-white" />}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}

          {/* Saved Cards */}
          {savedCards.length > 0 && (
            <View className="mt-3 mb-3">
              <View className="flex-row items-center mb-4">
                <Ionicons name="card" size={18} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} />
                <ThemedText className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-2">
                  SAVED CARDS
                </ThemedText>
              </View>
              {savedCards.map((card) => (
                <SavedCardItem
                  key={card.id}
                  card={card}
                  isSelected={paymentChannel === 'saved_card' && selectedCardId === card.id}
                  onPress={() => handleSelectCard(card.id)}
                />
              ))}
            </View>
          )}

          {/* Security Badge */}
          <View className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex-row items-center">
            <Ionicons name="shield-checkmark" size={20} color={Colors.primary} />
            <ThemedText className="text-xs text-gray-600 dark:text-gray-300 ml-3 flex-1">
              All payments are secured and encrypted with industry-standard SSL technology
            </ThemedText>
          </View>
        </>
      )}
    </ScrollView>
  )
}

export default PaymentMethodStep
