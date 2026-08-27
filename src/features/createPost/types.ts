export type CreatePostStep = 'crop' | 'publication' | 'upload'

export type CreatePostState = {
  files: File[]
  currentFileIndex: number
  step: CreatePostStep
  description: string
  // location?: Location
  // crop
  // zoom
  // aspectRatio
}
