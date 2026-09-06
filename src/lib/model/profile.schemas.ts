import { z } from 'zod'
import { postImageSchema } from './post.schemas'

export const userProfileSchema = z.object({
  id: z.string(),
  username: z.string(),
  description: z.string(),
  avatarUrl: postImageSchema,
  avatarPreviewUrl: postImageSchema,
  followersCount: z.number(),
  followingCount: z.number(),
  publicationsCount: z.number(),
  isOwner: z.boolean(),
})
