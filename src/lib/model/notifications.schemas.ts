import { z } from 'zod'

export const notificationMessageTotalCountSchema = z.object({
  count: z.number().int().nonnegative(),
})
// type: new_message
// {
//   count:3
// }

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
