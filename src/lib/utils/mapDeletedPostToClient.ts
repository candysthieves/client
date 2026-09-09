import type { DeletedPostItem, Post } from '@/lib/model'

// Статическая заглушка в одном экземпляре в памяти
const FALLBACK_IMAGE = {
  fileId: 'placeholder',
  url: '/post/post-placeholder.svg',
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
    id: post.id,
    description: post.description ?? '',
    images: validImages,
    preview: post.preview ?? post.images[0] ?? FALLBACK_IMAGE,
    createdAt: post.createdAt,
    willBeDeleted: post.willBeDeleted,
    author: {
      ...post.author,
      username: post.author.username ?? fallbackUsername ?? userId,
    },
  }
}
