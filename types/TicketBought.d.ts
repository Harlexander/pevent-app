import type { TicketCheckIn } from './TicketCheckIn'
import { TicketFormData } from './TicketFormData'
import { Reseller } from './Reseller'
import { Ticket } from './Ticket'
import { Transaction } from './Transaction'
// TicketBought database type

export type TicketBought = {
  id: string
  firstName: string
  lastName: string
  email: string
  checkedIn: Date | null
  ticketId: string
  resellerCode: string | null
  transactionId: string
  createdAt: Date
  mailed: Date | null
  reseller: Reseller | null
  ticket: Ticket
  transaction: Transaction
  formData: TicketFormData | null
  checkIns: TicketCheckIn[]
}
