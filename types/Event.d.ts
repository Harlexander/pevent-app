import type { Message } from './Message'
import type { Reseller } from './Reseller'
import type { Ticket } from './Ticket'
import type { Voting } from './Voting'
import type { VirtualAccount } from './VirtualAccount'
import { Coordinates } from './Coordinates'
import { Coupon } from './Coupon'
import { User } from './UserType'

// Event database type

export type Event = {
  id: string
  name: string
  slug: string
  vote: boolean
  date: string
  time: string
  category: string
  location: string | null
  venuePublic: boolean
  venue: string | null
  state: string | null
  city: string | null
  description: string | null
  pinned: boolean
  images: string[]
  views: number
  createdAt: Date
  userId: string
  password: string
  bearer: Bearer
  ticket_rate: number
  ticket_fixed: number
  status: Status
  presale: boolean
  coordinates: Coordinates | null
  coupons: Coupon[]
  user: User
  messages: Message[]
  Reseller: Reseller[]
  tickets: Ticket[]
  voting: Voting | null
  virtualAccount: VirtualAccount[]
}

// Enums used by Event
export enum Status {
  active = 'active',
  disabled = 'disabled',
  suspended = 'suspended'
}

export enum Bearer {
  user = 'user',
  event = 'event',
  split = 'split'
}