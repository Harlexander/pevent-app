import { useUserStore } from '@/store/user-store';
import React, { useRef } from 'react';
import { PaystackProvider, usePaystack } from 'react-native-paystack-webview';

const PAYSTACK_PUBLIC_KEY = 'pk_test_13d3aa205530448f5a93b860993d658e429dd44e';

/** Isolated component — mounts a fresh usePaystack per transaction. */
const FundWalletCheckoutInner = ({
  amount,
  onComplete,
}: {
  amount: number;
  onComplete: (success: boolean) => void;
}) => {
  const { popup } = usePaystack();
  const user = useUserStore((state) => state.user);
  const hasStarted = useRef(false);

  React.useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    popup.newTransaction({
      email: user?.email || '',
      amount,
      metadata: {
        userId: user?.id,
        purpose: 'walletFunding',
        amount,
      },
      onSuccess: () => onComplete(true),
      onError: (err: any) => {
        console.log(err);
        onComplete(false);
      },
      onCancel: () => onComplete(false),
    });
  }, []);

  return null;
};

/** Charges ₦50 with recurring flag to tokenize and save the card. */
const AddCardCheckoutInner = ({ onComplete }: { onComplete: (success: boolean) => void }) => {
  const { popup } = usePaystack();
  const user = useUserStore((state) => state.user);
  const hasStarted = useRef(false);

  React.useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    popup.newTransaction({
      email: user?.email || '',
      amount: 50,
      metadata: {
        userId: user?.id,
        purpose: 'addCard',
        custom_filters: {
          recurring: true,
        },
      },
      onSuccess: () => onComplete(true),
      onError: (err: any) => {
        console.log(err);
        onComplete(false);
      },
      onCancel: () => onComplete(false),
    });
  }, []);

  return null;
};

/** Wraps a checkout component in its own PaystackProvider. Keyed to force fresh instance. */
export const FundWalletCheckout = ({
  checkoutKey,
  amount,
  onComplete,
}: {
  checkoutKey: number;
  amount: number;
  onComplete: (success: boolean) => void;
}) => (
  <PaystackProvider publicKey={PAYSTACK_PUBLIC_KEY}>
    <FundWalletCheckoutInner key={checkoutKey} amount={amount} onComplete={onComplete} />
  </PaystackProvider>
);

export const AddCardCheckout = ({
  checkoutKey,
  onComplete,
}: {
  checkoutKey: number;
  onComplete: (success: boolean) => void;
}) => (
  <PaystackProvider publicKey={PAYSTACK_PUBLIC_KEY}>
    <AddCardCheckoutInner key={checkoutKey} onComplete={onComplete} />
  </PaystackProvider>
);
