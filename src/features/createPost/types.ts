export type CreatePostStep = 'crop' | 'publication' | 'upload'

export type Location = {
  id: string
  name: string
}

export type CreatePostState = {
  files: File[]
  currentFileIndex: number
  step: CreatePostStep
  description: string
  locations: Location[]
  // crop
  // zoom
  // aspectRatio
}
