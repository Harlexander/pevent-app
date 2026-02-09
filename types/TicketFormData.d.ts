import { FormValue } from './FormValue'
import { TicketBought } from './TicketBought'

export type TicketFormData = {
  id: string
  ticketBoughtId: string
  createdAt: Date
  updatedAt: Date
  values: FormValue[]
  ticketBought: TicketBought
}
