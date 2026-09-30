import { AddPostRequest, AddPostResponse } from '@/features/createPost'
import { request } from '@/lib/api/request'
import { requestValidated } from '@/lib/api/requestValidated'
import { addPostResponseSchema, Post, postSchema } from '@/lib/model'

// TEMPORARY
const API_BASE_URL = 'http://localhost:8080'

export const addPost = (data: AddPostRequest): Promise<AddPostResponse> => {
  const formData = new FormData()

  formData.append('description', data.description)
  data.files.forEach(file => {
    formData.append('files', file)
  })
  formData.append('locations', JSON.stringify(data.locations))

  return requestValidated('/posts', addPostResponseSchema, {
    method: 'POST',
    body: formData,
  })
}

// export const getPosts = () => apiClient<Post[]>('/posts')

export const getPostById = (postId: string) =>
  requestValidated(`/posts/${encodeURIComponent(postId)}`, postSchema)

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
