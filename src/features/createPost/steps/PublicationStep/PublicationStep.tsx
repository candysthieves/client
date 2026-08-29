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

import { Avatar, Carousel, TextArea, Typography } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { LocationInput } from '@/components/LocationInput'
import { CreatePostState, Location } from '@/features/createPost'
import { UserResponse } from '@/lib/model'
import s from './PublicationStep.module.scss'

// const placeholderSlides = [
//   <img
//     key={'1'}
//     src={
//       'https://plus.unsplash.com/premium_photo-1711434824963-ca894373272e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJlfGVufDB8fDB8fHww'
//     }
//     alt={'Slide 1'}
//     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//   />,
//   <img
//     key={'2'}
//     src={
//       'https://images.unsplash.com/photo-1771838026270-28fd7e3bef1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlfGVufDB8fDB8fHww'
//     }
//     alt={'Slide 2'}
//     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//   />,
//   <img
//     key={'3'}
//     src={
//       'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bmF0dXJlfGVufDB8fDB8fHww'
//     }
//     alt={'Slide 3'}
//     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//   />,
//   <img
//     key={'4'}
//     src={
//       'https://plus.unsplash.com/premium_photo-1781039325448-435a6a0899b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D'
//     }
//     alt={'Slide 4'}
//     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//   />,
//   <img
//     key={'5'}
//     src={
//       'https://plus.unsplash.com/premium_photo-1719943510748-4b4354fbcf56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D'
//     }
//     alt={'Slide 5'}
//     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//   />,
// ]

type PublicationStepProps = {
  user: null | UserResponse
  // files: File[]
  fileUrls: string[]
  currentFileIndex: number
  description: string
  locations: Location[]
  onPreviousFile: () => void
  onNextFile: () => void
  onDescriptionChange: (value: string) => void
  onLocationChange: (value: Location[]) => void
}

const MAX_DESCRIPTION_LENGTH = 500

export const PublicationStep = ({
  user,
  // files,
  fileUrls,
  currentFileIndex,
  description,
  locations,
  onPreviousFile,
  onNextFile,
  onDescriptionChange,
  onLocationChange,
}: PublicationStepProps) => {
  const descriptionRef = useRef(description)
  const counterRef = useRef<HTMLDivElement | null>(null)
  const [isTextError, setIsTextError] = useState(false)

  // const currentFile = files[currentFileIndex]
  const userName = user?.username || 'user'
  const maxLocations = fileUrls.length

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
        <Carousel slides={fileUrls} />
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
          <LocationInput
            maxLocations={maxLocations}
            initialLocations={locations}
            onLocationChange={onLocationChange}
          />
        </div>
      </div>
    </div>
  )
}
