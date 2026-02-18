import { api } from '@/constants/axios';
import { endpoints } from '@/constants/endpoints';
import { Attendee } from '@/types/Ticket';
import { PaymentIntent, Wallet, WalletTransaction } from '@/types/Wallet';
import { ResponseType, ResponseWithMeta } from '@/types/response';
import { AxiosError } from 'axios';

export const getWallet = async () => {
  const response = await api.get<ResponseType<Wallet>>(endpoints.wallet.get);
  return response.data;
};

export const getWalletTransactions = async (page: number = 1) => {
  const response = await api.get<ResponseWithMeta<WalletTransaction[]>>(endpoints.wallet.transactions, {
    params: { page },
  });
  return response.data;
};

export interface WalletSpendParams {
  type: 'ticket';
  amount: number;
  ticketId: string;
  firstName: string;
  lastName: string;
  email: string;
  quantity: number;
  attendees?: Pick<Attendee, 'firstName' | 'lastName' | 'email' | 'ticketId'>[];
  reseller?: string;
  coupon?: string;
  customFields?: { fieldId: string; value: string }[];
}

export interface CreatePaymentIntentParams {
  amount: number;
  purpose: 'ticket' | 'wallet';
  ttlMinutes?: number;
  metadata?: Record<string, unknown>;
}

export const createPaymentIntent = async (params: CreatePaymentIntentParams) => {
  try {
    const response = await api.post<ResponseType<PaymentIntent>>(endpoints.wallet.intent, params);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message || 'Failed to create payment intent.');
  }
};

export const getPaymentIntent = async (id: string) => {
  const response = await api.get<ResponseType<PaymentIntent>>(`${endpoints.wallet.intent}`, {
    params: { id },
  });
  return response.data;
};

export const walletSpend = async (params: WalletSpendParams) => {
  try {
    const response = await api.post<ResponseType<{ reference: string }>>(endpoints.wallet.spend, params);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message || 'Wallet payment failed. Please try again.');
  }
};
