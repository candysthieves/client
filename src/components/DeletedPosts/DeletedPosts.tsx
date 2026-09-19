'use client'

import { Typography } from '@candy.thieves/ui-kit-lumos'
import type { Post } from '@/lib/model'
import { DeletedPostCard } from './DeletedPostCard'
import s from './DeletedPosts.module.scss'

type DeletedPostsProps = {
  posts: Post[]
  userId: string
  isError?: boolean
  isLoading?: boolean
}

export const DeletedPosts = ({ posts, userId, isError, isLoading }: DeletedPostsProps) => {
  if (isLoading) {
    return (
      <section className={s.empty} aria-live={'polite'}>
        <Typography variant={'body1'} color={'var(--color-light-900)'} align={'center'}>
          Loading deleted posts...
        </Typography>
      </section>
    )
  }

  if (isError) {
    return (
      <section className={s.empty} role={'alert'}>
        <Typography
          className={s.emptyTitle}
          variant={'h2'}
          color={'var(--color-light-100)'}
          align={'center'}
        >
          Unable to load deleted posts
        </Typography>

        <Typography variant={'body1'} color={'var(--color-light-900)'} align={'center'}>
          Please try again later.
        </Typography>
      </section>
    )
  }

  if (posts.length === 0) {
    return (
      <section className={s.empty} aria-label={'Recently deleted posts'}>
        <Typography
          className={s.emptyTitle}
          variant={'h2'}
          color={'var(--color-light-100)'}
          align={'center'}
        >
          No recently deleted posts
        </Typography>

        <Typography variant={'body1'} color={'var(--color-light-900)'} align={'center'}>
          Deleted posts will appear here.
        </Typography>
      </section>
    )
  }

  return (
    <section className={s.container} aria-label={'Recently deleted posts'}>
      {posts.map(post => (
        <DeletedPostCard
          key={post.id}
          post={post}
          userId={userId}
          deletionDate={new Date(post.willBeDeleted!)}
          href={`/profile/${userId}?postId=${post.id}&type=deleted`}
        />
      ))}
    </section>
  )
}
