'use client'

import { Avatar, Button, Close, Modal, TextArea, Typography } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import { useState } from 'react'
import type { Post } from '@/components/PostDetailsModal/PostDetailsModal.mock'
import s from './EditPostModal.module.scss'

type Props = {
  post: Post
  open: boolean
  onClose: () => void
  onCancel: () => void
  onSave: (description: string) => void
}

export const EditPostModal = ({ post, open, onClose, onCancel, onSave }: Props) => {
  const [description, setDescription] = useState(post.description ?? '')

  const handleSave = () => {
    onSave(description)
  }

  return (
    <Modal open={open} onClose={onClose} size={'xl'} fullSize className={s.modal}>
      <div className={s.container}>
        <div className={s.header}>
          <Typography variant={'subtitle2'}>Edit Post</Typography>

          <button type={'button'} aria-label={'Close'} onClick={onClose} className={s.closeButton}>
            <Close size={24} />
          </button>
        </div>

        <div className={s.imageSection}>
          <Image
            src={post.images[0].url}
            alt={post.description || 'Post'}
            width={post.images[0].width ?? 986}
            height={post.images[0].height ?? 1130}
            className={s.postImage}
          />
        </div>

        <div className={s.editSection}>
          <div className={s.user}>
            <Avatar userName={post.userName} src={post.avatarUrl} size={'s'} delayMs={0} />

            <Typography variant={'subtitle2'}>{post.userName}</Typography>
          </div>

          <div className={s.descriptionSection}>
            <TextArea
              label={'Add publication descriptions'}
              value={description}
              onChange={event => setDescription(event.target.value)}
              maxLength={500}
              className={s.descriptionInput}
            />

            <Typography variant={'caption1'} color={'var(--color-light-900)'} className={s.counter}>
              {description.length}/500
            </Typography>
          </div>

          <div className={s.actions}>
            <Button type={'button'} variant={'text'} onClick={onCancel}>
              Cancel
            </Button>

            <Button type={'button'} variant={'primary'} onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
