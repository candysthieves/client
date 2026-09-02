'use client'

// const currentFile = files[currentFileIndex]

import { clsx, Modal } from '@candy.thieves/ui-kit-lumos'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { ToastError, ToastSuccess } from '@/components'
import {
  ConfirmCloseCreatePostModal,
  CreatePostModalHeader,
} from '@/features/createPost/CreatePostModal'
import { useAuth } from '@/lib/hooks/useAuth'
import { useAddPost } from '@/lib/posts'
import { clearPostDraft, isPostDraftExist, loadPostDraft, savePostDraft } from '@/lib/utils'
import { CropStep, PublicationStep, UploadStep } from '../../steps'
import { AddPostState, CreatePostStep, Location } from '../../types'
import s from './CreatePostModal.module.scss'

export const initialCreatePostState: AddPostState = {
  step: 'upload',
  files: [],
  currentFileIndex: 0,
  description: '',
  locations: [],
}

type CreatePostModalProps = {
  userId: string
}

export const CreatePostModal = ({ userId }: CreatePostModalProps) => {
  const { user } = useAuth() // CHANGE LATER TO FETCHED USER DATA (with avatar src)
  const { mutate: addPost, isPending: isPublishing } = useAddPost()
  const router = useRouter()

  const [state, setState] = useState<AddPostState>(initialCreatePostState)
  const [isCreationOpen, setIsCreationOpen] = useState(true)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const closeCreationModal = () => setIsCreationOpen(false)
  const openConfirm = () => setIsConfirmOpen(true)
  const closeConfirm = () => setIsConfirmOpen(false)

  const isShowCloseButton = state.step === 'upload'
  const isFullSize = state.step !== 'upload'
  const modalSize = state.step === 'publication' ? 'xl' : 'm'
  const fileUploadsQuantity = state.files.length
  const hasFileUploads = fileUploadsQuantity > 0

  // const [fileUrls, setFileUrls] = useState<string[]>([])

  // Добавить очистку если потребуется
  // useEffect(() => {
  //   return () => {
  //     state.files.forEach(({ url }) => {
  //       URL.revokeObjectURL(url)
  //     })
  //   }
  // }, [state.files])

  const handleClose = useCallback(() => {
    router.push(`/profile/${userId}`)
  }, [router, userId])

  const closeCreation = useCallback(() => {
    closeCreationModal()
    closeConfirm()

    // Release object URLs
    state.files.forEach(({ url }) => {
      URL.revokeObjectURL(url)
    })
    handleClose()
  }, [state.files, handleClose])

  // Upload file step
  const handleFileSelected = (file: File) => {
    const url = URL.createObjectURL(file)

    setState(prev => ({
      ...prev,
      files: [
        ...prev.files,
        {
          file,
          url,
        },
      ],
      step: 'crop',
    }))
  }

  // Header controls
  const changeStep = (step: CreatePostStep) => {
    setState(prev => ({
      ...prev,
      step,
    }))
  }

  // Publication slide-show
  const handlePreviousFile = () => {
    setState(prev => ({
      ...prev,
      currentFileIndex: Math.max(0, prev.currentFileIndex - 1),
    }))
  }
  const handleNextFile = () => {
    setState(prev => ({
      ...prev,
      currentFileIndex: Math.min(prev.files.length - 1, prev.currentFileIndex + 1),
    }))
  }

  // Publication add description
  const handleDescriptionChange = (description: string) => {
    setState(prev => ({
      ...prev,
      description,
    }))
  }

  // Crop image - add new image
  const addImageHandler = () => {
    changeStep('upload')
  }

  // ConfirmCloseCreatePostModal handlers
  const handleConfirm = async () => {
    await saveToDraftHandler()
    closeCreation()
  }

  const handleOutsideClick = (event: Event) => {
    event.preventDefault()
    // if (!hasPostDraft) {
    //   closeCreationModal()
    //   handleClose()
    //   return
    // }

    openConfirm()
  }

  const onLocationChange = useCallback((locations: Location[]) => {
    setState(prev => ({
      ...prev,
      locations,
    }))
  }, [])

  const saveToDraftHandler = async () => {
    try {
      await savePostDraft(state)
    } catch (error) {
      console.error('Failed to save draft:', error)
    }
  }

  const loadFromDraftHandler = async () => {
    try {
      const restoredState = await loadPostDraft()

      if (!restoredState) {
        ToastError({
          title: 'Draft load Error:',
          messages: 'No data saved as a draft',
        })

        return
      }

      setState(restoredState)
    } catch (error) {
      console.error('Failed to load draft:', error)
      setState(initialCreatePostState)
    }
  }

  const handlePublish = useCallback(() => {
    // Prepare data to send
    const postData = {
      files: state.files,
      description: state.description,
      locations: state.locations,
    }

    addPost(postData, {
      onSuccess: () => {
        ToastSuccess({
          title: 'Success!',
          message: 'Your post has been published',
        })
        closeCreation()
        clearPostDraft()
      },
      onError: error => {
        ToastError({
          title: 'Post publish Error',
          messages: 'Failed to publish post',
        })
      },
    })
  }, [state, addPost, closeCreation])

  const renderStep = () => {
    switch (state.step) {
      case 'upload':
        return (
          <UploadStep
            onFileSelected={handleFileSelected}
            onLoadDraft={loadFromDraftHandler}
            fileUploadsQuantity={fileUploadsQuantity}
            moveNextStep={() => changeStep('crop')}
          />
        )

      case 'crop':
        return (
          <CropStep
            file={state.files[state.currentFileIndex]?.file}
            files={state.files}
            addImage={addImageHandler}
          /> // file={state.files[state.files.length - 1]?.file}
        )

      case 'publication':
        return (
          <PublicationStep
            user={user}
            // files={state.files}
            fileUrls={state.files.map(file => file.url)}
            description={state.description}
            locations={state.locations}
            onDescriptionChange={handleDescriptionChange}
            onLocationChange={onLocationChange}
          />
        )
    }
  }

  const headerContent = (
    <CreatePostModalHeader
      step={state.step}
      onChangeStepClick={changeStep}
      onPublishClick={handlePublish}
      isPublishing={isPublishing}
    />
  )

  return (
    <>
      <Modal
        open={isCreationOpen}
        onClose={handleClose}
        modalTitle={headerContent}
        showCloseButton={isShowCloseButton}
        showHeader
        size={modalSize}
        onInteractOutside={handleOutsideClick}
        className={clsx(s.modal, s[`modal-${modalSize}`])}
        fullSize={isFullSize}
      >
        <div className={s.container}>{renderStep()}</div>
      </Modal>

      <ConfirmCloseCreatePostModal
        hasFileUploads={hasFileUploads}
        open={isConfirmOpen}
        onCloseClick={closeConfirm}
        onCancel={closeCreation}
        onConfirm={handleConfirm}
      />
    </>
  )
}
