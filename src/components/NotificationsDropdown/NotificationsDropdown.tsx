'use client'

import { Scroll, Typography } from '@candy.thieves/ui-kit-lumos'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef } from 'react'
import { NotificationMessage, NOTIFICATIONS_TITLE } from '@/lib/model'
import { updateNotificationsCache } from '@/lib/notifications'
import { NotificationItem } from './NotificationItem'
import s from './NotificationsDropdown.module.scss'

type Props = {
  notifications: NotificationMessage[]
  onRead: (ids: string[], onError?: () => void) => void
  isLoading?: boolean
  isError?: boolean
}

export const NotificationsDropdown = ({
  notifications,
  onRead,
  isLoading = false,
  isError = false,
}: Props) => {
  const queryClient = useQueryClient()
  const pendingIdsRef = useRef<string[]>([])
  const viewedIdsRef = useRef<Set<string>>(new Set())
  const onReadRef = useRef(onRead)

  useEffect(() => {
    onReadRef.current = onRead
  }, [onRead])

  const sendBatch = useCallback(
    (ids: string[]) => {
      if (ids.length === 0) return

      pendingIdsRef.current = []

      onReadRef.current(ids, () => {
        pendingIdsRef.current = [...new Set([...ids, ...pendingIdsRef.current])]

        updateNotificationsCache(queryClient, notification =>
          ids.includes(notification.id) ? { ...notification, isRead: false } : notification
        )
      })
    },
    [queryClient]
  )

  useEffect(
    () => () => {
      sendBatch([...pendingIdsRef.current])
    },
    [sendBatch]
  )

  const handleViewed = (id: string) => {
    if (viewedIdsRef.current.has(id)) return

    viewedIdsRef.current.add(id)
    pendingIdsRef.current.push(id)

    updateNotificationsCache(queryClient, notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    )

    const unreadIds = notifications
      .filter(notification => !notification.isRead || viewedIdsRef.current.has(notification.id))
      .map(notification => notification.id)
    const allUnreadViewed =
      unreadIds.length > 0 && unreadIds.every(unreadId => viewedIdsRef.current.has(unreadId))

    if (allUnreadViewed) {
      sendBatch([...pendingIdsRef.current])
    }
  }

  return (
    <div className={s.anchor}>
      <div className={s.panel}>
        <Typography variant={'h3'}>{NOTIFICATIONS_TITLE}</Typography>
        <div className={s.list}>
          {isLoading ? (
            <Typography variant={'body1'} color={'var(--color-light-900)'} align={'center'}>
              Loading notifications...
            </Typography>
          ) : isError ? (
            <Typography variant={'body1'} color={'var(--color-light-900)'} align={'center'}>
              Failed to load notifications
            </Typography>
          ) : notifications.length === 0 ? (
            <Typography variant={'body1'} color={'var(--color-light-900)'} align={'center'}>
              No notifications
            </Typography>
          ) : (
            <Scroll orientation={'vertical'}>
              {notifications.map(item => (
                <NotificationItem key={item.id} notification={item} onRead={handleViewed} />
              ))}
            </Scroll>
          )}
        </div>
      </div>
    </div>
  )
}
