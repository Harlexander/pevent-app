// Coordinates database type

import { Event } from "./Event"

export type Coordinates = {
  id: string
  lat: string
  lng: string
  eventId: string
  event: Event
}