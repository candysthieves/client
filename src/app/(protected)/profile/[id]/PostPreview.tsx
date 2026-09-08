'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Post } from '@/features/createPost'
import s from './ProfileClient.module.scss'

type PostPreviewProps = {
  index: number
  post: Post
  userId: string
}

export function PostPreview({ index, post, userId }: PostPreviewProps) {
  const [hasImageError, setHasImageError] = useState(false)
  const previewUrl = post.preview?.url ?? ''
  const showPlaceholder = hasImageError || !previewUrl

  return (
    <Link
      href={`/profile/${userId}?postId=${post.id}`}
      aria-label={`Open post ${index + 1}`}
      className={s.postPreview}
    >
      {showPlaceholder ? (
        <span className={s.postPlaceholder} aria-hidden={'true'}>
          {post.description.slice(0, 1).toUpperCase() ?? 'P'}
        </span>
      ) : (
        <Image
          src={previewUrl}
          alt={post.description}
          fill
          sizes={'(max-width: 640px) 50vw, (max-width: 768px) 33vw, 234px'}
          className={s.postImage}
          onError={() => setHasImageError(true)}
        />
      )}
    </Link>
  )
}
