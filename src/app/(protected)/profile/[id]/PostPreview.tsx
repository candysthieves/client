'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { ProfilePost } from '@/lib/model'
import s from './ProfileClient.module.scss'

type PostPreviewProps = {
  index: number
  post: ProfilePost
  userId: string
}

export function PostPreview({ index, post, userId }: PostPreviewProps) {
  const [hasImageError, setHasImageError] = useState(false)

  return (
    <Link
      href={`/profile/${userId}?postId=${post.id}`}
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
          sizes={'(max-width: 640px) 50vw, (max-width: 768px) 33vw, 234px'}
          className={s.postImage}
          onError={() => setHasImageError(true)}
        />
      )}
    </Link>
  )
}
