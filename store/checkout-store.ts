import { create } from 'zustand'

export type PaymentChannel = 'card' | 'bank_transfer' | 'ussd' | 'wallet' | 'saved_card'

interface CheckoutState {
    paymentChannel: PaymentChannel
    selectedCardId: string | null
    setPaymentChannel: (channel: PaymentChannel) => void
    setSelectedCardId: (cardId: string | null) => void
    reset: () => void
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
    paymentChannel: 'card',
    selectedCardId: null,
    setPaymentChannel: (paymentChannel) => set({ paymentChannel }),
    setSelectedCardId: (selectedCardId) => set({ selectedCardId }),
    reset: () => set({ paymentChannel: 'card', selectedCardId: null }),
}))
