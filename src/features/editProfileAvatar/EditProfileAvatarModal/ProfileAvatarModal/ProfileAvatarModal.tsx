'use client'

import { clsx, Modal } from '@candy.thieves/ui-kit-lumos'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useRef, useState } from 'react'
import { ToastError, ToastSuccess, ToastWarning } from '@/components'
import { EditProfileAvatarState } from '@/features/createPost'
import { avatarKeys, useUpdateAvatar } from '@/lib/avatar'
import { postImageSchema } from '@/lib/model'
import { PreviewStep, UploadAvatarStep } from '../../steps'
import s from './ProfileAvatarModal.module.scss'

export const initialProfileAvatarState: EditProfileAvatarState = {
  step: 'upload',
  file: null,
}

type ProfileAvatarModalProps = {
  open: boolean
  onClose: () => void
  onAvatarUpdated: () => void
}

export const ProfileAvatarModal = ({ open, onClose, onAvatarUpdated }: ProfileAvatarModalProps) => {
  const { mutate: updateAvatar, isPending } = useUpdateAvatar()
  const queryClient = useQueryClient()

  const [state, setState] = useState<EditProfileAvatarState>(initialProfileAvatarState)
  const [isProcessing, setIsProcessing] = useState(false)
  const isEditing = isPending || isProcessing

  // const cropStepApiRef = useRef<CropStepApi | null>(null)
  const editingAvatarIdRef = useRef<null | string>(null)

  const isFullSize = state.step !== 'upload'
  const modalSize = 'm'

  // Set state to initial condition onClose modal window
  const closeCreation = useCallback(() => {
    if (state.file) {
      URL.revokeObjectURL(state.file.url)
    }

    setState(prev => ({ ...prev, step: 'upload', file: null }))

    onClose()
  }, [state.file, onClose])

  // Upload file selection step
  const handleFileSelected = (file: File) => {
    const result = postImageSchema.safeParse(file)
    if (!result.success) {
      ToastWarning({
        title: 'Invalid file',
        message: result.error.issues[0].message,
      })

      return
    }

    const url = URL.createObjectURL(file)

    setState(prev => ({
      ...prev,
      file: {
        file,
        url,
        originalUrl: url,
        id: crypto.randomUUID(),
      },
      step: 'preview',
    }))
  }

  // Update (send) new avatar file to the server
  const handleUpdateAvatarFile = useCallback(
    (newFile: File) => {
      // Prepare data to send
      const avatarData = {
        file: newFile,
      }

      updateAvatar(avatarData, {
        onSuccess: ({ userId }) => {
          editingAvatarIdRef.current = userId
          setIsProcessing(true)
        },
        onError: () => {
          ToastError({
            title: 'Avatar update Error',
            messages: 'Failed to update avatar',
          })
        },
      })
    },
    [updateAvatar]
  )

  // Invalidate GET new avatar request when SSE message came successfully, then close modal window
  const handleAvatarEdited = useCallback(
    async (userId: string) => {
      if (userId !== editingAvatarIdRef.current) {
        return
      }

      editingAvatarIdRef.current = null

      onAvatarUpdated() // разрешаем запрос useAvatar

      await queryClient.invalidateQueries({
        queryKey: avatarKeys.avatar(),
      })

      setIsProcessing(false)

      ToastSuccess({
        title: 'Success!',
        message: 'Your avatar has been updated',
      })

      closeCreation()
    },
    [onAvatarUpdated, closeCreation, queryClient]
  )

  // ConfirmDeleteProfileAvatarModal handlers
  const handleCloseClick = () => {
    if (isEditing) {
      return
    }
    closeCreation()
  }

  const handleOutsideClick = (event: Event) => {
    event.preventDefault()
    handleCloseClick()
  }

  const renderStep = () => {
    switch (state.step) {
      case 'upload':
        return <UploadAvatarStep onFileSelected={handleFileSelected} />

      case 'preview':
        return (
          <PreviewStep
            file={state.file}
            updateAvatarFile={handleUpdateAvatarFile}
            onAvatarUpdated={handleAvatarEdited}
            isPublishing={isEditing}
            // apiRef={cropStepApiRef}
          />
        )
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseClick}
        modalTitle={'Add Photo'}
        showCloseButton
        showHeader
        size={modalSize}
        onInteractOutside={handleOutsideClick}
        className={clsx(s.modal, s[`modal-${modalSize}`])}
        fullSize={isFullSize}
      >
        <div className={s.container}>{renderStep()}</div>
      </Modal>
    </>
  )
}
