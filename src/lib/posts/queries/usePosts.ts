import { useQuery } from '@tanstack/react-query'
import type { Post } from '@/mocks/posts'
import { getUserPosts } from '@/lib/api'
import { profileKeys } from '@/lib/profile'

export const usePosts = (userId?: string) =>
  useQuery({
    queryKey: profileKeys.posts(userId ?? ''),
    queryFn: () => getUserPosts(userId!),
    enabled: Boolean(userId),
    select: response =>
      response.items.map<Post>(post => {
        const fallbackImage = { url: '/post-placeholder.svg' }

        return {
          postId: post.id,
          description: post.description,
          images: post.images.length > 0 ? post.images : [fallbackImage],
          preview: post.preview ?? post.images[0] ?? fallbackImage,
          userId: userId!,
          userName: '',
          createdAt: post.createdAt,
          willBeDeletedIn: post.willBeDeleted ? new Date(post.willBeDeleted) : null,
        }
      }),
  })
