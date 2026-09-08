import type { Post } from '@/mocks/posts'
import { DeletedPostItem } from '@/lib/model'

// Статическая заглушка в одном экземпляре в памяти
const FALLBACK_IMAGE = {
  fileId: 'placeholder',
  url: '/post-placeholder.svg',
  width: 300,
  height: 300,
}

export const mapDeletedPostToClient = (
  post: DeletedPostItem,
  userId: string,
  fallbackUsername?: string
): Post => {
  const validImages = post.images.length > 0 ? post.images : [FALLBACK_IMAGE]

  return {
    postId: post.id,
    description: post.description ?? '',
    images: validImages,
    preview: post.preview ?? post.images[0] ?? FALLBACK_IMAGE,
    userId,
    userName: post.author.username ?? fallbackUsername ?? userId,
    createdAt: post.createdAt,
    willBeDeletedIn: post.willBeDeleted ? new Date(post.willBeDeleted) : null,
  }
}
