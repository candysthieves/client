import { z } from 'zod'
import { imageSchema } from './image.schemas'
import { postSchema } from './post.schemas'

export const viewerStatusSchema = z.enum(['owner', 'user', 'friend'])

export const profilePostSchema = postSchema.extend({
  willBeDeleted: z.string().nullable(),
})

export const profilePostsResponseSchema = z.object({
  items: z.array(profilePostSchema),
  nextCursor: z.string().nullable(),
  hasNextPage: z.boolean(),
  viewerStatus: viewerStatusSchema,
})

export const userProfileSchema = z.object({
  id: z.uuid(),
  username: z.string(),
  description: z.string().nullable(),
  avatarUrl: imageSchema.nullable(),
  avatarPreviewUrl: imageSchema.nullable(),
  followersCount: z.number(),
  followingCount: z.number(),
  publicationsCount: z.number(),
  viewerStatus: viewerStatusSchema,
})
