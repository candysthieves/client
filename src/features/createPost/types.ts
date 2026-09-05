import z from 'zod'
import {
  AddPostRequestSchema,
  AddPostResponseSchema,
  AddPostStateSchema,
  DraftPostFileSchema,
  LocationSchema,
  PostCreatedEventSchema,
  PostFileSchema,
} from '@/lib/model'

// Posts
export type Location = z.infer<typeof LocationSchema>
export type PostFile = z.infer<typeof PostFileSchema>
export type DraftPostFile = z.infer<typeof DraftPostFileSchema>

export type AddPostState = z.infer<typeof AddPostStateSchema>
// type AddPostState = {
//   step: CreatePostStep
//   files: {
//     id: string
//     file: File
//     url: string
//   }[]
//   currentFileIndex: number
//   description: string
//   locations: Location[]
// }

export type CreatePostStep = z.infer<typeof AddPostStateSchema>['step']
// type CreatePostStep = 'crop' | 'publication' | 'upload'

export type AddPostRequest = z.infer<typeof AddPostRequestSchema>
// type AddPostRequest = {
//   files: File[]
//   description: string
//   locations: Location[]
// }
export type AddPostResponse = z.infer<typeof AddPostResponseSchema>
// {
//   "postId": string
// }

export enum AspectRatio {
  ORIGINAL = 'original', // original
  PORTRAIT = 'portrait', // 4:5
  SQUARE = 'square', // 1:1
  WIDESCREEN = 'widescreen', // 16:9
}

export type PostCreatedEvent = z.infer<typeof PostCreatedEventSchema>
