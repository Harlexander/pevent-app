export interface Wallet {
  id: string;
  balance: number;
  createdAt: string;
}

export interface DVA {
  accountNumber: string;
  accountName: string;
  bankName: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  status: 'pending' | 'fulfilled' | 'expired';
  expiresAt: string;
  dva: DVA;
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  type: 'funding' | 'ticketPurchase' | 'votePurchase';
  amount: number;
  reference: string;
  description: string;
  createdAt: string;
}
