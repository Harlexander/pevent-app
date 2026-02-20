import React, { ReactNode, useMemo } from 'react'
import { PaystackProvider } from 'react-native-paystack-webview'
import { useCheckoutStore } from '@/store/checkout-store'
import { useDVA } from '@/hooks/query/useWallet'

const PaystackCustomProvider = ({ children }: { children: ReactNode }) => {
  const paymentChannel = useCheckoutStore((state) => state.paymentChannel)
  const { data: dva } = useDVA()

  const channels = useMemo(() => {
    const hasDVA = !!dva?.data
    // If user has no DVA, include bank_transfer in Paystack channels as fallback
    if (!hasDVA && paymentChannel === 'card') {
      return ['card', 'bank_transfer'] as any[]
    }
    return [paymentChannel as any]
  }, [paymentChannel, dva?.data])

  return (
    <PaystackProvider
      publicKey={process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY || ""}
      defaultChannels={channels}
    >
      {children}
    </PaystackProvider>
  )
}

export default PaystackCustomProvider
