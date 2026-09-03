import type { AddPostRequest } from '@/features/createPost'
import type { Post } from '@/mocks/posts'
import { NEXT_PUBLIC_POSTS_API_URL } from '@/constants'
import { request } from '@/lib/api/request'

type ApiPostImage = {
  fileId: string
  url: string
  width: number
  height: number
}

type ApiPost = {
  id: string
  description: string
  images: ApiPostImage[]
  preview: ApiPostImage | null
  createdAt: string
  willBeDeleted: null | string
}

type GetPostsResponse = {
  items: ApiPost[]
  nextCursor: null | string
  hasNextPage: boolean
}

async function apiClient<T>(path: string, init: RequestInit = {}): Promise<T> {
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

export const getPosts = async (): Promise<Post[]> => {
  const { items } = await request<GetPostsResponse>('/posts?limit=20')

  return items
    .filter(
      (post): post is ApiPost & { preview: ApiPostImage } =>
        post.preview !== null && post.images.length > 0
    )
    .map(post => ({
      postId: post.id,
      description: post.description,
      images: post.images,
      preview: post.preview,
      // TODO: Replace temporary author values when GET /posts returns author data.
      userId: '',
      userName: 'User',
      createdAt: post.createdAt,
      willBeDeletedIn: post.willBeDeleted ? new Date(post.willBeDeleted) : null,
    }))
}

export const addPost = (data: AddPostRequest) =>
  apiClient<void>('/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const deletePost = (postId: string) =>
  request<void>(`/posts/${postId}/soft-delete`, {
    method: 'DELETE',
  })
