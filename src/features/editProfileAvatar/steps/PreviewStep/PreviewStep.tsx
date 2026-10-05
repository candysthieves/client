import { Button, CircularProgress } from '@candy.thieves/ui-kit-lumos'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { ToastError } from '@/components'
import { PostFile } from '@/features/createPost'
import { PreviewImage } from '@/features/editProfileAvatar/steps/PreviewStep/PreviewImage'
import { useAvatarEvents } from '@/lib/hooks'
import { cropImage } from '@/lib/utils/cropImage'
import s from './PreviewStep.module.scss'

type CroppedAvatar = {
  fileId: string
  file: File
  url: string
}

type PreviewStepProps = {
  file: null | PostFile
  updateAvatarFile: (newFile: File) => void
  isPublishing?: boolean
  onAvatarUpdated: (userId: string) => void
  // apiRef?: RefObject<CropStepApi | null>
}

export const PreviewStep = ({
  file,
  updateAvatarFile,
  // onClose,
  isPublishing,
  onAvatarUpdated,
  // apiRef,
}: PreviewStepProps) => {
  const [croppedAvatar, setCroppedAvatar] = useState<CroppedAvatar | null>(null)

  useAvatarEvents({ onAvatarUpdated })

  useEffect(() => {
    if (!file) {
      return
    }

    const { id, file: sourceFile } = file

    let isStale = false
    let createdUrl = ''

    cropImage(sourceFile)
      .then(croppedFile => {
        if (isStale) {
          return
        }

        createdUrl = URL.createObjectURL(croppedFile)
        setCroppedAvatar({ fileId: id, file: croppedFile, url: createdUrl })
      })
      .catch(() => {
        if (!isStale) {
          ToastError({
            title: 'Avatar crop error',
            messages: 'Failed to prepare the cropped avatar',
          })
        }
      })

    return () => {
      isStale = true

      if (createdUrl) {
        URL.revokeObjectURL(createdUrl)
      }
    }
  }, [file])

  // Результат считается актуальным только для того файла, который обрезан
  const cropped = file && croppedAvatar?.fileId === file.id ? croppedAvatar : null

  const onSaveClickHandler = () => {
    if (!cropped) {
      return
    }

    updateAvatarFile(cropped.file)
  }

  return (
    <div className={s.imageContent}>
      <div className={s.imageWrapper}>
        {cropped && <PreviewImage src={cropped.url} alt={`Avatar-preview-${cropped.fileId}`} />}

        {cropped && <div className={s.cropOverlay} />}
      </div>

      <Button
        onClick={onSaveClickHandler}
        disabled={isPublishing || !cropped}
        style={{
          alignSelf: 'flex-end',
          minWidth: '5.5rem',
        }}
      >
        Save
      </Button>

      {isPublishing && <CircularProgress size={'lg'} color={'success'} className={s.loadSpinner} />}
    </div>
  )
}
