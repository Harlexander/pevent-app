import { Categories } from './Categories'
import { Contestants } from './Contestants'
import type { Event } from './Event'

// Voting database type

export type Voting = {
  id: string
  status: boolean
  amount: number
  type: VotingType
  closing_date: Date | null
  result: boolean
  eventId: string
  createdAt: Date
  categories: Categories[]
  contestants: Contestants[]
  event: Event
}

// Enums used by Voting
export enum VotingType {
  award = 'award',
  pageantry = 'pageantry'
}
