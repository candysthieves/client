import { AddPostRequest } from '@/features/createPost'
import { request } from '@/lib/api/request'
import { LoginRequest, LoginResponse } from '@/lib/model'

// TEMPORARY
const API_BASE_URL = 'http://localhost:8080'

async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
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
      // Если не удалось распарсить JSON
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
//     body: JSON.stringify(data),
//   })
export const addPost = async (data: AddPostRequest): Promise<void> => {
  try {
    await apiClient<void>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.error('Failed to create post:', error)
    throw error
  }
}
