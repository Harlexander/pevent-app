// Coupon database type

import { Transaction } from "./Transaction"

export type Coupon = {
  id: string
  code: string
  type: CouponType
  percentage: number | null
  amount: number | null
  eventId: string
  name: string | null
  email: string | null
  usedAt: Date | null
  expiresAt: Date | null
  createdAt: Date
  updatedAt: Date
  event: Event
  transactions: Transaction[]
}

// Enums used by Coupon
export enum CouponType {
  percentage = 'percentage',
  fixed = 'fixed'
}