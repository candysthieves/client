'use client'

import type { ModalProps } from '@candy.thieves/ui-kit-lumos'
import { Avatar, Button, Close, Modal, Typography } from '@candy.thieves/ui-kit-lumos'
import { useState } from 'react'
import type { Post } from '@/mocks/posts'
import { PostDescriptionEditor } from '@/components/Post/PostDescriptionEditor/PostDescriptionEditor'
import { PostImagesCarousel } from '@/components/PostImagesCarousel/PostImagesCarousel'
import { getPostImageAreaStyle } from '@/lib/utils'
import { ConfirmCloseModal } from './ConfirmCloseModal'
import s from './EditPostModal.module.scss'

type InteractOutsideEvent = Parameters<NonNullable<ModalProps['onInteractOutside']>>[0]

type Props = {
  post: Post
  open: boolean
  onClose: () => void
  onCancel: () => void
  onSave: (description: string) => void
  isSaving?: boolean
}

export const EditPostModal = ({ post, open, onClose, onCancel, onSave, isSaving }: Props) => {
  const initialDescription = post.description ?? ''
  const [description, setDescription] = useState(initialDescription)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const hasChanges = description !== initialDescription

  const handleSave = () => {
    onSave(description)
  }

  const handleCloseRequest = () => {
    if (!hasChanges) {
      onClose()

      return
    }
    setIsConfirmOpen(true)
  }

  const handleInteractOutside = (event: InteractOutsideEvent) => {
    if (!hasChanges) {
      return
    }

    event.preventDefault()
    setIsConfirmOpen(true)
  }

  const discardChangesAndClose = () => {
    setIsConfirmOpen(false)
    setDescription(initialDescription)
    onClose()
  }

  const keepEditing = () => {
    setIsConfirmOpen(false)
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseRequest}
        size={'xl'}
        fullSize
        onInteractOutside={handleInteractOutside}
        className={s.modal}
      >
        <div className={s.container} style={getPostImageAreaStyle(post.images[0])}>
          <div className={s.header}>
            <Typography variant={'subtitle2'}>Edit Post</Typography>

            <button
              type={'button'}
              aria-label={'Close'}
              onClick={handleCloseRequest}
              className={s.closeButton}
            >
              <Close size={24} />
            </button>
          </div>

          <div className={s.imageSection}>
            <PostImagesCarousel images={post.images} alt={post.description || 'Post'} />
          </div>

          <div className={s.editSection}>
            <div className={s.user}>
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

            <div className={s.actions}>
              <Button type={'button'} variant={'text'} onClick={onCancel}>
                Cancel
              </Button>

              <Button type={'button'} variant={'primary'} onClick={handleSave} disabled={isSaving}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmCloseModal
        open={isConfirmOpen}
        onConfirm={discardChangesAndClose}
        onCancel={keepEditing}
      />
    </>
  )
}
