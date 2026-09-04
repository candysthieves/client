import { Button, Typography } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@/mocks/posts'
import s from './DeletedPostCard.module.scss'

type DeletedPostCardProps = {
  post: Post
  deletionDate: Date
  href: string
}

const getRemainingTime = (deletionDate: Date) => {
  const remainingMilliseconds = Math.max(0, deletionDate.getTime() - Date.now())
  const remainingMinutes = Math.floor(remainingMilliseconds / 60_000)
  const hours = Math.floor(remainingMinutes / 60)
  const minutes = remainingMinutes % 60

  return `${hours} h ${minutes} min left`
}

export const DeletedPostCard = ({ post, deletionDate, href }: DeletedPostCardProps) => (
  <article className={s.card}>
    <Link className={s.postLink} href={href} aria-label={'Open deleted post'}>
      <Image
        src={post.preview.url}
        alt={post.description ?? 'Deleted post'}
        fill
        sizes={'(max-width: 360px) calc(100vw - 30px), 226px'}
        className={s.image}
      />

      <div className={s.overlay} aria-hidden={'true'} />
    </Link>

    <Typography className={s.badge} variant={'subtitle1'}>
      Deleted
    </Typography>

    <div className={s.actions}>
      <Typography className={s.clock} variant={'body1'}>
        Clock
      </Typography>

      <Typography className={s.remainingTime} variant={'h3'}>
        {getRemainingTime(deletionDate)}
      </Typography>

      <div className={s.restoreButton}>
        <Button type={'button'} variant={'primary'}>
          Restore
        </Button>
      </div>

      <div className={s.deleteButton}>
        <Button type={'button'} variant={'text'}>
          Delete
        </Button>
      </div>
    </div>
  </article>
)
