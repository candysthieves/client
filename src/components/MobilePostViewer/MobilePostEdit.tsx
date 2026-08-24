'use client'

import { Avatar, TextArea, Typography } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import { useState } from 'react'
import s from './MobilePostEdit.module.scss'
import { Post } from './mockData'

type Props = {
  post: Post
  onCancel: () => void
  onSave: (description: string) => void
}

export const MobilePostEdit = ({ post, onCancel, onSave }: Props) => {
  const [description, setDescription] = useState(post.description ?? '')

  return (
    <div className={s.edit}>
      <header className={s.editHeader}>
        <button type={'button'} className={`typography-h3 ${s.headerButton}`} onClick={onCancel}>
          Cancel
        </button>

        <Typography variant={'h2'}>Edit Post</Typography>

        <button
          type={'button'}
          className={`typography-h3 ${s.headerButton} ${s.saveButton}`}
          onClick={() => onSave(description)}
        >
          Save
        </button>
      </header>

      <div className={s.editImage}>
        <div className={s.imageFrame}>
          <Image
            src={post.images[0].url}
            alt={post.description || 'Post'}
            width={post.images[0].width ?? 986}
            height={post.images[0].height ?? 1130}
            className={s.postImage}
          />
        </div>
      </div>
      <div className={s.editContent}>
        <div className={s.editAuthor}>
          <Avatar userName={post.userName} size={'s'} delayMs={0} />

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
      </div>
    </div>
  )
}
