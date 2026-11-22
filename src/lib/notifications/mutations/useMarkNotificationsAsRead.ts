import { useMutation, useQueryClient } from '@tanstack/react-query'
import { markNotificationsAsRead } from '@/lib/api'
import { NotificationMessage } from '@/lib/model'
import { notificationKeys } from '../notificationKeys'

export const useMarkNotificationsAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (ids: string[]) => markNotificationsAsRead(ids),
    onSuccess: (_, ids) => {
      const readIds = new Set(ids)

      queryClient.setQueryData<NotificationMessage[]>(notificationKeys.list(), notifications =>
        notifications?.map(notification =>
          readIds.has(notification.id) ? { ...notification, isRead: true } : notification
        )
      )
    },
  })
}
