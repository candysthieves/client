'use client'

import { Header } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LogoutModal } from '@/components'
import { useAuth } from '@/lib/hooks/useAuth'
import { mobileHeaderItems } from '@/shared/navigation/mobileHeaderItems'

export const AppHeader = () => {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [logoutOpen, setLogoutOpen] = useState(false)

  useEffect(() => {
    console.log('🔄 AppHeader: isAuthenticated =', isAuthenticated)
    console.log('🔄 User =', user)
  }, [isAuthenticated])

  const signInHandler = () => {
    router.push('/sign-in')
  }

  const signUpHandler = () => {
    router.push('/sign-up')
  }

  const authenticatedMenuItems = mobileHeaderItems.map(item =>
    item.id === 'logOut' ? { ...item, onSelect: () => setLogoutOpen(true) } : item
  )

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        mobileAuthenticatedMenuItems={authenticatedMenuItems}
        onLogInClick={signInHandler}
        onSignUpClick={signUpHandler}
        linkTag={Link}
      />
      <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </>
  )
}
