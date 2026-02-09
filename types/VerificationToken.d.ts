// VerificationToken database type

export type VerificationToken = {
  id: string
  identifier: string
  token: string
  expires: Date
}