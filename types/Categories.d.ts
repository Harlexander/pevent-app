// Categories database type

import { Voting } from "./Voting"

export type Categories = {
  id: string
  category: string
  votingId: string | null
  voting: Voting | null
}