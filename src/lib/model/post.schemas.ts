import { z } from 'zod'
import { MAX_FILE_SIZE } from '@/constants'

export const LocationSchema = z.object({
  id: z.string(),
  address: z.string(),
})

export const PostFileSchema = z.object({
  id: z.string(),
  file: z.instanceof(File),
  url: z.url(),
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

export const postImageSchema = z
  .instanceof(File)
  .refine(
    file => ['image/png', 'image/jpeg'].includes(file.type),
    'Only PNG and JPEG images are allowed'
  )
  .refine(file => file.size <= MAX_FILE_SIZE, 'Image size must not exceed 500 kB')
