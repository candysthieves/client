import z from 'zod'
import {
  addPostRequestSchema,
  addPostResponseSchema,
  addPostStateSchema,
  commentSchema,
  draftPostFileSchema,
  imageInPostSchema,
  locationSchema,
  postCreatedEventSchema,
  postFileSchema,
  postSchema,
} from '@/lib/model'

// Posts
export type Location = z.infer<typeof locationSchema>
export type PostFile = z.infer<typeof postFileSchema>
export type DraftPostFile = z.infer<typeof draftPostFileSchema>

export type AddPostState = z.infer<typeof addPostStateSchema>
// type AddPostState = {
//   step: CreatePostStep
//   files: {
//     id: string
//     file: File
//     url: string
//   }[]
//   currentFileIndex: number
//   step: 'crop' | 'publication' | 'upload'
//   description: string
//   locations: Location[]
// }

export type CreatePostStep = z.infer<typeof addPostStateSchema>['step']
// type CreatePostStep = 'crop' | 'publication' | 'upload'

export type AddPostRequest = z.infer<typeof addPostRequestSchema>
// type AddPostRequest = {
//   files: File[]
//   description: string
//   locations: Location[]
// }
export type AddPostResponse = z.infer<typeof addPostResponseSchema>
// {
//   "postId": string
// }

export enum AspectRatio {
  PORTRAIT = 'portrait', // 4:5
  SQUARE = 'square', // 1:1
  WIDESCREEN = 'widescreen', // 16:9
}

export type PostCreatedEvent = z.infer<typeof postCreatedEventSchema>

export type PostImage = z.infer<typeof imageInPostSchema>
export type Post = z.infer<typeof postSchema>
export type Comment = z.infer<typeof commentSchema>
