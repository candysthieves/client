'use client'

import { Button, Modal, Typography } from '@candy.thieves/ui-kit-lumos'
import s from './ConfirmCloseCreatePostModal.module.scss'

type Props = {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmCloseCreatePostModal = ({ open, onConfirm, onCancel }: Props) => {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      modalTitle={'Close'}
      size={'s'}
      showHeader
      className={s.modal}
    >
      <div className={s.confirmation}>
        <Typography variant={'subtitle1'} color={'var(--color-light-100)'}>
          Do you really want to close the creation of a publication? If you close everything will be
          deleted
        </Typography>

        <div className={s.controls}>
          <Button type={'button'} variant={'outlined'} onClick={onCancel}>
            Discard
          </Button>

          <Button type={'button'} variant={'primary'} onClick={onConfirm}>
            Save draft
          </Button>
        </div>
      </div>
    </Modal>
  )
}
