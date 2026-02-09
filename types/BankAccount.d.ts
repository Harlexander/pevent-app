import type { Payout } from './Payout'
import { User } from './UserType'

// BankAccount database type

export type BankAccount = {
  id: string
  recipient_code: string
  account_number: string
  account_name: string
  bank_code: string
  bank_name: string
  is_deleted: boolean | null
  userId: string
  createdAt: Date
  user: User
  payouts: Payout[]
}