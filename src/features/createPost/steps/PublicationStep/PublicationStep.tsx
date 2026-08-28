import {
  Avatar,
  Button,
  Input,
  PinOutline,
  Select,
  TextArea,
  Typography,
} from '@candy.thieves/ui-kit-lumos'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { LocationInput } from '@/components/LocationInput'
import { UserResponse } from '@/lib/model'
import s from './PublicationStep.module.scss'

type PublicationStepProps = {
  user: null | UserResponse
  files: File[]
  currentFileIndex: number
  description: string
  onPreviousFile: () => void
  onNextFile: () => void
  onDescriptionChange: (value: string) => void
}

export const PublicationStep = ({
  user,
  files,
  currentFileIndex,
  description,
  onPreviousFile,
  onNextFile,
  onDescriptionChange,
}: PublicationStepProps) => {
  const currentFile = files[currentFileIndex]
  const userName = user?.username || 'user'
  const maxLocations = files.length

  return (
    <div className={s.publicationContent}>
      <div className={s.slideShow}>
        <button
          type={'button'}
          onClick={onPreviousFile}
          disabled={currentFileIndex === 0}
          className={s.prevSlideButton}
        >
          ←
        </button>

        <img src={URL.createObjectURL(currentFile)} alt={''} className={s.slideShowImage} />

        <button
          type={'button'}
          onClick={onNextFile}
          disabled={currentFileIndex === files.length - 1}
          className={s.nextSlideButton}
        >
          →
        </button>
      </div>

      <div className={s.publicationBlock}>
        <div className={s.descriptionBlock}>
          <div className={s.publisherInfo}>
            <Avatar size={'s'} userName={userName} src={''} />
            <Typography variant={'subtitle1'} color={'var(--color-light-100)'}>
              {userName}
            </Typography>
          </div>

          <TextArea
            value={description}
            onChange={event => onDescriptionChange(event.target.value)}
            placeholder={'Add publication description'}
          />
        </div>

        <div className={s.locationBlock}>
          <LocationInput maxLocations={maxLocations} />
        </div>
      </div>
    </div>
  )
}
