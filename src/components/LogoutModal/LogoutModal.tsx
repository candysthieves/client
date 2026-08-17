'use client'

import { Button, Modal, Typography } from '@candy.thieves/ui-kit-lumos'
import { useRouter } from 'next/navigation'
import { type MouseEvent, useState } from 'react'
import { ToastWarning } from '@/components/Toast/Toast'
import { logout } from '@/lib/api/auth'
import { ACCESS_TOKEN_LS_KEY } from '@/lib/model/constants/constants'
import s from './LogoutModal.module.css'

type LogoutModalProps = {
  trigger: (onClick: (e?: MouseEvent<HTMLButtonElement>) => void) => React.ReactNode
  onSuccess?: () => void
}

export const LogoutModal = ({ trigger, onSuccess }: LogoutModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const openModal = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    setIsOpen(true)
  }

  const closeModal = () => setIsOpen(false)

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
      {trigger(openModal)}
      <Modal
        open={isOpen}
        onClose={closeModal}
        modalTitle={'Log Out'}
        size={'s'}
        showHeader
        showCloseButton
      >
        <div className={s.content}>
          <Typography variant={'subtitle1'} color={'var(--color-light-100)'}>
            Are you really want to log out of your account?
          </Typography>
          <div className={s.controls}>
            <Button variant={'primary'} onClick={handleLogout}>
              Ok
            </Button>
            <Button variant={'secondary'} onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
