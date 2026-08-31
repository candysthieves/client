'use client'

import { Button, Modal, Typography } from '@candy.thieves/ui-kit-lumos'
import { useRouter } from 'next/navigation'
import { ToastWarning } from '@/components/Toast/Toast'
import { useLogout } from '@/lib/auth'
import { clearPostDraft } from '@/lib/utils'
import s from './LogoutModal.module.css'

type LogoutModalProps = {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export const LogoutModal = ({ open, onClose, onSuccess }: LogoutModalProps) => {
  const router = useRouter()
  const { mutate: logoutUser, isPending } = useLogout()

  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: () => {
        onSuccess?.()

        ToastWarning({
          title: 'Signed out successfully',
          message: 'You have been successfully signed out. See you soon!',
        })

        // router.replace('/sign-in')
        router.replace('/')
        clearPostDraft()
      },
    })
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
            <Button variant={'primary'} onClick={handleLogout} disabled={isPending}>
              {isPending ? 'Logging out...' : 'Ok'}
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
