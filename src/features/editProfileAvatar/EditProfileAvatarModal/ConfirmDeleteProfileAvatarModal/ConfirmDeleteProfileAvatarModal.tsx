'use client'

import { Button, Modal, Typography } from '@candy.thieves/ui-kit-lumos'
import s from './ConfirmDeleteProfileAvatarModal.module.scss'

type ConfirmDeleteProfileAvatarModalProps = {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  onCloseClick: () => void
}

export const ConfirmDeleteProfileAvatarModal = ({
  open,
  onConfirm,
  onCancel,
  onCloseClick,
}: ConfirmDeleteProfileAvatarModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onCloseClick}
      modalTitle={'Delete Photo'}
      size={'s'}
      showHeader
      className={s.modal}
    >
      <div className={s.confirmation}>
        <Typography variant={'subtitle1'} color={'var(--color-light-100)'}>
          Are you sure you want to delete the photo?
        </Typography>

        <div className={s.controls}>
          <Button type={'button'} variant={'outlined'} onClick={onConfirm}>
            Yes
          </Button>

          <Button type={'button'} variant={'primary'} onClick={onCancel}>
            No
          </Button>
        </div>
      </div>
    </Modal>
  )
}
