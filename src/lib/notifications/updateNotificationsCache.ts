import type { InfiniteData, QueryClient } from '@tanstack/react-query'
import type { NotificationMessage, NotificationMessageResponseSchema } from '@/lib/model'
import { notificationKeys } from './notificationKeys'

export const updateNotificationsCache = (
  queryClient: QueryClient,
  update: (notification: NotificationMessage) => NotificationMessage
) => {
  queryClient.setQueryData<InfiniteData<NotificationMessageResponseSchema>>(
    notificationKeys.list(),
    data =>
      data && {
        ...data,
        pages: data.pages.map(page => ({ ...page, items: page.items.map(update) })),
      }
  )
}
