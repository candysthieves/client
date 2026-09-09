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

export const imageMediaSchema = z.object({
  fileId: z.uuid(),
  url: z.url(),
  width: z.number().nonnegative(),
  height: z.number().nonnegative(),
})

export const postAuthorSchema = z.object({
  id: z.uuid(),
  username: z.string(),
})

export const postSchema = z.object({
  id: z.uuid(),
  description: z.string(),
  images: z.array(imageMediaSchema),
  preview: imageMediaSchema,
  createdAt: z.string(),
  willBeDeleted: z.string().nullable().optional(),
  author: postAuthorSchema,
})

export const postDetailsSchema = postSchema.extend({
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
  postId: z.uuid('Invalid postID format in add post SSE response'),
})

export const commentSchema = z.object({
  id: z.string().min(1, 'Comment ID is required'),
  username: z.string(),
  avatarUrl: z.url().optional(),
  text: z.string().min(1, 'Comment text is required').max(500, 'Comment is too long'),
  createdAt: z.string(), // or z.date().nullable()
  likesCount: z.number().int().nonnegative().optional(),
})

export const apiDeletedPostImageSchema = z.object({
  fileId: z.uuid(),
  url: z.url(),
  width: z.number().nonnegative(),
  height: z.number().nonnegative(),
})

// Схема для автора поста
export const apiDeletedPostAuthorSchema = z.object({
  id: z.string(),
  username: z.string(),
})

// Схема для одного удаленного поста
export const deletedPostItemSchema = z.object({
  id: z.string(),
  description: z.string().nullable(), // описание может быть null
  images: z.array(apiDeletedPostImageSchema),
  preview: apiDeletedPostImageSchema.nullable(), // превью может быть null
  createdAt: z.string(),
  willBeDeleted: z.string().nullable(), // дата окончательного удаления
  author: apiDeletedPostAuthorSchema,
})

// Схема полного ответа сервера с курсорной пагинацией
export const getDeletedPostsResponseSchema = z.object({
  items: z.array(deletedPostItemSchema),
  nextCursor: z.string().nullable(),
  hasNextPage: z.boolean(),
})
