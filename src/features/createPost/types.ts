export type CreatePostStep = 'crop' | 'publication' | 'upload'

export type Location = {
  id: string
  address: string
}

export type PostFile = {
  file: File
  url: string
}

export type CreatePostState = {
  files: PostFile[]
  currentFileIndex: number
  step: CreatePostStep
  description: string
  locations: Location[]
  // crop
  // zoom
  // aspectRatio
}
