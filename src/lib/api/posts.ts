import type { ProfilePost } from '@/lib/model'
import type { Post } from '@/mocks/posts'
import { AddPostRequest } from '@/features/createPost'
import { request } from '@/lib/api/request'
import { deletedPostSchema, deletedPostsResponseSchema, postDetailsSchema } from '@/lib/model'

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

const mapProfilePost = (post: ProfilePost, userId: string): Post => {
  const fallbackImage = { url: '/post-placeholder.svg' }

  return {
    postId: post.id,
    description: post.description,
    images: post.images.length > 0 ? post.images : [fallbackImage],
    preview: post.preview ?? post.images[0] ?? fallbackImage,
    userId,
    userName: '',
    createdAt: post.createdAt,
    willBeDeletedIn: post.willBeDeleted ? new Date(post.willBeDeleted) : null,
  }
}

export const getDeletedPosts = async (): Promise<Post[]> => {
  const response = await request<unknown>('/posts/deleted-posts')
  const { items } = deletedPostsResponseSchema.parse(response)

  return items.map(post => ({
    ...mapProfilePost(post, post.author.id),
    userName: post.author.username,
  }))
}

export const getPost = async (postId: string, userId: string): Promise<Post> => {
  const response = await request<unknown>(`/posts/${encodeURIComponent(postId)}`)
  const post = postDetailsSchema.parse(response)

  return {
    postId: post.id,
    description: post.description,
    images: post.images,
    preview: post.preview,
    userId: post.author.id || userId,
    userName: post.author.username,
    createdAt: post.createdAt,
    willBeDeletedIn: null,
  }
}

export const getDeletedPost = async (postId: string): Promise<Post> => {
  const response = await request<unknown>(`/posts/deleted-posts/${encodeURIComponent(postId)}`)
  const post = deletedPostSchema.parse(response)

  return {
    ...mapProfilePost(post, post.author.id),
    userName: post.author.username,
  }
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
