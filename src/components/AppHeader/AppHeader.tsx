'use client'

import { Header } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/lib/hooks/useAuth'
import { mobileHeaderItems } from '@/shared/navigation/mobileHeaderItems'

export const AppHeader = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log('🔄 AppHeader: isAuthenticated =', isAuthenticated)
  }, [isAuthenticated])

  const signInHandler = () => {
    router.push('/sign-in')
  }

  const signUpHandler = () => {
    router.push('/sign-up')
  }

  return (
    <Header
      isAuthenticated={isAuthenticated}
      mobileAuthenticatedMenuItems={mobileHeaderItems}
      onLogInClick={signInHandler}
      onSignUpClick={signUpHandler}
      linkTag={Link}
    />
  )
}
