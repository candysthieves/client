import { z } from 'zod'

export const notificationMessageTotalCountSchema = z.object({
  count: z.number().int().nonnegative(),
})

export const notificationMessageTotalCountResponseSchema = z.object({
  data: notificationMessageTotalCountSchema,
  error: z.string().nullable(),
})

export const notificationTypeSchema = z.enum(['PAYMENT', 'MESSAGE'], {
  message: 'Invalid notification message type in websocket notification response',
}) // TODO check later with backend

export const notificationMessageSchema = z.object({
  id: z.uuid(),
  userId: z.string(),
  type: notificationTypeSchema,
  title: z.string(),
  message: z.string(),
  isRead: z.boolean(),
  readAt: z.string().nullable(),
  createdAt: z.string(),
})

export const notificationMessageResponseSchema = z.object({
  items: z.array(notificationMessageSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
})
