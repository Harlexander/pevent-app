// Session database type

export type Session = {
  id: string
  sessionToken: string
  userId: string
  expires: Date
  user: User
}

// Forward declarations (circular dependency)
export type User = any