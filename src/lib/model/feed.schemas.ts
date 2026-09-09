import { z } from 'zod'
import { imageMediaSchema } from '@/lib/model/post.schemas'

export const feedPostAuthorSchema = z.object({
  id: z.uuid(),
  username: z.string(),
})

export const feedPostSchema = z.object({
  id: z.uuid(),
  description: z.string().optional(),
  images: z.array(imageMediaSchema),
  preview: imageMediaSchema,
  createdAt: z.string(),
  willBeDeleted: z.string().nullable(),
  author: feedPostAuthorSchema,
})

export const feedPostsResponseSchema = z.object({
  items: z.array(feedPostSchema),
  nextCursor: z.string().nullable(),
  hasNextPage: z.boolean(),
})
