'use client'

import { Avatar, Typography } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import { useState } from 'react'
import { PostDescriptionEditor } from '@/components/Post/PostDescriptionEditor/PostDescriptionEditor'
import { Post } from '@/mocks/posts'
import s from './MobilePostEdit.module.scss'

type Props = {
  post: Post
  onCancel: () => void
  onSave: (description: string) => void
  isSaving?: boolean
}

export const MobilePostEdit = ({ post, onCancel, onSave, isSaving }: Props) => {
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
          disabled={isSaving}
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

        <PostDescriptionEditor
          value={description}
          onChange={setDescription}
          className={s.descriptionSection}
          textAreaClassName={s.descriptionInput}
          counterClassName={s.counter}
        />
      </div>
    </div>
  )
}
