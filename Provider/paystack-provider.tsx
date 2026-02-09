import React, { ReactNode } from 'react'
import { PaystackProvider} from 'react-native-paystack-webview'

const PaystackCustomProvider = ({ children } : { children : ReactNode} ) => {
  return (
    <PaystackProvider 
        publicKey='pk_test_13d3aa205530448f5a93b860993d658e429dd44e'
        defaultChannels={['card']}
    >
        { children }
    </PaystackProvider>
  )
}

export default PaystackCustomProvider