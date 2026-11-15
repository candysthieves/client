'use client'

import { Button, Checkbox, Modal, Typography } from '@candy.thieves/ui-kit-lumos'
import { useState } from 'react'
import s from './CreatePaymentModal.module.scss'

type CreatePaymentModalProps = {
  open: boolean
  isLoading: boolean
  onConfirm: () => void
  onCloseClick?: () => void
}

export const CreatePaymentModal = ({
  open,
  isLoading,
  onConfirm,
  onCloseClick,
}: CreatePaymentModalProps) => {
  const [checked, setChecked] = useState(false)

  const onCloseHandler = () => {
    onCloseClick?.()
    setChecked(false)
  }

  const onConfirmHandler = () => {
    onConfirm()
    setChecked(false)
  }

  return (
    <Modal
      open={open}
      onClose={onCloseHandler}
      modalTitle={'Create payment'}
      size={'s'}
      showHeader
      className={s.modal}
    >
      <div className={s.confirmation}>
        <Typography variant={'subtitle1'} color={'var(--color-light-100)'}>
          Auto-renewal will be enabled with this payment. You can disable it anytime in your profile
          settings
        </Typography>

        <div className={s.controls}>
          <Checkbox
            id={'createPaymentCheckbox'}
            label={'I agree'}
            checked={checked}
            onCheckedChange={setChecked}
            className={s.checkbox}
          />

          <Button
            type={'button'}
            variant={'primary'}
            onClick={onConfirmHandler}
            disabled={!checked || isLoading}
          >
            OK
          </Button>
        </div>
      </div>
    </Modal>
  )
}
