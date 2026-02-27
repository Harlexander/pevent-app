import { useState, useCallback } from 'react'
import { useGuestStore } from '@/store/guest-store'
import { useSession } from '@/Provider/session-provider'

export function useAuthGuard() {
  const { session } = useSession()
  const { isGuest } = useGuestStore()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const requireAuth = useCallback(
    (action: () => void) => {
      if (isGuest || !session) {
        setShowAuthModal(true)
        return
      }
      action()
    },
    [isGuest, session],
  )

  return {
    isGuest,
    isAuthenticated: !!session && !isGuest,
    showAuthModal,
    setShowAuthModal,
    requireAuth,
  }
}
