'use client'

import { Scroll, Typography } from '@candy.thieves/ui-kit-lumos'
import type { AppNotification } from '@/lib/model'

type Props = {
  notifications: AppNotification[]
}

export const NotificationsDropdown = ({ notifications }: Props) => {
  return (
    <div>
      <Typography variant={'subtitle2'}>Уведомления</Typography>
      <Scroll orientation={'vertical'}>
        {notifications.map(item => (
          <div key={item.id}>
            <div>
              <Typography variant={'body3'}>{item.title}</Typography>
              {!item.isRead && <Typography variant={'caption1'}>Новое</Typography>}
            </div>
            <Typography variant={'body1'}>{item.message}</Typography>
            <Typography variant={'caption1'}>{item.createdAt}</Typography>
          </div>
        ))}
      </Scroll>
    </div>
  )
}
