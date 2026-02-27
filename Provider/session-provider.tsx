import { useStorageState, setStorageItemAsync, getStorageItemAsync } from '@/hooks/use-storage-state'
import { api } from '@/constants/axios'
import { endpoints } from '@/constants/endpoints'
import { use, createContext, useCallback, type PropsWithChildren } from 'react'

const AuthContext = createContext<{
  signIn: (accessToken: string, refreshToken: string) => void
  signOut: () => void
  session?: string | null
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
})

// Use this hook to access the user info.
export function useSession() {
  const value = use(AuthContext)
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />')
  }

  return value
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session')

  const signIn = useCallback(
    (accessToken: string, refreshToken: string) => {
      setSession(accessToken)
      setStorageItemAsync('refreshToken', refreshToken)
    },
    [setSession],
  )

  const signOut = useCallback(async () => {
    try {
      const refreshToken = await getStorageItemAsync('refreshToken')
      if (refreshToken) {
        await api.post(endpoints.AUTH.logout, { refreshToken })
      }
    } catch {
      // Proceed with local cleanup even if the API call fails
    }
    setSession(null)
    setStorageItemAsync('refreshToken', null)
  }, [setSession])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
