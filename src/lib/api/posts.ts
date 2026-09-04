import type { Post } from '@/mocks/posts'
import { AddPostRequest } from '@/features/createPost'
import { request } from '@/lib/api/request'

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

export const addPost = async (data: AddPostRequest) => {
  const formData = new FormData()

  formData.append('description', data.description)
  data.files.forEach(file => {
    formData.append('files', file)
  })
  formData.append('locations', JSON.stringify(data.locations))

  return request<void>('/posts', {
    method: 'POST',
    body: formData,
  })
}

export const getPosts = () => apiClient<Post[]>('/posts')

export const deletePost = (postId: string) =>
  apiClient<void>(`/posts/${postId}`, {
    method: 'DELETE',
  })
