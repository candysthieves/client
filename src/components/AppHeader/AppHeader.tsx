'use client'

import { Header } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { LogoutModal, NotificationsDropdown } from '@/components'
import { useRequestUnreadCount, useUnreadCount } from '@/lib/hooks'
import { useAuth } from '@/lib/hooks/useAuth'
import { useMarkNotificationsAsRead, useNotifications } from '@/lib/notifications'
import { mobileHeaderItems } from '@/shared/navigation/mobileHeaderItems'

export const AppHeader = () => {
  const { isAuthenticated } = useAuth()
  const { data: unreadCount } = useUnreadCount()
  const requestUnreadCount = useRequestUnreadCount()
  const {
    data: notifications = [],
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useNotifications()
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

  const loadMoreNotificationsHandler = useCallback(() => void fetchNextPage(), [fetchNextPage])
  const notificationReadHandler = (ids: string[], onError?: () => void) => {
    markAsRead(ids, {
      onSuccess: () => {
        requestUnreadCount()
      },
      onError,
    })
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
          notificationCount={unreadCount.count}
          onNotificationClick={notificationClickHandler}
          onLogInClick={signInHandler}
          onSignUpClick={signUpHandler}
          linkTag={Link}
        />
        {isNotificationsOpen && (
          <NotificationsDropdown
            notifications={notifications}
            onRead={notificationReadHandler}
            onLoadMore={loadMoreNotificationsHandler}
            hasNextPage={hasNextPage}
            isLoading={isLoading}
            isError={isError}
            isLoadingNextPage={isFetchingNextPage}
            isLoadMoreError={isFetchNextPageError}
          />
        )}
      </div>
      <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </>
  )
}
