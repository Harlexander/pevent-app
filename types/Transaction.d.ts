import { TicketBought } from "./TicketBought"
import { Contestants } from "./Contestants"
import { Coupon } from "./Coupon"
import { Ticket } from "./Ticket"
import { User } from "./UserType"
import { VirtualAccount } from "./VirtualAccount"

export type Transaction = {
  id: string
  ref: string
  purpose: Purpose
  email: string
  firstName: string
  lastName: string
  amount: number
  trans_fee: number
  withdrawable: boolean
  contestantId: string | null
  ticketId: string | null
  userId: string
  couponId: string | null
  virtualAccountId: string | null
  isVirtualAccountPayment: boolean
  createdAt: Date
  tickets_bought: TicketBought[]
  contestant: Contestants | null
  coupon: Coupon | null
  ticket: Ticket | null
  user: User
  virtualAccount: VirtualAccount | null
}

// Enums used by Transaction
export enum Purpose {
  voting = 'voting',
  ticket = 'ticket',
  virtualAccount = 'virtualAccount'
}
