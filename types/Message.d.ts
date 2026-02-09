
import { Event } from "./Event"

export type Message = {
  id: string
  name: string
  email: string
  mobile: string | null
  message: string
  createdAt: Date
  eventId: string
  event: Event
}