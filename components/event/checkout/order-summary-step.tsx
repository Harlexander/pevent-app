import Currency from '@/components/currency'
import { ThemedText } from '@/components/themed-text'
import Input from '@/components/ui/input'
import { Feather, Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { Ticket } from '@/types'

interface OrderSummaryStepProps {
    tickets: Ticket[];
    quantities: Record<string, number>;
    totalPrice: number;
    discount?: number;
    fees?: number;
    promoCode?: string;
    onPromoCodeChange?: (code: string) => void;
    onApplyPromo?: () => void;
}

const OrderSummaryStep = ({
    quantities,
    totalPrice,
    tickets,
    discount = 0,
    fees = 0,
    promoCode = '',
    onPromoCodeChange,
    onApplyPromo,
}: OrderSummaryStepProps) => {
    const [isPromoOpen, setIsPromoOpen] = useState(false)

    const subTotal = totalPrice
    const finalTotal = subTotal + fees - discount

    const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0)

    return (
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
            <View className='p-5'>
                {/* Ticket List */}
                <View className='mb-5'>
                    <ThemedText className='text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest'>
                        Your Tickets ({totalTickets})
                    </ThemedText>
                    <View className='bg-gray-50 dark:bg-dark-card rounded-xl gap-3'>
                        {tickets.filter(t => quantities[t.id] > 0).map((ticket, index, arr) => (
                            <View
                                key={ticket.id}
                                className={`flex-row bg-white dark:bg-dark-bg rounded-xl p-4 justify-between items-center `}
                            >
                                <View className='flex-1'>
                                    <ThemedText className='font-semibold text-gray-800 dark:text-gray-300 capitalize'>{ticket.name}</ThemedText>
                                    <View className='flex-row items-center gap-1 mt-1'>
                                        <Feather name='user' size={12} color='#9ca3af' />
                                        <ThemedText className='text-gray-400 text-xs'>
                                            {ticket.numPersons} {ticket.numPersons > 1 ? 'persons' : 'person'} per ticket
                                        </ThemedText>
                                    </View>
                                </View>
                                <View className='items-end'>
                                    <Currency className='font-bold text-gray-900 dark:text-gray-100'>{ticket.price * quantities[ticket.id]}</Currency>
                                    <ThemedText className='text-gray-400 text-xs'>x{quantities[ticket.id]}</ThemedText>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Promo Code */}
                <View className='mb-5'>
                    <TouchableOpacity
                        onPress={() => setIsPromoOpen(!isPromoOpen)}
                        className='flex-row items-center gap-2'
                    >
                        <Ionicons name="pricetag-outline" size={18} color="#3b82f6" />
                        <ThemedText className='text-blue-500 font-semibold'>Have a promo code?</ThemedText>
                        <Ionicons name={isPromoOpen ? "chevron-up" : "chevron-down"} size={14} color="#3b82f6" />
                    </TouchableOpacity>

                    {isPromoOpen && (
                        <View className='flex-row gap-3 mt-3'>
                            <View className='flex-1'>
                                <Input
                                    placeholder="Enter code"
                                    value={promoCode}
                                    onChangeText={onPromoCodeChange}
                                    autoCapitalize="characters"
                                />
                            </View>
                            <TouchableOpacity
                                onPress={onApplyPromo}
                                className='bg-primary rounded-xl px-5 justify-center'
                            >
                                <ThemedText className='font-bold text-white text-sm'>Apply</ThemedText>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Cost Breakdown */}
                <View className='bg-white dark:bg-dark-bg rounded-xl border border-gray-100 dark:border-gray-700 p-4 gap-3'>
                    <View className='flex-row justify-between items-center'>
                        <ThemedText className='text-gray-500 dark:text-gray-400'>Subtotal</ThemedText>
                        <Currency className='font-semibold text-gray-800 dark:text-gray-300'>{subTotal}</Currency>
                    </View>

                    {discount > 0 && (
                        <View className='flex-row justify-between items-center'>
                            <View className='flex-row items-center gap-1'>
                                <ThemedText className='text-gray-500 dark:text-gray-400'>Discount</ThemedText>
                                <View className='bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded'>
                                    <ThemedText className='text-green-600 text-xs font-medium'>APPLIED</ThemedText>
                                </View>
                            </View>
                            <ThemedText className='font-semibold text-green-600'>-<Currency>{discount}</Currency></ThemedText>
                        </View>
                    )}

                    <View className='flex-row justify-between items-center'>
                        <ThemedText className='text-gray-500 dark:text-gray-400'>Fees</ThemedText>
                        <ThemedText className='font-semibold text-gray-800 dark:text-gray-300'>
                            <Currency>{fees}</Currency>
                        </ThemedText>
                    </View>

                    <View className='h-px bg-gray-100 dark:bg-gray-700 my-1' />

                    <View className='flex-row justify-between items-center'>
                        <ThemedText className='text-lg font-bold text-black dark:text-white'>Total</ThemedText>
                        <Currency className='text-xl font-bold text-primary'>{finalTotal}</Currency>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default OrderSummaryStep
