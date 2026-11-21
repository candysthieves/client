'use client'

import { Header } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LogoutModal } from '@/components'
import { useUnreadCount } from '@/lib/hooks'
import { useAuth } from '@/lib/hooks/useAuth'
import { mobileHeaderItems } from '@/shared/navigation/mobileHeaderItems'

export const AppHeader = () => {
  const { isAuthenticated } = useAuth()
  const { data: unreadCount } = useUnreadCount()
  const router = useRouter()
  const [logoutOpen, setLogoutOpen] = useState(false)

  const signInHandler = () => {
    router.push('/sign-in')
  }

  const signUpHandler = () => {
    router.push('/sign-up')
  }

  const authenticatedMenuItems = mobileHeaderItems.map(item =>
    item.id === 'logOut' ? { ...item, onSelect: () => setLogoutOpen(true) } : item
  )

  const notificationClickHandler = () => {
    console.log('notificationClickHandler fired')
  }

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        mobileAuthenticatedMenuItems={authenticatedMenuItems}
        onLogInClick={signInHandler}
        onSignUpClick={signUpHandler}
        linkTag={Link}
        notificationCount={unreadCount.count}
        onNotificationClick={notificationClickHandler}
      />
      <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </>
  )
}
