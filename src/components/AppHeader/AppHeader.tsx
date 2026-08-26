'use client'

import { Header } from '@candy.thieves/ui-kit-lumos'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'

export const AppHeader = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const signInHandler = () => {
    router.push('/sign-in')
  }

  const signUpHandler = () => {
    router.push('/sign-up')
  }

  return (
    <Header
      isAuthenticated={isAuthenticated}
      onLogInClick={signInHandler}
      onSignUpClick={signUpHandler}
    />
  )
}
