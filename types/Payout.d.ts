// Payout database type

import { User } from "./UserType"
import { BankAccount } from "./BankAccount"

export type Payout = {
  id: string
  amount: number
  status: string
  reference: string
  transfer_code: string | null
  recipient_code: string
  userId: string
  createdAt: Date
  updatedAt: Date
  recipient: BankAccount
  user: User
}
