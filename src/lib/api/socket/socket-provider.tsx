// 'use client'
//
// import { useQueryClient } from '@tanstack/react-query'
// import { ReactNode, useEffect } from 'react'
// import { ToastError } from '@/components'
// import { socket } from '@/lib/api/socket/socket'
// import { useLogout } from '@/lib/auth'
// import {
//   notificationMessageTotalCountResponseSchema,
//   notificationMessageTotalCountSchema,
// } from '@/lib/model/notifications.schemas'
// import { notificationKeys } from '@/lib/notifications'
// import { isAccessTokenError, refreshAccessToken } from '@/lib/utils'
//
// export function SocketProvider({ children }: { children: ReactNode }) {
//   const queryClient = useQueryClient()
//   const { mutate: logout } = useLogout()
//
//   useEffect(() => {
//     let isMounted = true
//     let socketRefreshPromise: null | Promise<string> = null
//
//     const handleUnreadCount = (response: unknown) => {
//       if (!isMounted) return
//
//       // TODO change later to type field when chat messages will be added
//       const result = notificationMessageTotalCountResponseSchema.safeParse(response)
//
//       if (!result.success) {
//         console.error('Invalid unread count payload:', result.error)
//         ToastError({
//           title: 'Invalid unread count payload',
//           messages: result.error && '',
//         })
//         return
//       }
//
//       queryClient.setQueryData(notificationKeys.unreadCount(), result.data.data)
//     }
//
//     const handleConnectError = async (error: Error & { data?: unknown }) => {
//       if (!isAccessTokenError(error.data)) return
//
//       if (socketRefreshPromise) return
//
//       socketRefreshPromise = refreshAccessToken()
//
//       try {
//         const newAccessToken = await socketRefreshPromise
//
//         if (!isMounted) return
//
//         socket.auth = {
//           token: newAccessToken,
//         }
//
//         socket.connect()
//       } catch (error) {
//         if (isMounted) {
//           console.error('Socket authentication failed:', error)
//           logout()
//         }
//       } finally {
//         socketRefreshPromise = null
//       }
//     }
//
//     socket.on('connect_error', handleConnectError)
//
//     socket.connect()
//     socket.emit('notifications:unread-count', handleUnreadCount)
//
//     return () => {
//       isMounted = false
//       socket.off('connect_error', handleConnectError)
//
//       socket.disconnect()
//     }
//   }, [logout, queryClient])
//
//   return children
// }

'use client'

import { ReactNode, useEffect } from 'react'
import { socket } from '@/lib/api/socket/socket'
import { useLogout } from '@/lib/auth'
import { useRequestUnreadCount } from '@/lib/hooks'
import { ACCESS_TOKEN_LS_KEY } from '@/lib/model'
import { isAccessTokenError, refreshAccessToken } from '@/lib/utils'

export function SocketProvider({ children }: { children: ReactNode }) {
  const requestUnreadCount = useRequestUnreadCount()
  const { mutate: logout } = useLogout()

  useEffect(() => {
    let isMounted = true
    let socketRefreshPromise: null | Promise<string> = null

    const handleConnect = () => {
      // TODO refactor to Switch logic or add hooks when chat messages will be added
      requestUnreadCount()
    }

    const handleConnectError = async (error: Error & { data?: unknown }) => {
      if (!isAccessTokenError(error.data)) return

      if (socketRefreshPromise) return

      socketRefreshPromise = refreshAccessToken()

      try {
        const newAccessToken = await socketRefreshPromise

        if (!isMounted) return

        socket.auth = {
          token: newAccessToken,
        }

        socket.connect()
      } catch (error) {
        if (isMounted) {
          console.error('Socket authentication failed:', error)
          logout()
        }
      } finally {
        socketRefreshPromise = null
      }
    }

    socket.on('connect', handleConnect)
    socket.on('connect_error', handleConnectError)

    // Берём актуальный токен после авторизации, а не тот,
    // который мог быть прочитан при инициализации модуля socket.ts
    socket.auth = {
      token: localStorage.getItem(ACCESS_TOKEN_LS_KEY),
    }

    socket.connect()

    return () => {
      isMounted = false

      socket.off('connect', handleConnect)
      socket.off('connect_error', handleConnectError)

      socket.disconnect()
    }
  }, [logout, requestUnreadCount])

  return children
}

// SocketProvider монтируется после успешной авторизации
// Socket.IO подключается через Websocket с access token
// Отправляется запрос unread-count
// получает ответ через Socket.IO callback - Backend возвращает { data: { count: number } }
// Frontend валидирует response через Zod
// Счётчик уведомлений сохраняется в TanStack Query cache (queryClient.setQueryData() обновляет cache)
// AppHeader автоматически перерисовывается
// Header получает notificationCount={7}
// Error:
// 1 При ошибке access token выполняется refreshAccessToken()
// 2 При успешном обновлении токена Socket.IO переподключается
// 3 При неудачном обновлении refresh token вызывается logout()
