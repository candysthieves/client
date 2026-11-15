'use client'

import { Scroll, Typography } from '@candy.thieves/ui-kit-lumos'
import { NotificationMessage, NOTIFICATIONS_TITLE } from '@/lib/model'
import { NotificationItem } from './NotificationItem'
import s from './NotificationsDropdown.module.scss'

type Props = {
  notifications: NotificationMessage[]
  onRead: (id: string) => void
}

export const NotificationsDropdown = ({ notifications, onRead }: Props) => {
  return (
    <div className={s.anchor}>
      <div className={s.panel}>
        <Typography variant={'h3'}>{NOTIFICATIONS_TITLE}</Typography>
        <div className={s.list}>
          <Scroll orientation={'vertical'}>
            {notifications.map(item => (
              <NotificationItem key={item.id} notification={item} onRead={onRead} />
            ))}
          </Scroll>
        </div>
      </div>
    </div>
  )
}
