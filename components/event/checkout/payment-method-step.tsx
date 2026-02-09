import { ThemedText } from '@/components/themed-text'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

const PAYMENT_METHODS = [
    { id: 'card', name: 'Credit / Debit Card', icon: 'card-outline' },
    { id: 'transfer', name: 'Bank Transfer', icon: 'business-outline' },
    { id: 'ussd', name: 'USSD', icon: 'keypad-outline' },
]

interface PaymentMethodStepProps {
    selectedMethod: string;
    onSelectMethod: (method: string) => void;
}

const PaymentMethodStep = ({ selectedMethod, onSelectMethod }: PaymentMethodStepProps) => {
    return (
        <View className='p-5 gap-3'>
            {PAYMENT_METHODS.map((method) => (
                <TouchableOpacity
                    key={method.id}
                    onPress={() => onSelectMethod(method.id)}
                    className={`flex-row items-center p-4 rounded-xl border ${selectedMethod === method.id ? 'border-primary bg-blue-50' : 'border-gray-200 bg-white'}`}
                >
                    <Ionicons
                        name={method.icon as any}
                        size={24}
                        color={selectedMethod === method.id ? '#004cffff' : '#6b7280'}
                    />
                    <ThemedText className={`ml-3 text-base flex-1 ${selectedMethod === method.id ? 'font-bold text-primary' : 'text-gray-600'}`}>
                        {method.name}
                    </ThemedText>

                    <View className={`w-5 h-5 rounded-full border items-center justify-center ${selectedMethod === method.id ? 'border-primary' : 'border-gray-300'}`}>
                        {selectedMethod === method.id && <View className='w-3 h-3 rounded-full bg-primary' />}
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default PaymentMethodStep
