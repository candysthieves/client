'use client'

import { Typography } from '@candy.thieves/ui-kit-lumos'
import type { Post } from '@/mocks/posts'
import { DeletedPostCard } from './DeletedPostCard'
import s from './DeletedPosts.module.scss'

type DeletedPostsProps = {
  posts: Post[]
  userId: string
}

export const DeletedPosts = ({ posts, userId }: DeletedPostsProps) => {
  if (posts.length === 0) {
    return (
      <section className={s.empty} aria-label={'Recently deleted posts'}>
        <Typography variant={'h2'} color={'var(--color-light-100)'} align={'center'}>
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
      {posts.map(post => {
        const deletionDate = new Date(post.willBeDeletedIn!)

        return (
          <DeletedPostCard
            key={post.postId}
            post={post}
            deletionDate={deletionDate}
            href={`/profile/${userId}?postId=${post.postId}`}
          />
        )
      })}
    </section>
  )
}
