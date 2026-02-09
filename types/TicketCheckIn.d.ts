import { TicketBought } from './TicketBought'

export type TicketCheckIn = {
  id: string
  ticketBoughtId: string
  date: Date
  createdAt: Date
  ticketBought: TicketBought
}
