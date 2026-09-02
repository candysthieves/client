'use client'

import { Button, Modal, Typography } from '@candy.thieves/ui-kit-lumos'
import s from './ConfirmCloseModal.module.scss'

type Props = {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmCloseModal = ({ open, onConfirm, onCancel }: Props) => {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      modalTitle={'Close post'}
      size={'m'}
      showHeader
      className={s.modal}
      data-blurred-backdrop={'true'}
    >
      <div className={s.confirmation}>
        <Typography variant={'subtitle1'} color={'var(--color-light-100)'}>
          Do you really want to finish editing? If you close the changes you have made will not be
          saved.
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
