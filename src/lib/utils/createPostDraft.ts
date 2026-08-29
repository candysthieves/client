import type { CreatePostState } from '@/features/createPost'
import { POST_DRAFT_LS_KEY } from '@/constants'

type DraftFile = {
  file: string
  name: string
  type: string
  lastModified: number
}

type PostDraft = Omit<CreatePostState, 'files'> & {
  files: DraftFile[]
}

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)

    reader.readAsDataURL(file)
  })

const dataUrlToFile = async (dataUrl: string, name: string, type: string, lastModified: number) => {
  const response = await fetch(dataUrl)
  const blob = await response.blob()

  return new File([blob], name, {
    type,
    lastModified,
  })
}

export const savePostDraft = async (state: CreatePostState): Promise<void> => {
  const files = await Promise.all(
    state.files.map(async ({ file }) => ({
      file: await fileToDataUrl(file),
      name: file.name,
      type: file.type,
      lastModified: file.lastModified,
    }))
  )

  const draft: PostDraft = {
    step: state.step,
    files,
    currentFileIndex: state.currentFileIndex,
    description: state.description,
    locations: state.locations,
  }

  localStorage.setItem(POST_DRAFT_LS_KEY, JSON.stringify(draft))
}

export const loadPostDraft = async (): Promise<CreatePostState | null> => {
  const draft = localStorage.getItem(POST_DRAFT_LS_KEY)

  if (!draft) {
    return null
  }

  const parsedDraft = JSON.parse(draft) as PostDraft

  const files = await Promise.all(
    parsedDraft.files.map(async ({ file, name, type, lastModified }) => {
      const restoredFile = await dataUrlToFile(file, name, type, lastModified)

      return {
        file: restoredFile,
        url: URL.createObjectURL(restoredFile),
      }
    })
  )

  return {
    ...parsedDraft,
    files,
    step: 'crop',
  }
}
