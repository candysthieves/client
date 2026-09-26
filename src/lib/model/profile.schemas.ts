import { z } from 'zod'
import { imageMediaSchema, postSchema } from './post.schemas'

export const profilePostSchema = postSchema.extend({
  willBeDeleted: z.string().nullable(),
})

export const profilePostsResponseSchema = z.object({
  items: z.array(profilePostSchema),
  nextCursor: z.string().nullable(),
  hasNextPage: z.boolean(),
  viewerStatus: z.enum(['owner', 'user', 'friend']),
})

export const userProfileSchema = z.object({
  id: z.uuid(),
  username: z.string(),
  description: z.string().nullable(),
  avatarUrl: imageMediaSchema.nullable(),
  avatarPreviewUrl: imageMediaSchema.nullable(),
  followersCount: z.number(),
  followingCount: z.number(),
  publicationsCount: z.number(),
  viewerStatus: z.enum(['owner', 'user', 'friend']),
})
