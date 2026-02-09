// NotifyTarget database type

import { VirtualAccount } from "./VirtualAccount"

export type NotifyTarget = {
  id: string
  virtualAccountId: string
  virtualAccount: VirtualAccount
  target: string
  name: string
  createdAt: Date
}
