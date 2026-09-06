import { z } from 'zod'

export const postImageSchema = z.object({
  fileId: z.string(),
  url: z.url(),
  width: z.number(),
  height: z.number(),
})

export const profilePostSchema = z.object({
  id: z.string(),
  description: z.string(),
  images: z.array(postImageSchema),
  preview: postImageSchema.nullable(),
  createdAt: z.string(),
  willBeDeleted: z.string().nullable(),
})

export const profilePostsResponseSchema = z.object({
  items: z.array(profilePostSchema),
  nextCursor: z.string().nullable(),
  hasNextPage: z.boolean(),
  isOwner: z.boolean(),
})

export const deletedPostSchema = profilePostSchema.extend({
  willBeDeleted: z.string(),
  author: z.object({
    id: z.string(),
    username: z.string(),
  }),
})

export const deletedPostsResponseSchema = z.object({
  items: z.array(deletedPostSchema),
  nextCursor: z.string().nullable(),
  hasNextPage: z.boolean(),
})

export const LocationSchema = z.object({
  id: z.string(),
  address: z.string(),
})

export const PostFileSchema = z.object({
  id: z.string(),
  file: z.instanceof(File),
  url: z.url(),
  originalUrl: z.url(),
})

export const DraftPostFileSchema = z.object({
  file: z.instanceof(File),
})

export const ImageSchema = z.object({
  url: z.url(),
})

export const AddPostStateSchema = z.object({
  files: z.array(PostFileSchema),
  currentFileIndex: z.number().int().nonnegative(),
  step: z.enum(['crop', 'publication', 'upload']),
  description: z.string().max(500),
  locations: z.array(LocationSchema),
})

// export const AddPostRequestSchema = z.object({
//   files: z.array(PostFileSchema),
//   description: z.string().max(500),
//   locations: z.array(LocationSchema),
//   // userId: z.string(),
//   // userName: z.string(),
// })
export const AddPostRequestSchema = z.object({
  files: z.array(z.instanceof(File)),
  description: z.string().max(500),
  locations: z.array(LocationSchema),
})
