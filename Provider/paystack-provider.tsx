import React, { ReactNode } from 'react'
import { PaystackProvider } from 'react-native-paystack-webview'
import { useCheckoutStore } from '@/store/checkout-store'

const PaystackCustomProvider = ({ children }: { children: ReactNode }) => {
  const paymentChannel = useCheckoutStore((state) => state.paymentChannel)

  return (
    <PaystackProvider
      publicKey='pk_test_13d3aa205530448f5a93b860993d658e429dd44e'
      defaultChannels={[paymentChannel]}
    >
      {children}
    </PaystackProvider>
  )
}

export default PaystackCustomProvider
