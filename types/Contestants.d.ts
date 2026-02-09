import type { Transaction } from './Transaction'
import { Voting } from './Voting'

// Contestants database type

export type Contestants = {
  id: string
  name: string
  slug: string
  category: string
  info: string
  image: string
  bio: string | null
  votes: number | null
  votingId: string
  createdAt: Date
  voting: Voting
  transactions: Transaction[]
}
