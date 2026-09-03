'use client'

import { Button, Typography } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import { usePosts } from '@/lib/posts'
import s from './DeletedPosts.module.scss'

const getRemainingTime = (willBeDeletedIn: Date) => {
  const remainingMilliseconds = Math.max(0, willBeDeletedIn.getTime() - Date.now())
  const remainingMinutes = Math.floor(remainingMilliseconds / 60_000)
  const hours = Math.floor(remainingMinutes / 60)
  const minutes = remainingMinutes % 60

  return `${hours} h ${minutes} min left`
}

export const DeletedPosts = () => {
  const { data: posts = [] } = usePosts()
  const deletedPosts = posts.filter(post => post.willBeDeletedIn)

  if (deletedPosts.length === 0) {
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
      {deletedPosts.map(post => (
        <article className={s.card} key={post.postId}>
          <Image
            src={post.preview.url}
            alt={post.description ?? 'Deleted post'}
            fill
            sizes={'(max-width: 768px) 100vw, 226px'}
            className={s.image}
          />
          <div className={s.overlay} />

          <Typography className={s.badge} variant={'subtitle1'}>
            Deleted
          </Typography>

          <div className={s.actions}>
            <span className={s.clock} aria-hidden={'true'} />
            <Typography variant={'h3'}>
              {getRemainingTime(new Date(post.willBeDeletedIn!))}
            </Typography>
            <Button type={'button'} fullWidth>
              Restore
            </Button>
            <Button type={'button'} variant={'text'}>
              Delete permanently
            </Button>
          </div>
        </article>
      ))}
    </section>
  )
}
