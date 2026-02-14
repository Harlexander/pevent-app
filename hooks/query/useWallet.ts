import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getWallet, getWalletTransactions, walletSpend, WalletSpendParams } from '../../actions/wallet';

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
