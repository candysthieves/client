// import { Avatar, TextArea, Typography } from '@candy.thieves/ui-kit-lumos'
// import { useState } from 'react'
// import { LocationInput } from '@/components/LocationInput'
// import { UserResponse } from '@/lib/model'
// import s from './PublicationStep.module.scss'
//
// type PublicationStepProps = {
//   user: null | UserResponse
//   files: File[]
//   currentFileIndex: number
//   description: string
//   onPreviousFile: () => void
//   onNextFile: () => void
//   onDescriptionChange: (value: string) => void
// }
//
// const MAX_DESCRIPTION_LENGTH = 500
//
// export const PublicationStep = ({
//   user,
//   files,
//   currentFileIndex,
//   description,
//   onPreviousFile,
//   onNextFile,
//   onDescriptionChange,
// }: PublicationStepProps) => {
//   const [isTextError, setIsTextError] = useState(false)
//
//   const currentFile = files[currentFileIndex]
//   const userName = user?.username || 'user'
//   const maxLocations = files.length
//
//   const handleDescriptionChange = (value: string) => {
//     // Check if the length exceeds the limit
//     if (value.length > MAX_DESCRIPTION_LENGTH) {
//       setIsTextError(true)
//       // Do add text to the description if the limit is exceeded
//       return
//     }
//
//     // If the length is within the limit
//     onDescriptionChange(value)
//     setIsTextError(false)
//   }
//
//   const textErrorMessage = isTextError ? 'Maximum length exceeded' : ''
//
//   return (
//     <div className={s.publicationContent}>
//       <div className={s.slideShow}>
//         <button
//           type={'button'}
//           onClick={onPreviousFile}
//           disabled={currentFileIndex === 0}
//           className={s.prevSlideButton}
//         >
//           ←
//         </button>
//
//         <img src={URL.createObjectURL(currentFile)} alt={''} className={s.slideShowImage} />
//
//         <button
//           type={'button'}
//           onClick={onNextFile}
//           disabled={currentFileIndex === files.length - 1}
//           className={s.nextSlideButton}
//         >
//           →
//         </button>
//       </div>
//
//       <div className={s.publicationBlock}>
//         <div className={s.descriptionBlock}>
//           <div className={s.publisherInfo}>
//             <Avatar size={'s'} userName={userName} src={''} />
//             <Typography variant={'subtitle1'} color={'var(--color-light-100)'}>
//               {userName}
//             </Typography>
//           </div>
//
//           <Typography
//             variant={'caption1'}
//             color={'var(--color-light-900)'}
//             className={s.textCounter}
//             mb={'0.25rem'}
//           >
//             {description.length}/{MAX_DESCRIPTION_LENGTH}
//           </Typography>
//           <TextArea
//             value={description}
//             error={textErrorMessage}
//             // maxLength={MAX_DESCRIPTION_LENGTH}
//             onChange={event => handleDescriptionChange(event.target.value)}
//             placeholder={'Add publication description'}
//           />
//         </div>
//
//         <div className={s.locationBlock}>
//           <LocationInput maxLocations={maxLocations} />
//         </div>
//       </div>
//     </div>
//   )
// }

import { Avatar, TextArea, Typography } from '@candy.thieves/ui-kit-lumos'
import { useRef, useState } from 'react'
import { LocationInput } from '@/components/LocationInput'
import { Location } from '@/features/createPost'
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
  onLocationChange: (value: Location[]) => void
}

const MAX_DESCRIPTION_LENGTH = 500

export const PublicationStep = ({
  user,
  files,
  currentFileIndex,
  description,
  onPreviousFile,
  onNextFile,
  onDescriptionChange,
  onLocationChange,
}: PublicationStepProps) => {
  const descriptionRef = useRef(description)
  const counterRef = useRef<HTMLDivElement | null>(null)
  const [isTextError, setIsTextError] = useState(false)

  const currentFile = files[currentFileIndex]
  const userName = user?.username || 'user'
  const maxLocations = files.length

  const handleDescriptionChange = (value: string) => {
    if (value.length > MAX_DESCRIPTION_LENGTH) {
      setIsTextError(true)
      return
    }
    // If the user returned to the range
    if (isTextError) {
      setIsTextError(false)
    }

    descriptionRef.current = value

    if (counterRef.current) {
      counterRef.current.textContent = `${value.length}/${MAX_DESCRIPTION_LENGTH}`
    }
  }

  const handleDescriptionBlur = () => {
    onDescriptionChange(descriptionRef.current)
  }

  const textErrorMessage = isTextError ? 'Maximum length exceeded' : ''

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
            defaultValue={description}
            error={textErrorMessage}
            onChange={event => handleDescriptionChange(event.target.value)}
            onBlur={handleDescriptionBlur}
            placeholder={'Add publication description'}
            maxLength={MAX_DESCRIPTION_LENGTH + 1}
          />

          <Typography
            ref={counterRef}
            variant={'caption1'}
            color={'var(--color-light-900)'}
            className={s.textCounter}
            mt={'0.5rem'}
          >
            {description.length}/{MAX_DESCRIPTION_LENGTH}
          </Typography>
        </div>

        <div className={s.locationBlock}>
          <LocationInput maxLocations={maxLocations} onLocationChange={onLocationChange} />
        </div>
      </div>
    </div>
  )
}
