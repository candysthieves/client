'use client'

import { useQueryClient } from '@tanstack/react-query'
import { ReactNode, useEffect } from 'react'
import { ToastSuccess, ToastWarning } from '@/components'
import { socket } from '@/lib/api/socket/socket'
import { useLogout } from '@/lib/auth'
import { notificationMessageTotalCountSchema } from '@/lib/model/notifications.schemas'
import { notificationKeys } from '@/lib/notifications'
import { isAccessTokenError, refreshAccessToken } from '@/lib/utils'

export function SocketProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const { mutate: logout } = useLogout()

  useEffect(() => {
    let isMounted = true
    let socketRefreshPromise: null | Promise<string> = null

    const handleUnreadCount = (data: unknown) => {
      const result = notificationMessageTotalCountSchema.safeParse(data)

      if (!result.success) return

      queryClient.setQueryData(notificationKeys.unreadCount(), result.data.count)

      ToastSuccess({
        title: 'New notifications',
        message: 'You have unread notifications!',
      })
    }

    const handleConnect = () => {
      socket.emit('get_new_message') // TODO check later backend messages
    }

    const handleConnectError = async (error: Error & { data?: unknown }) => {
      if (!isAccessTokenError(error.data)) return

      if (socketRefreshPromise) return

      socketRefreshPromise = refreshAccessToken()

      try {
        await socketRefreshPromise

        if (isMounted) {
          socket.connect()
        }
      } catch (error) {
        if (isMounted) {
          console.error('Socket authentication failed:', error)
          logout()
        }
      } finally {
        socketRefreshPromise = null
      }
    }

    socket.on('new_message', handleUnreadCount)
    socket.on('connect', handleConnect) // TODO check later backend messages
    socket.on('connect_error', handleConnectError)

    socket.connect()

    return () => {
      isMounted = false
      socket.off('new_message', handleUnreadCount)
      socket.off('connect', handleConnect) // Запрос 'get_new_message' отправляю внутри connect, чтобы гарантировать, что соединение уже установлено
      socket.off('connect_error', handleConnectError)

      socket.disconnect()
    }
  }, [logout, queryClient])

  return children
}

// SocketProvider монтируется после успешной авторизации
// Socket.IO подключается с актуальным access token
// При connect отправляется get_new_message
// Backend отправляет new_message
// Frontend валидирует данные через Zod
// Счётчик Notification обновляется через queryClient.setQueryData
// При ошибке access token выполняется refreshAccessToken()
// При успехе Socket.IO переподключается
// При подтверждённой недействительности refresh token вызывается logout()
