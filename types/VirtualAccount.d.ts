// VirtualAccount database type

import { NotifyTarget } from "./NotifyTarget"
import { Transaction } from "./Transaction"

export type VirtualAccount = {
  id: string
  eventId: string
  event: Event
  userId: string
  terminalId: string
  name: string
  paymentUrl: string
  paymentPageUrl: string
  qrCode: string
  accountNumber: string | null
  accountName: string | null
  bankName: string | null
  fee_rate: number
  notifyTargets: NotifyTarget[]
  isActive: boolean
  createdAt: Date
  transactions: Transaction[]
}