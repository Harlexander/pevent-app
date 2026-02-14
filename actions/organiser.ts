import { api } from '@/constants/axios'
import { endpoints } from '@/constants/endpoints'
import { Event, User } from '@/types'
import { ResponseType } from '@/types/response'

export type Organiser = User & {
  events: Event[]
}

export const getOrganiser = async (id: string) => {
  const response = await api.get<ResponseType<Organiser>>(endpoints.organiser.get.replace(':id', id))
  return response.data
}
