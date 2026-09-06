import { z } from 'zod'

export const profileMediaSchema = z.object({
  fileId: z.string(),
  url: z.url(),
  width: z.number(),
  height: z.number(),
})

export const profilePostSchema = z.object({
  id: z.string(),
  description: z.string(),
  images: z.array(profileMediaSchema),
  preview: profileMediaSchema,
  createdAt: z.string(),
  willBeDeleted: z.string().nullable(),
})

export const profilePostsResponseSchema = z.object({
  items: z.array(profilePostSchema),
  nextCursor: z.string().nullable(),
  hasNextPage: z.boolean(),
  isOwner: z.boolean(),
})

export const userProfileSchema = z.object({
  id: z.string(),
  username: z.string(),
  description: z.string(),
  avatarUrl: profileMediaSchema,
  avatarPreviewUrl: profileMediaSchema,
  followersCount: z.number(),
  followingCount: z.number(),
  publicationsCount: z.number(),
  isOwner: z.boolean(),
})
