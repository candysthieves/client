import {
  Avatar,
  Carousel,
  CircularProgress,
  TextArea,
  Typography,
} from '@candy.thieves/ui-kit-lumos'
import { useRef, useState } from 'react'
import { LocationInput } from '@/components/LocationInput'
import { MAX_POST_DESCRIPTION_LENGTH } from '@/constants'
import { Location, PostFile } from '@/features/createPost/types'
import { usePostEvents } from '@/lib/hooks'
import { UserProfile } from '@/lib/model'
import s from './PublicationStep.module.scss'

type PublicationStepProps = {
  userProfile: UserProfile
  files: PostFile[]
  fileUrls: string[]
  description: string
  locations: Location[]
  onDescriptionChange: (value: string) => void
  onLocationChange: (value: Location[]) => void
  onPostCreated: (postId: string) => void
  isPublishing?: boolean
}

export const PublicationStep = ({
  userProfile,
  fileUrls,
  files,
  description,
  locations,
  onDescriptionChange,
  onLocationChange,
  onPostCreated,
  isPublishing,
}: PublicationStepProps) => {
  const { id: userId, username: profileUserName = userId, avatarPreviewUrl } = userProfile

  const descriptionRef = useRef(description)
  const counterRef = useRef<HTMLDivElement | null>(null)
  const [isTextError, setIsTextError] = useState(false)

  const maxLocations = fileUrls.length

  // SSE Listener hook (for Publishing created post):
  usePostEvents({
    onPostCreated,
  })

  const handleDescriptionChange = (value: string) => {
    if (value.length > MAX_POST_DESCRIPTION_LENGTH) {
      setIsTextError(true)
      return
    }
    // If the user returned to the range
    if (isTextError) {
      setIsTextError(false)
    }

    descriptionRef.current = value

    if (counterRef.current) {
      counterRef.current.textContent = `${value.length}/${MAX_POST_DESCRIPTION_LENGTH}`
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
            <Avatar size={'s'} userName={profileUserName} src={avatarPreviewUrl?.url || ''} />

            <Typography variant={'subtitle1'} color={'var(--color-light-100)'}>
              {profileUserName}
            </Typography>
          </div>

          <TextArea
            defaultValue={description}
            error={textErrorMessage}
            onChange={event => handleDescriptionChange(event.target.value)}
            onBlur={handleDescriptionBlur}
            placeholder={'Add publication description'}
            maxLength={MAX_POST_DESCRIPTION_LENGTH + 1}
            disabled={isPublishing}
          />

          <Typography
            ref={counterRef}
            variant={'caption1'}
            color={'var(--color-light-900)'}
            className={s.textCounter}
            mt={'0.5rem'}
          >
            {description.length}/{MAX_POST_DESCRIPTION_LENGTH}
          </Typography>
        </div>

        <div className={s.locationBlock}>
          <LocationInput
            files={files}
            maxLocations={maxLocations}
            initialLocations={locations}
            onLocationChange={onLocationChange}
            isPublishing={isPublishing}
          />
        </div>
      </div>
      {isPublishing && <CircularProgress size={'lg'} color={'success'} className={s.loadSpinner} />}
    </div>
  )
}
