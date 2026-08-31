import { AddPostRequest } from '@/features/createPost'

// TEMPORARY
const API_BASE_URL = 'http://localhost:8080'

async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  // является ли тело FormData
  const isFormData = options.body instanceof FormData

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      // Добавляем Content-Type только если это НЕ FormData
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
    ...options,
  })

  // Обработка ошибок
  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`

    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorData.error || errorMessage
    } catch {
      // ошибка парсинга JSON
      errorMessage = (await response.text()) || errorMessage
    }

    throw new Error(errorMessage)
  }

  // Для статуса 204 No Content
  if (response.status === 204) {
    return {} as T
  }

  return response.json()
}

// export const addPost = async (data: AddPostRequest) =>
//   request<void>('/posts', {
//     method: 'POST',
//     body: JSON.stringify(data), // new FormData()
//   })

// export const addPost = async (data: AddPostRequest): Promise<void> => {
//   try {
//     await apiClient<void>('/posts', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     })
//   } catch (error) {
//     console.error('Failed to create post:', error)
//     throw error
//   }
// }
export const addPost = async (data: AddPostRequest): Promise<void> => {
  try {
    const formData = new FormData()

    formData.append('description', data.description)
    formData.append('locations', JSON.stringify(data.locations))

    // Разделяем новые файлы (с File) и существующие (с url)
    const newFiles = data.files.filter(f => f.file instanceof File)
    const existingFiles = data.files.filter(f => f.url && !(f.file instanceof File))

    console.log('Total files:', data.files.length)
    console.log('New files:', newFiles.length)
    console.log('Existing files:', existingFiles.length)
    console.log(
      'New files data:',
      newFiles.map(f => ({
        name: f.file.name,
        size: f.file.size,
        type: f.file.type,
      }))
    )

    // новые файлы в FormData
    newFiles.forEach(postFile => {
      if (postFile.file instanceof File) {
        formData.append('files', postFile.file)
      }
    })

    // URLs существующих файлов как JSON
    if (existingFiles.length > 0) {
      formData.append('existingFiles', JSON.stringify(existingFiles.map(f => f.url)))
    }

    await apiClient<void>('/posts', {
      method: 'POST',
      body: formData,
    })
  } catch (error) {
    console.error('Failed to create post:', error)
    throw error
  }
}
