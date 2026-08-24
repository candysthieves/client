'use client'

import { Button, Modal, Typography } from '@candy.thieves/ui-kit-lumos'
import s from './DeletePostModal.module.scss'

type DeletePostModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export const DeletePostModal = ({ open, onClose, onConfirm }: DeletePostModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      modalTitle={'Delete Post'}
      size={'s'}
      showHeader
      showCloseButton
    >
      <div className={s.content}>
        <Typography variant={'subtitle1'} color={'var(--color-light-100)'}>
          Are you sure you want to delete this post?
        </Typography>

        <div className={s.controls}>
          <Button variant={'secondary'} onClick={onConfirm}>
            Yes
          </Button>
          <Button variant={'primary'} onClick={onClose}>
            No
          </Button>
        </div>
      </div>
    </Modal>
  )
}
