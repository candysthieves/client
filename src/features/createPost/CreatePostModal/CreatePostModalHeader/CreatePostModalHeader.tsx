import { Typography } from '@candy.thieves/ui-kit-lumos'
import { CreatePostStep } from '@/features/createPost'
import { ModalHeader } from '@/features/createPost/CreatePostModal'

type CreatePostModalHeaderProps = {
  step: CreatePostStep
  onChangeStepClick: (step: CreatePostStep) => void
  onPublishClick: () => void
  isPublishing?: boolean
}

export const CreatePostModalHeader = ({
  step,
  onChangeStepClick,
  onPublishClick,
  isPublishing,
}: CreatePostModalHeaderProps) => {
  const renderContent = () => {
    switch (step) {
      case 'upload':
        return (
          <Typography variant={'h1'} color={'var(--color-light-100)'}>
            Add Photo
          </Typography>
        )

      case 'crop':
        return (
          <ModalHeader
            headerTitle={'Cropping'}
            buttonTitle={'Next'}
            onPrevClick={() => onChangeStepClick('upload')}
            onNextClick={() => onChangeStepClick('publication')}
          />
        )

      case 'publication':
        return (
          <ModalHeader
            headerTitle={'Publication'}
            buttonTitle={isPublishing ? 'Publishing...' : 'Publish'}
            onPrevClick={() => onChangeStepClick('crop')}
            onNextClick={onPublishClick}
            isPublishing={isPublishing}
          />
        )
    }
  }

  return <div>{renderContent()}</div>
}
