'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { Post } from '@/mocks/posts'
import s from './ProfileClient.module.scss'

type PostPreviewProps = {
  index: number
  post: Post
  profileId: string
}

export function PostPreview({ index, post, profileId }: PostPreviewProps) {
  const [hasImageError, setHasImageError] = useState(false)

  return (
    <Link
      href={`/profile/${profileId}?postId=${post.postId}`}
      aria-label={`Open post ${index + 1}`}
      className={s.postPreview}
    >
      {hasImageError ? (
        <span className={s.postPlaceholder} aria-hidden={'true'}>
          {post.description?.slice(0, 1).toUpperCase() ?? 'P'}
        </span>
      ) : (
        <Image
          src={post.preview.url}
          alt={post.description ?? `Post ${index + 1}`}
          fill
          sizes={
            '(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 234px'
          }
          className={s.postImage}
          onError={() => setHasImageError(true)}
        />
      )}
    </Link>
  )
}
