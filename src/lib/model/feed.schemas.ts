import { z } from 'zod'
import { profileMediaSchema } from './profile.schemas'

export const feedPostAuthorSchema = z.object({
  id: z.string(),
  username: z.string(),
})

export const feedPostSchema = z.object({
  id: z.string(),
  description: z.string().optional(),
  images: z.array(profileMediaSchema),
  preview: profileMediaSchema,
  createdAt: z.string(),
  willBeDeleted: z.string().nullable(),
  author: feedPostAuthorSchema,
})

export const feedPostsResponseSchema = z.object({
  items: z.array(feedPostSchema),
  nextCursor: z.string().nullable(),
  hasNextPage: z.boolean(),
})
