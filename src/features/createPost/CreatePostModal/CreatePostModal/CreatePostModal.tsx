'use client'

// const currentFile = files[currentFileIndex]

import { clsx, Modal } from '@candy.thieves/ui-kit-lumos'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CreatePostState, CreatePostStep } from '@/features/createPost'
import { CreatePostModalHeader } from '@/features/createPost/CreatePostModal'
import { ConfirmCloseCreatePostModal } from '@/features/createPost/CreatePostModal'
import { useAuth } from '@/lib/hooks/useAuth'
import { CropStep, PublicationStep, UploadStep } from '../../steps'
import s from './CreatePostModal.module.scss'

export const initialCreatePostState: CreatePostState = {
  step: 'upload',
  files: [],
  currentFileIndex: 0,
  description: '',
}

type CreatePostModalProps = {
  userId: string
}

export const CreatePostModal = ({ userId }: CreatePostModalProps) => {
  const { user } = useAuth() // CHANGE LATER TO FETCHED USER DATA (with avatar src)
  const router = useRouter()
  const [state, setState] = useState<CreatePostState>(initialCreatePostState)
  const [isCreationOpen, setIsCreationOpen] = useState(true)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const handleClose = () => {
    router.push(`/profile/${userId}`)
  }

  const closeCreation = () => {
    setIsCreationOpen(false)
    setIsConfirmOpen(false)
  }

  // Upload file step
  const handleFileSelected = (file: File) => {
    setState(prev => ({
      ...prev,
      files: [...prev.files, file],
      step: 'crop',
    }))
  }

  // Header controls
  const handlePrev = (step: CreatePostStep) => {
    setState(prev => ({
      ...prev,
      step,
    }))
  }
  const handleNext = () => {
    setState(prev => ({
      ...prev,
      step: 'publication',
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
  const addImageHandler = () => console.log('addImageHandler')

  // ConfirmCloseCreatePostModal handlers
  const handleConfirm = () => {
    closeCreation()
  }
  const closeConfirm = () => setIsConfirmOpen(false)
  const openConfirm = () => setIsConfirmOpen(true)
  const handleOutsideClick = (event: Event) => {
    event.preventDefault()
    openConfirm()
  }

  const renderStep = () => {
    switch (state.step) {
      case 'upload':
        return <UploadStep onFileSelected={handleFileSelected} />

      case 'crop':
        return <CropStep file={state.files[state.currentFileIndex]} addImage={addImageHandler} />

      case 'publication':
        return (
          <PublicationStep
            user={user}
            files={state.files}
            currentFileIndex={state.currentFileIndex}
            description={state.description}
            onPreviousFile={handlePreviousFile} // ?
            onNextFile={handleNextFile} // ?
            onDescriptionChange={handleDescriptionChange} // ?
          />
        )
    }
  }

  const headerContent = (
    <CreatePostModalHeader step={state.step} onPrevClick={handlePrev} onNextClick={handleNext} />
  )

  const isShowCloseButton = state.step === 'upload'
  const isFullSize = state.step !== 'upload'
  const modalSize = state.step === 'publication' ? 'xl' : 'm'

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
        open={isConfirmOpen}
        onCancel={closeConfirm}
        onConfirm={handleConfirm}
      />
    </>
  )
}
