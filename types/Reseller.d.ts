import type { TicketBought } from './TicketBought'
import { Event } from './Event'
// Reseller database type

export type Reseller = {
  id: string
  code: string
  name: string
  email: string
  rate: number | null
  eventId: string
  createdAt: Date
  event: Event
  ticketSold: TicketBought[]
}
