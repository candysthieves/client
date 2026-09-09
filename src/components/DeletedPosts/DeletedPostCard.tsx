import { Button, Clock, Typography } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Post } from '@/lib/model'
import { ConfirmDeletePostModal } from '@/components'
import { useHardDeletePost } from '@/lib/posts/mutations/useHardDeletePost'
import { useRestorePost } from '@/lib/posts/mutations/useRestorePost'
import s from './DeletedPostCard.module.scss'

type DeletedPostCardProps = {
  post: Post
  userId: string
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

export const DeletedPostCard = ({ post, userId, deletionDate, href }: DeletedPostCardProps) => {
  const { mutate: restorePost, isPending: isRestoring } = useRestorePost(userId)
  const { mutate: hardDeletePost, isPending: isDeleting } = useHardDeletePost(userId)
  const isPending = isRestoring || isDeleting
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [remainingTime, setRemainingTime] = useState(() => getRemainingTime(deletionDate))

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false)
    hardDeletePost(post.id)
  }

  useEffect(() => {
    if (isPending) {
      return
    }

    const updateRemainingTime = () => setRemainingTime(getRemainingTime(deletionDate))
    const intervalId = window.setInterval(updateRemainingTime, 60_000)

    updateRemainingTime()

    return () => window.clearInterval(intervalId)
  }, [deletionDate, isPending])

  return (
    <>
      <article className={s.card}>
        <Link className={s.postLink} href={href} aria-label={'Open deleted post'}>
          <Image
            src={post.preview.url}
            alt={post.description ?? 'Deleted post'}
            fill
            sizes={
              '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 234px'
            }
            className={s.image}
          />

          <div className={s.overlay} aria-hidden={'true'} />
        </Link>

        <Typography className={s.badge} variant={'caption1'}>
          Deleted
        </Typography>

        <div className={s.actions}>
          <Clock
            size={32}
            color={'var(--color-light-100)'}
            svgProps={{ 'aria-hidden': true, className: s.clockIcon }}
          />

          <Typography className={s.remainingTime} variant={'h3'}>
            {remainingTime}
          </Typography>

          <div className={s.restoreButton}>
            <Button
              type={'button'}
              variant={'outlined'}
              disabled={isPending}
              onClick={() => restorePost(post.id)}
            >
              {isRestoring ? 'Restoring...' : 'Restore'}
            </Button>
          </div>

          <div className={s.deleteButton}>
            <Button
              type={'button'}
              variant={'text'}
              disabled={isPending}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
              Delete
            </Button>
          </div>
        </div>
      </article>

      <ConfirmDeletePostModal
        isDeleting={isDeleting}
        isPermanent
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
