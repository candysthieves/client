import type { Post } from '@/mocks/posts'
import { NEXT_PUBLIC_POSTS_API_URL } from '@/constants'

type DeletePostResponse = {
  message: string
  deletedPost: Post
}

async function postsRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${NEXT_PUBLIC_POSTS_API_URL}${path}`, init)

  if (!response.ok) {
    throw new Error(`Posts server responded with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

export const getPosts = () => postsRequest<Post[]>('/posts')

export const deletePost = (postId: string) =>
  postsRequest<DeletePostResponse>(`/posts/${postId}`, {
    method: 'DELETE',
  })
