import type { AddPostRequest } from '@/features/createPost'
import type { Post } from '@/mocks/posts'
import { NEXT_PUBLIC_POSTS_API_URL } from '@/constants'

async function postsRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${NEXT_PUBLIC_POSTS_API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...init.headers,
    },
  })

  if (!response.ok) {
    let errorMessage = `Posts server responded with status ${response.status}`

    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorData.error || errorMessage
    } catch {
      errorMessage = (await response.text()) || errorMessage
    }

    throw new Error(errorMessage)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export const getPosts = () => postsRequest<Post[]>('/posts')

export const addPost = (data: AddPostRequest) =>
  postsRequest<void>('/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const deletePost = (postId: string) =>
  postsRequest<void>(`/posts/${postId}`, {
    method: 'DELETE',
  })
