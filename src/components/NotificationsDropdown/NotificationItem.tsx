'use client'

import { Typography } from '@candy.thieves/ui-kit-lumos'
import { useRef } from 'react'
import { useMarkAsViewed } from '@/lib/hooks'
import { NOTIFICATION_NEW_LABEL, NotificationMessage } from '@/lib/model'
import { formatNotificationDate } from '@/lib/utils'
import s from './NotificationsDropdown.module.scss'

type Props = {
  notification: NotificationMessage
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
            {NOTIFICATION_NEW_LABEL}
          </Typography>
        )}
      </div>
      <Typography variant={'body1'}>{notification.message}</Typography>
      <Typography variant={'caption1'} color={'var(--color-light-900)'} className={s.date}>
        {formatNotificationDate(notification.createdAt)}
      </Typography>
    </div>
  )
}
