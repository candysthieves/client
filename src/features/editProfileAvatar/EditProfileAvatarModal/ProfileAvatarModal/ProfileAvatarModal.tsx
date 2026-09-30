'use client'

import { clsx, Modal } from '@candy.thieves/ui-kit-lumos'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import { ToastWarning } from '@/components'
import { EditProfileAvatarState } from '@/features/createPost'
import { CropStepApi } from '@/features/createPost/steps/CropStep/CropImage/CropImage'
import { postImageSchema } from '@/lib/model'
import { useAddPost } from '@/lib/posts'
import { PreviewStep, UploadAvatarStep } from '../../steps'
import s from './ProfileAvatarModal.module.scss'

export const initialProfileAvatarState: EditProfileAvatarState = {
  step: 'upload',
  file: null,
}

type ProfileAvatarModalProps = {
  open: boolean
  onClose: () => void
}

export const ProfileAvatarModal = ({ open, onClose }: ProfileAvatarModalProps) => {
  const { mutate: addPost, isPending } = useAddPost()
  // const router = useRouter()
  // const queryClient = useQueryClient()

  const [state, setState] = useState<EditProfileAvatarState>(initialProfileAvatarState)
  const [isCreationOpen, setIsCreationOpen] = useState(true)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const isPublishing = isPending || isProcessing
  const cropStepApiRef = useRef<CropStepApi | null>(null)
  const publishingPostIdRef = useRef<null | string>(null)

  // const openConfirm = () => setIsConfirmOpen(true)
  // const closeConfirm = () => setIsConfirmOpen(false)

  const isFullSize = state.step !== 'upload'
  const modalSize = 'm'

  const closeCreation = useCallback(() => {
    // Release object URL
    if (state.file) {
      URL.revokeObjectURL(state.file.url)
    }

    onClose()
  }, [state.file, onClose])

  // Upload file step
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

  // Set updated cropped file to state
  const handleUpdateFile = (newFile: File) => {
    // !!!!!!!!!!!!!!! SEND FILE
    // setState(prev => {
    //   const currentFile = prev.file
    //   const newUrl = URL.createObjectURL(newFile)
    //
    //   if (currentFile && (currentFile.url !== currentFile.originalUrl)) {
    //     URL.revokeObjectURL(currentFile.url)
    //   }
    //
    //   return {
    //     ...prev,
    //     files: prev.files.map((file, index) =>
    //       index === fileIndex
    //         ? {
    //             ...file,
    //             file: newFile,
    //             url: newUrl,
    //           }
    //         : file
    //     ),
    //   }
    // })
  }

  // ConfirmDeleteProfileAvatarModal handlers
  const handleCloseClick = () => {
    if (isPublishing) {
      return
    }

    closeCreation()
  }

  const handleOutsideClick = (event: Event) => {
    event.preventDefault()
    handleCloseClick()
  }

  // const handlePostCreated = useCallback(
  //   async (postId: string) => {
  //     if (postId !== publishingPostIdRef.current) {
  //       return
  //     }
  //
  //     publishingPostIdRef.current = null
  //     setIsProcessing(false)
  //
  //     // if (userId) {
  //     //   await queryClient.invalidateQueries({
  //     //     queryKey: profileKeys.detail(userId),
  //     //   })
  //     // }
  //
  //     ToastSuccess({
  //       title: 'Success!',
  //       message: 'Your post has been published',
  //     })
  //
  //     clearPostDraft()
  //     closeCreation()
  //   },
  //   // [closeCreation, queryClient, userId]
  //   [closeCreation, queryClient]
  // )

  const handlePublish = useCallback(() => {
    // // Prepare data to send
    // const postData = {
    //   files: state.files.map(({ file }) => file),
    //   description: state.description,
    //   locations: state.locations,
    // }
    //
    // addPost(postData, {
    //   onSuccess: ({ postId }) => {
    //     publishingPostIdRef.current = postId
    //     setIsProcessing(true)
    //   },
    //   onError: error => {
    //     ToastError({
    //       title: 'Post publish Error',
    //       messages: 'Failed to publish post',
    //     })
    //   },
    // })
  }, [state, addPost])

  const renderStep = () => {
    switch (state.step) {
      case 'upload':
        return <UploadAvatarStep onFileSelected={handleFileSelected} />

      case 'preview':
        return (
          <PreviewStep
            file={state.file}
            updateAvatarFile={handleUpdateFile}
            onClose={handleCloseClick}
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
