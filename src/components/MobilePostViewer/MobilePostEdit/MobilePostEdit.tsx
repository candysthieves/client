'use client'

import { Avatar, Button, Typography } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import { useState } from 'react'
import type { Post, UserProfile } from '@/lib/model'
import { PostDescriptionEditor } from '@/components/Post/PostDescriptionEditor/PostDescriptionEditor'
import s from './MobilePostEdit.module.scss'

type Props = {
  post: Post
  userProfile?: UserProfile
  onCancel: () => void
  onSave: (description: string) => void
  isSaving?: boolean
}

export const MobilePostEdit = ({ post, userProfile, onCancel, onSave, isSaving }: Props) => {
  const { id: userId, username: profileUserName = userId, avatarPreviewUrl } = userProfile ?? {}

  const [description, setDescription] = useState(post.description ?? '')

  return (
    <div className={s.edit}>
      <header className={s.editHeader}>
        <Button type={'button'} className={`typography-h3 ${s.headerButton}`} onClick={onCancel}>
          Cancel
        </Button>

        <Typography variant={'h2'}>Edit Post</Typography>

        <Button
          type={'button'}
          className={`typography-h3 ${s.headerButton} ${s.saveButton}`}
          onClick={() => onSave(description)}
          disabled={isSaving}
        >
          Save
        </Button>
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
          <Avatar
            userName={profileUserName || post.author.username || ''}
            size={'s'}
            delayMs={0}
            src={avatarPreviewUrl?.url || ''} // TODO add here later avatarPreviewUrl?.url || post.author.avatarPreviewUrl?.url || ''
          />

          <Typography variant={'subtitle2'}>
            {profileUserName || post.author.username || ''}
          </Typography>
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
