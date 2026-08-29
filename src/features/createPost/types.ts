import z from 'zod'
import {
  AddPostRequestSchema,
  AddPostStateSchema,
  DraftPostFileSchema,
  LocationSchema,
  PostFileSchema,
} from '@/lib/model'

// Posts
export type Location = z.infer<typeof LocationSchema>
export type PostFile = z.infer<typeof PostFileSchema>
export type DraftPostFile = z.infer<typeof DraftPostFileSchema>
// type DraftPostFile = {
//   file: File
// }

export type AddPostState = z.infer<typeof AddPostStateSchema>
// type DraftAddPostState = {
//   files: DraftPostFile[]
//   currentFileIndex: number
//   step: 'crop' | 'publication' | 'upload'
//   description: string
//   locations: Location[]
// }

export type CreatePostStep = z.infer<typeof AddPostStateSchema>['step']
// type CreatePostStep = 'crop' | 'publication' | 'upload'

export type AddPostRequest = z.infer<typeof AddPostRequestSchema>
// type AddPostRequest = {
//   files: PostFile[]
//   description: string
//   locations: Location[]
// }
