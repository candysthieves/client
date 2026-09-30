import { AddPostRequest, AddPostResponse } from '@/features/createPost'
import { request } from '@/lib/api/request'
import { addPostResponseSchema, Post, postSchema } from '@/lib/model'

// TEMPORARY
const API_BASE_URL = 'http://localhost:8080'

export const addPost = async (data: AddPostRequest): Promise<AddPostResponse> => {
  const formData = new FormData()

  formData.append('description', data.description)
  data.files.forEach(file => {
    formData.append('files', file)
  })
  formData.append('locations', JSON.stringify(data.locations))

  const response = await request<unknown>('/posts', {
    method: 'POST',
    body: formData,
  })

  return addPostResponseSchema.parse(response)
}

// export const getPosts = () => apiClient<Post[]>('/posts')

export const getPostById = async (postId: string): Promise<Post> => {
  const response = await request<unknown>(`/posts/${encodeURIComponent(postId)}`)

  return postSchema.parse(response)
}

export const deletePost = (postId: string) =>
  request<void>(`/posts/${encodeURIComponent(postId)}/soft-delete`, {
    method: 'DELETE',
  })

export const restorePost = (postId: string) =>
  request<void>(`/posts/${encodeURIComponent(postId)}/restore`, {
    method: 'POST',
  })

export const hardDeletePost = (postId: string) =>
  request<void>(`/posts/${encodeURIComponent(postId)}/hard-delete`, {
    method: 'DELETE',
  })

export const updatePost = (postId: string, description: string) =>
  request<void>(`/posts/${encodeURIComponent(postId)}`, {
    method: 'PUT',
    body: JSON.stringify({ description }),
  })
