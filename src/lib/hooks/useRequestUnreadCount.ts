'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { ToastError } from '@/components'
import { socket } from '@/lib/api/socket/socket'
import { notificationMessageTotalCountResponseSchema } from '@/lib/model/notifications.schemas'
import { notificationKeys } from '@/lib/notifications'

export function useRequestUnreadCount() {
  const queryClient = useQueryClient()

  return useCallback(() => {
    if (!socket.connected) return

    socket.emit('notifications:unread-count', (response: unknown) => {
      const result = notificationMessageTotalCountResponseSchema.safeParse(response)

      if (!result.success) {
        ToastError({
          title: 'Invalid unread count payload',
          messages: result.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        })

        return
      }

      queryClient.setQueryData(notificationKeys.unreadCount(), result.data.data)
    })
  }, [queryClient])
}
