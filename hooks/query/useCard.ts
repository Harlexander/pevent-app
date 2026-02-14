import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CardChargeParams, chargeCard, deleteCard, getCards } from '../../actions/card';

export const useCards = () => {
  return useQuery({
    queryKey: ['cards'],
    queryFn: getCards,
  });
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardId: string) => deleteCard(cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });
};

export const useChargeCard = () => {
  return useMutation({
    mutationFn: (params: CardChargeParams) => chargeCard(params),
  });
};
