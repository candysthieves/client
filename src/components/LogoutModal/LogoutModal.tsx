'use client'

import { Button, Modal, Typography } from '@candy.thieves/ui-kit-lumos'
import { useRouter } from 'next/navigation'
import { ToastWarning } from '@/components/Toast/Toast'
import { logout } from '@/lib/api/auth'
import { ACCESS_TOKEN_LS_KEY } from '@/lib/model/constants/constants'
import s from './LogoutModal.module.css'

type LogoutModalProps = {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export const LogoutModal = ({ open, onClose, onSuccess }: LogoutModalProps) => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      ToastWarning({
        title: 'Signed out successfully',
        message: 'You have been successfully signed out. See you soon!',
      })
    } finally {
      localStorage.removeItem(ACCESS_TOKEN_LS_KEY)
      onSuccess?.()
      router.replace('/sign-in')
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        modalTitle={'Log Out'}
        size={'s'}
        showHeader
        showCloseButton
      >
        <div className={s.content}>
          <Typography variant={'subtitle1'} color={'var(--color-light-100)'}>
            Do you really want to log out of your account?
          </Typography>
          <div className={s.controls}>
            <Button variant={'primary'} onClick={handleLogout}>
              Ok
            </Button>
            <Button variant={'secondary'} onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
