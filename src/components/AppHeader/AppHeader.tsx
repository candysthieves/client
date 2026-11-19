'use client'

import { Header } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { LogoutModal, NotificationsDropdown } from '@/components'
import { useAuth } from '@/lib/hooks/useAuth'
import { useMarkNotificationsAsRead, useNotifications } from '@/lib/notifications'
import { mobileHeaderItems } from '@/shared/navigation/mobileHeaderItems'

export const AppHeader = () => {
  const { isAuthenticated } = useAuth()
  const { data: notifications = [], isLoading, isError } = useNotifications()
  const { mutate: markAsRead } = useMarkNotificationsAsRead()
  const router = useRouter()
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const notificationsRef = useRef<HTMLDivElement>(null)

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
    setIsNotificationsOpen(prev => !prev)
  }

  useEffect(() => {
    if (!isNotificationsOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsNotificationsOpen(false)
      }
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (!notificationsRef.current?.contains(e.target as Node)) {
        setIsNotificationsOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isNotificationsOpen])

  return (
    <>
      <div ref={notificationsRef}>
        <Header
          isAuthenticated={isAuthenticated}
          mobileAuthenticatedMenuItems={authenticatedMenuItems}
          onNotificationClick={notificationClickHandler}
          onLogInClick={signInHandler}
          onSignUpClick={signUpHandler}
          linkTag={Link}
        />
        {isNotificationsOpen && (
          <NotificationsDropdown
            notifications={notifications}
            onRead={markAsRead}
            isLoading={isLoading}
            isError={isError}
          />
        )}
      </div>
      <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </>
  )
}
