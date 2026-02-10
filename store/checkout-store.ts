import { create } from 'zustand'

export type PaymentChannel = 'card' | 'bank_transfer' | 'ussd'

interface CheckoutState {
    paymentChannel: PaymentChannel
    setPaymentChannel: (channel: PaymentChannel) => void
    reset: () => void
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
    paymentChannel: 'card',

    setPaymentChannel: (paymentChannel) => set({ paymentChannel }),

    reset: () => set({ paymentChannel: 'card' }),
}))
