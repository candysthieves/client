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

// SOLUTION WITH SUCCESS TOAST: 'You have unread notifications'

// 'use client'
//
// import { useQueryClient } from '@tanstack/react-query'
// import { useCallback } from 'react'
// import { ToastError, ToastSuccess } from '@/components'
// import { socket } from '@/lib/api/socket/socket'
// import { notificationMessageTotalCountResponseSchema } from '@/lib/model/notifications.schemas'
// import { notificationKeys } from '@/lib/notifications'
//
// export function useRequestUnreadCount() {
//   const queryClient = useQueryClient()
//
//   return useCallback(() => {
//     if (!socket.connected) return
//
//     socket.emit('notifications:unread-count', (response: unknown) => {
//       const result = notificationMessageTotalCountResponseSchema.safeParse(response)
//
//       if (!result.success) {
//         ToastError({
//           title: 'Invalid unread count payload',
//           messages: result.error.issues.map(issue => ({
//             field: issue.path.join('.'),
//             message: issue.message,
//           })),
//         })
//
//         return
//       }
//
//       const newCount = result.data.data.count
//
//       const previousCount = queryClient.getQueryData<{ count: number }>(
//         notificationKeys.unreadCount()
//       )
//
//       queryClient.setQueryData(notificationKeys.unreadCount(), result.data.data)
//
//       if (previousCount && newCount > previousCount.count) {
//         ToastSuccess({
//           title: 'New notification',
//           message: 'You have unread notifications',
//         })
//       }
//     })
//   }, [queryClient])
// }
