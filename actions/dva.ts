import { api } from '@/constants/axios';
import { endpoints } from '@/constants/endpoints';
import { DVA } from '@/types/Wallet';
import { ResponseType } from '@/types/response';

export const getDVA = async () => {
  const response = await api.get<ResponseType<DVA>>(endpoints.dva.get);
  return response.data;
};

export const createDVA = async () => {
  const response = await api.post<ResponseType<DVA>>(endpoints.dva.create);
  return response.data;
};
