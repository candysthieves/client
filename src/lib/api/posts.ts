import type { ProfilePost } from '@/lib/model'
import type { Post } from '@/mocks/posts'
import { AddPostRequest } from '@/features/createPost'
import { request } from '@/lib/api/request'
import { profilePostsResponseSchema } from '@/lib/model'

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

const mapProfilePost = (post: ProfilePost, userId: string): Post => ({
  postId: post.id,
  description: post.description,
  images: post.images,
  preview: post.preview,
  userId,
  userName: '',
  createdAt: post.createdAt,
  willBeDeletedIn: post.willBeDeleted ? new Date(post.willBeDeleted) : null,
})

export const getPosts = async (userId: string): Promise<Post[]> => {
  const response = await request<unknown>(`/users/${encodeURIComponent(userId)}/posts?limit=20`)
  const { items } = profilePostsResponseSchema.parse(response)

  return items.map(post => mapProfilePost(post, userId))
}

export const getDeletedPosts = async (userId: string): Promise<Post[]> => {
  const response = await request<unknown>(
    `/users/${encodeURIComponent(userId)}/deleted-posts?limit=20`
  )
  const { items } = profilePostsResponseSchema.parse(response)

  return items.map(post => mapProfilePost(post, userId))
}

export const deletePost = (postId: string) =>
  request<void>(`/posts/${postId}/soft-delete`, {
    method: 'DELETE',
  })

export const restorePost = (postId: string) =>
  request<void>(`/posts/${postId}/restore`, {
    method: 'POST',
  })

export const hardDeletePost = (postId: string) =>
  request<void>(`/posts/${postId}/hard-delete`, {
    method: 'DELETE',
  })

export const updatePost = (postId: string, description: string) =>
  request<void>(`/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({ description }),
  })
