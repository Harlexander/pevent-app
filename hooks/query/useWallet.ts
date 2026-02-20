import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getWallet,
  getWalletTransactions,
  walletSpend,
  WalletSpendParams,
  createPaymentIntent,
  CreatePaymentIntentParams,
  getPaymentIntent,
} from '../../actions/wallet';
import { getDVA, createDVA } from '../../actions/dva';
import { AxiosError } from 'axios';

export const useWallet = () => {
  return useQuery({
    queryKey: ['wallet'],
    queryFn: getWallet,
  });
};

export const useWalletTransactions = (page: number = 1) => {
  return useQuery({
    queryKey: ['wallet', 'transactions', page],
    queryFn: () => getWalletTransactions(page),
  });
};

export const useWalletSpend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: WalletSpendParams) => walletSpend(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
    },
  });
};

export const useDVA = () => {
  return useQuery({
    queryKey: ['dva'],
    queryFn: getDVA,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 3;
    },
  });
};

export const useCreateDVA = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDVA,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dva'] });
    },
    onError: (error) => {
      console.log((error as AxiosError).response?.data);
    },
  });
};

export const useCreatePaymentIntent = () => {
  return useMutation({
    mutationFn: (params: CreatePaymentIntentParams) => createPaymentIntent(params),
  });
};

export const usePaymentIntent = (id: string | null, status?: string, fastPolling?: boolean) => {
  return useQuery({
    queryKey: ['payment-intent', id],
    queryFn: () => getPaymentIntent(id!),
    enabled: !!id && status !== 'fulfilled' && status !== 'expired',
    refetchInterval: fastPolling ? 1500 : 5000,
  });
};
