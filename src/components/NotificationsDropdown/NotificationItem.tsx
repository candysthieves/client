'use client'

import { Typography } from '@candy.thieves/ui-kit-lumos'
import { useRef } from 'react'
import type { AppNotification } from '@/lib/model'
import { useMarkAsViewed } from '@/lib/hooks'
import s from './NotificationsDropdown.module.scss'

type Props = {
  notification: AppNotification
  onRead: (id: string) => void
}

export const NotificationItem = ({ notification, onRead }: Props) => {
  const itemRef = useRef<HTMLDivElement>(null)
  useMarkAsViewed(itemRef, !notification.isRead, () => onRead(notification.id))

  return (
    <div ref={itemRef} className={s.item}>
      <div className={s.itemHeader}>
        <Typography variant={'body3'}>{notification.title}</Typography>
        {!notification.isRead && (
          <Typography variant={'caption1'} color={'var(--color-accent-500)'}>
            Новое
          </Typography>
        )}
      </div>
      <Typography variant={'body1'}>{notification.message}</Typography>
      <Typography variant={'caption1'} color={'var(--color-light-900)'} className={s.date}>
        {notification.createdAt}
      </Typography>
    </div>
  )
}
