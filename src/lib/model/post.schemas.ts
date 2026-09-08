import { z } from 'zod'
import { MAX_FILE_SIZE } from '@/constants'

export const locationSchema = z.object({
  fileId: z.uuid(),
  address: z.string(),
})

export const postFileSchema = z.object({
  id: z.uuid(),
  file: z.instanceof(File),
  url: z.url(),
  originalUrl: z.url(),
})

export const draftPostFileSchema = z.object({
  file: z.instanceof(File),
})

export const imageSchema = z.object({
  fileId: z.uuid(),
  url: z.url(),
  width: z.number().nonnegative(),
  height: z.number().nonnegative(),
})

export const addPostStateSchema = z.object({
  files: z.array(postFileSchema),
  currentFileIndex: z.number().int().nonnegative(),
  step: z.enum(['crop', 'publication', 'upload']),
  description: z.string().max(500),
  locations: z.array(locationSchema),
})

export const addPostRequestSchema = z.object({
  files: z.array(z.instanceof(File)),
  description: z.string().max(500),
  locations: z.array(locationSchema),
})

export const addPostResponseSchema = z.object({
  postId: z.uuid(),
})

export const authorSchema = z.object({
  id: z.uuid(),
  username: z.string(),
})

export const postDetailsSchema = z.object({
  id: z.uuid(),
  description: z.string().max(500),
  images: z.array(imageSchema),
  preview: imageSchema,
  createdAt: z.string(), // or z.date().nullable()
  author: authorSchema,
  isOwner: z.boolean(),
})

export const postImageSchema = z
  .instanceof(File)
  .refine(
    file => ['image/png', 'image/jpeg'].includes(file.type),
    'Only PNG and JPEG images are allowed'
  )
  .refine(file => file.size <= MAX_FILE_SIZE, 'Image size must not exceed 300 kB')

export const postCreatedEventSchema = z.object({
  postId: z.uuid(),
})

// Temporary used
export const postPreviewSchema = z.object({
  url: z.url(),
})

export const imageInPostSchema = z.object({
  url: z.url(),
  width: z.number().nonnegative(),
  height: z.number().nonnegative(),
  // add id
}) // see usage in PostImagesCarousel

export const postSchema = z.object({
  postId: z.uuid(),
  description: z.string().max(500).optional(),
  images: z.array(imageInPostSchema), // change to z.array(imageSchema)
  preview: postPreviewSchema, // change to imageSchema
  userId: z.uuid(),
  userName: z.string(),
  createdAt: z.string(), // or z.date().nullable()
  willBeDeletedIn: z.date().nullable(),
  // add necessary fields
})

export const commentSchema = z.object({
  id: z.string().min(1, 'Comment ID is required'), // change to z.uuid()
  username: z.string(),
  avatarUrl: z.url().optional(),
  text: z.string().min(1, 'Comment text is required').max(500, 'Comment is too long'),
  createdAt: z.string(), // or z.date().nullable()
  likesCount: z.number().int().nonnegative().optional(),
})
