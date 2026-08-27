'use client'

// const currentFile = files[currentFileIndex]

import { Modal } from '@candy.thieves/ui-kit-lumos'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CreatePostState } from '@/features/createPost'
import { CropStep, PublicationStep, UploadStep } from '../steps'
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
  const router = useRouter()
  const [state, setState] = useState<CreatePostState>(initialCreatePostState)

  const handleClose = () => {
    router.push(`/profile/${userId}`)
  }

  const handleFileSelected = (file: File) => {
    setState(prev => ({
      ...prev,
      files: [...prev.files, file],
      step: 'crop',
    }))
  }

  const handleNext = () => {
    setState(prev => ({
      ...prev,
      step: 'publication',
    }))
  }

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

  const handleDescriptionChange = (description: string) => {
    setState(prev => ({
      ...prev,
      description,
    }))
  }

  const renderStep = () => {
    switch (state.step) {
      case 'upload':
        return <UploadStep onFileSelected={handleFileSelected} />

      case 'crop':
        return <CropStep file={state.files[state.currentFileIndex]} onNext={handleNext} />

      case 'publication':
        return (
          <PublicationStep
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

  return (
    <Modal open onClose={handleClose}>
      <div className={s.container}>{renderStep()}</div>
    </Modal>
  )
}
