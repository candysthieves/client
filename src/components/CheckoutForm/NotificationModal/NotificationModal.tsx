'use client'

import { Button, Modal, Typography } from '@candy.thieves/ui-kit-lumos'
import { PAYMENT_ERROR_NOTIFICATION, PAYMENT_SUCCESS_NOTIFICATION } from '@/constants'
import { PaymentStatus } from '@/lib/model'
import s from './NotificationModal.module.scss'

type NotificationModalProps = {
  open: boolean
  status: PaymentStatus
  onConfirm: () => void
  onCloseClick: () => void
}

export const NotificationModal = ({
  open,
  onConfirm,
  onCloseClick,
  status,
}: NotificationModalProps) => {
  const paymentMessage =
    status === 'Success' ? PAYMENT_SUCCESS_NOTIFICATION : PAYMENT_ERROR_NOTIFICATION

  return (
    <Modal
      open={open}
      onClose={onCloseClick}
      modalTitle={status}
      size={'s'}
      showHeader
      className={s.modal}
    >
      <div className={s.notification}>
        <Typography variant={'subtitle1'} color={'var(--color-light-100)'}>
          {paymentMessage}
        </Typography>

        <div className={s.controls}>
          <Button type={'button'} variant={'primary'} fullWidth onClick={onConfirm}>
            OK
          </Button>
        </div>
      </div>
    </Modal>
  )
}
