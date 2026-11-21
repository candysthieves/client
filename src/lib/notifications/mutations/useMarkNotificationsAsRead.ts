import { useMutation, useQueryClient } from '@tanstack/react-query'
import { markNotificationsAsRead } from '@/lib/api'
import { NotificationMessage } from '@/lib/model'
import { notificationKeys } from '../notificationKeys'

export const useMarkNotificationsAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => markNotificationsAsRead([id]),
    onSuccess: (_, id) => {
      queryClient.setQueryData<NotificationMessage[]>(notificationKeys.list(), notifications =>
        notifications?.map(notification =>
          notification.id === id ? { ...notification, isRead: true } : notification
        )
      )
    },
  })
}
