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
import { loadPostDraft, savePostDraft } from '@/lib/utils'
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
  // const [fileUrls, setFileUrls] = useState<string[]>([])

  // Добавить очистку если потребуется
  // useEffect(() => {
  //   return () => {
  //     state.files.forEach(({ url }) => {
  //       URL.revokeObjectURL(url)
  //     })
  //   }
  // }, [state.files])

  const handleClose = () => {
    router.push(`/profile/${userId}`)
  }

  const closeCreation = () => {
    setIsCreationOpen(false)
    setIsConfirmOpen(false)

    // Release object URLs
    state.files.forEach(({ url }) => {
      URL.revokeObjectURL(url)
    })
    handleClose()
  }

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
    void saveToDraftHandler()
    closeCreation()
  }
  const closeConfirm = () => {
    closeCreation()
  }

  const openConfirm = () => setIsConfirmOpen(true)
  const handleOutsideClick = (event: Event) => {
    event.preventDefault()
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
    // Подготовка данных для отправки
    const postData = {
      files: state.files,
      description: state.description,
      locations: state.locations,
    }

    addPost(postData, {
      onSuccess: () => {
        // Успешная публикация
        ToastSuccess({
          title: 'Success!',
          message: 'Your post has been published',
        })
        closeCreation()
      },
      onError: error => {
        // Ошибка при публикации
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
        return <UploadStep onFileSelected={handleFileSelected} onLoadDraft={loadFromDraftHandler} />

      case 'crop':
        return (
          <CropStep file={state.files[state.currentFileIndex]?.file} addImage={addImageHandler} />
        )

      case 'publication':
        return (
          <PublicationStep
            user={user}
            // files={state.files}
            fileUrls={state.files.map(file => file.url)}
            currentFileIndex={state.currentFileIndex}
            description={state.description}
            locations={state.locations}
            onPreviousFile={handlePreviousFile} // ?
            onNextFile={handleNextFile} // ?
            onDescriptionChange={handleDescriptionChange} // ?
            onLocationChange={onLocationChange}
          />
        )
    }
  }

  const headerContent = (
    <CreatePostModalHeader
      step={state.step}
      onPrevClick={handlePrev}
      onNextClick={handleNext}
      onPublishClick={handlePublish}
      isPublishing={isPublishing}
    />
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
