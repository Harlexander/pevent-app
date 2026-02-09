// User-related database types

import { Account } from "./Account"
import { BankAccount } from "./BankAccount"
import { Payout } from "./Payout"
import { Session } from "./Session"
import { Transaction } from "./Transaction"

export type User = {
    id: string
    name: string
    firstName: string | null
    lastName: string | null
    mobile: string | null
    address: string | null
    bio: string | null
    state: string | null
    country: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date | null
  }