import { Avatar, Carousel, TextArea, Typography } from '@candy.thieves/ui-kit-lumos'
import { useRef, useState } from 'react'
import { LocationInput } from '@/components/LocationInput'
import { Location } from '@/features/createPost/types'
import { usePostEvents } from '@/lib/hooks'
import { UserResponse } from '@/lib/model'
import s from './PublicationStep.module.scss'

type PublicationStepProps = {
  user: null | UserResponse
  fileUrls: string[]
  description: string
  locations: Location[]
  onDescriptionChange: (value: string) => void
  onLocationChange: (value: Location[]) => void
  onPostCreated: (postId: string) => void
}

const MAX_DESCRIPTION_LENGTH = 500

export const PublicationStep = ({
  user,
  fileUrls,
  description,
  locations,
  onDescriptionChange,
  onLocationChange,
  onPostCreated,
}: PublicationStepProps) => {
  const descriptionRef = useRef(description)
  const counterRef = useRef<HTMLDivElement | null>(null)
  const [isTextError, setIsTextError] = useState(false)

  const userName = user?.username || 'user'
  const maxLocations = fileUrls.length

  // SSE Listener hook (for Publishing created post):
  usePostEvents({
    onPostCreated,
  })

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
