'use client'

import { Scroll, Typography } from '@candy.thieves/ui-kit-lumos'
import { NotificationMessage, NOTIFICATIONS_TITLE } from '@/lib/model'
import { NotificationItem } from './NotificationItem'
import s from './NotificationsDropdown.module.scss'

type Props = {
  notifications: NotificationMessage[]
  onRead: (id: string) => void
  isLoading?: boolean
  isError?: boolean
}

export const NotificationsDropdown = ({
  notifications,
  onRead,
  isLoading = false,
  isError = false,
}: Props) => {
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
                <NotificationItem key={item.id} notification={item} onRead={onRead} />
              ))}
            </Scroll>
          )}
        </div>
      </div>
    </div>
  )
}
