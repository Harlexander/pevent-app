export interface Wallet {
  id: string;
  balance: number;
  createdAt: string;
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
