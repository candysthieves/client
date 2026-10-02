import { Button, CircularProgress } from '@candy.thieves/ui-kit-lumos'
import { PostFile } from '@/features/createPost'
import { PreviewImage } from '@/features/editProfileAvatar/steps/PreviewStep/PreviewImage'
import { useAvatarEvents } from '@/lib/hooks'
import s from './PreviewStep.module.scss'

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
  const imageUrl = file?.originalUrl ?? ''

  const onSaveClickHandler = () => {
    // TODO: change file check inside to new CENTERED AVATAR file check
    if (!file) {
      return
    }
    // TODO: CHANGE FILE PASSED TO CENTERED AVATAR in updateAvatarFile function
    updateAvatarFile(file.file)
  }

  useAvatarEvents({ onAvatarUpdated })

  return (
    <div className={s.imageContent}>
      {/* Replace the following blocks of code with a component that centers the avatar */}

      <PreviewImage src={imageUrl} alt={''} />
      {/*<CropImage*/}
      {/*  key={file.id}*/}
      {/*  imageUrl={imageUrl}*/}
      {/*  fileId={file.id}*/}
      {/*  aspect={aspect}*/}
      {/*  updateCroppedFile={updateCroppedFile}*/}
      {/*  apiRef={apiRef}*/}
      {/*></CropImage>*/}
      <Button
        onClick={onSaveClickHandler}
        disabled={isPublishing}
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
