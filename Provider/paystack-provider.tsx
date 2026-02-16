import React, { ReactNode } from 'react'
import { PaystackProvider } from 'react-native-paystack-webview'
import { useCheckoutStore } from '@/store/checkout-store'

const PaystackCustomProvider = ({ children }: { children: ReactNode }) => {
  const paymentChannel = useCheckoutStore((state) => state.paymentChannel)

  return (
    <PaystackProvider
      publicKey={process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY || ""}
      defaultChannels={[paymentChannel as any]}
    >
      {children}
    </PaystackProvider>
  )
}

export default PaystackCustomProvider
