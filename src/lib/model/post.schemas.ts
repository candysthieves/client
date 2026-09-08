import { z } from 'zod'
import { MAX_FILE_SIZE } from '@/constants'

export const LocationSchema = z.object({
  id: z.uuid(),
  address: z.string(),
})

export const PostFileSchema = z.object({
  id: z.uuid(),
  file: z.instanceof(File),
  url: z.url(),
  originalUrl: z.url(),
})

export const DraftPostFileSchema = z.object({
  file: z.instanceof(File),
})

export const imageSchema = z.object({
  fileId: z.uuid(),
  url: z.url(),
  width: z.number().nonnegative(),
  height: z.number().nonnegative(),
})

export const AddPostStateSchema = z.object({
  files: z.array(PostFileSchema),
  currentFileIndex: z.number().int().nonnegative(),
  step: z.enum(['crop', 'publication', 'upload']),
  description: z.string().max(500),
  locations: z.array(LocationSchema),
})

export const AddPostRequestSchema = z.object({
  files: z.array(z.instanceof(File)),
  description: z.string().max(500),
  locations: z.array(LocationSchema),
})

export const AddPostResponseSchema = z.object({
  postId: z.uuid(),
})

export const postImageSchema = z
  .instanceof(File)
  .refine(
    file => ['image/png', 'image/jpeg'].includes(file.type),
    'Only PNG and JPEG images are allowed'
  )
  .refine(file => file.size <= MAX_FILE_SIZE, 'Image size must not exceed 300 kB')

export const PostCreatedEventSchema = z.object({
  postId: z.string(),
})

export const ApiDeletedPostImageSchema = z.object({
  fileId: z.uuid(),
  url: z.url(),
  width: z.number().nonnegative(),
  height: z.number().nonnegative(),
})

// Схема для автора поста
export const ApiDeletedPostAuthorSchema = z.object({
  id: z.string(),
  username: z.string(),
})

// Схема для одного удаленного поста
export const DeletedPostItemSchema = z.object({
  id: z.string(),
  description: z.string().nullable(), // описание может быть null
  images: z.array(ApiDeletedPostImageSchema),
  preview: ApiDeletedPostImageSchema.nullable(), // превью может быть null
  createdAt: z.string(),
  willBeDeleted: z.string().nullable(), // дата окончательного удаления
  author: ApiDeletedPostAuthorSchema,
})

// Схема полного ответа сервера с курсорной пагинацией
export const GetDeletedPostsResponseSchema = z.object({
  items: z.array(DeletedPostItemSchema),
  nextCursor: z.string().nullable(),
  hasNextPage: z.boolean(),
})
