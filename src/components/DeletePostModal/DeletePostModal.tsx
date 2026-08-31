'use client'

import { Button, Modal, Typography } from '@candy.thieves/ui-kit-lumos'
import s from './DeletePostModal.module.scss'

type DeletePostModalProps = {
  isDeleting?: boolean
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export const DeletePostModal = ({
  isDeleting = false,
  open,
  onClose,
  onConfirm,
}: DeletePostModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      modalTitle={'Delete Post'}
      size={'s'}
      showHeader
      showCloseButton
      className={s.modal}
      data-blurred-backdrop={'true'}
    >
      <div className={s.content}>
        <Typography variant={'subtitle1'} color={'var(--color-light-100)'} className={s.message}>
          Are you sure you want to delete this post?
        </Typography>

        <div className={s.controls}>
          <Button type={'button'} variant={'outlined'} onClick={onConfirm} disabled={isDeleting}>
            Yes
          </Button>
          <Button type={'button'} variant={'primary'} onClick={onClose} disabled={isDeleting}>
            No
          </Button>
        </div>
      </div>
    </Modal>
  )
}
