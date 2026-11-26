import { useMutation, useQueryClient } from '@tanstack/react-query'
import { markNotificationsAsRead } from '@/lib/api'
import { updateNotificationsCache } from '../updateNotificationsCache'

export const useMarkNotificationsAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (ids: string[]) => markNotificationsAsRead(ids),
    onSuccess: (_, ids) => {
      const readIds = new Set(ids)

      updateNotificationsCache(queryClient, notification =>
        readIds.has(notification.id) ? { ...notification, isRead: true } : notification
      )
    },
  })
}
