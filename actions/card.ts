import { api } from '@/constants/axios';
import { endpoints } from '@/constants/endpoints';
import { Attendee } from '@/types/Ticket';
import { Card } from '@/types/Card';
import { ResponseType } from '@/types/response';
import { AxiosError } from 'axios';

export const getCards = async () => {
  const response = await api.get<ResponseType<Card[]>>(endpoints.card.get);
  return response.data;
};

export const deleteCard = async (cardId: string) => {
  const response = await api.delete<ResponseType<null>>(endpoints.card.delete.replace(':cardId', cardId));
  return response.data;
};

export interface CardChargeParams {
  cardId: string;
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

export const chargeCard = async (params: CardChargeParams) => {
  try {
    const response = await api.post<ResponseType<{ reference: string }>>(endpoints.card.charge, params);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message || 'Card payment failed. Please try again.');
  }
};
