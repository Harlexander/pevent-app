import { api } from '@/constants/axios'
import { endpoints } from '@/constants/endpoints'
import { Coupon } from '@/types'
import { ResponseType } from '@/types/response'

export const validateCoupon = async (code: string, eventId: string) => {
  const response = await api.get<ResponseType<Coupon>>(endpoints.coupon.validate, {
    params: { code, eventId },
  })
  return response.data
}
