'use client'

import { Button, Modal, Typography } from '@candy.thieves/ui-kit-lumos'
import {
  PAYMENT_ERROR_NOTIFICATION,
  PAYMENT_MODAL_ERROR_BUTTON_TEXT,
  PAYMENT_MODAL_SUCCESS_BUTTON_TEXT,
  PAYMENT_SUCCESS_NOTIFICATION,
} from '@/constants'
import { ProcessedPaymentStatus } from '@/lib/model'
import s from './PaymentProcessedNotificationModal.module.scss'

type PaymentProcessedNotificationModalProps = {
  open: boolean
  status: ProcessedPaymentStatus
  onConfirm: () => void
  onCloseClick: () => void
}

export const PaymentProcessedNotificationModal = ({
  open,
  status,
  onConfirm,
  onCloseClick,
}: PaymentProcessedNotificationModalProps) => {
  const paymentMessage =
    status === 'completed' ? PAYMENT_SUCCESS_NOTIFICATION : PAYMENT_ERROR_NOTIFICATION
  const modalSubmitButtonTitle =
    status === 'completed' ? PAYMENT_MODAL_SUCCESS_BUTTON_TEXT : PAYMENT_MODAL_ERROR_BUTTON_TEXT

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
            {modalSubmitButtonTitle}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
