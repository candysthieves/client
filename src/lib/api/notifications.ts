import { request } from '@/lib/api/request'
import { requestValidated } from '@/lib/api/requestValidated'
import { notificationMessageResponseSchema, NotificationMessageResponseSchema } from '@/lib/model'

type GetNotificationsParams = {
  pageSize?: number
  cursor?: string
}

export const getAllNotifications = (
  { pageSize, cursor }: GetNotificationsParams = {},
  init?: RequestInit
): Promise<NotificationMessageResponseSchema> => {
  const searchParams = new URLSearchParams()

  if (pageSize !== undefined) {
    searchParams.set('pageSize', String(pageSize))
  }

  if (cursor !== undefined) {
    searchParams.set('cursor', cursor)
  }

  const query = searchParams.toString()
  const resultQuery = query ? `?${query}` : ''

  return requestValidated(
    `/notifications/all${resultQuery}`,
    notificationMessageResponseSchema,
    init
  )
}

export const markNotificationsAsRead = (ids: string[]): Promise<void> =>
  request<void>('/notifications/mark-as-read', {
    method: 'PATCH',
    body: JSON.stringify({ ids }),
  })
