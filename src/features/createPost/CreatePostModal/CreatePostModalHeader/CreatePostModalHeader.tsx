import { Typography } from '@candy.thieves/ui-kit-lumos'
import { CreatePostStep } from '@/features/createPost'
import { ModalHeader } from '@/features/createPost/CreatePostModal'

type CreatePostModalHeaderProps = {
  step: 'crop' | 'publication' | 'upload'
  onPrevClick: (step: CreatePostStep) => void
  onNextClick: () => void
}

export const CreatePostModalHeader = ({
  step,
  onPrevClick,
  onNextClick,
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
            onPrevClick={() => onPrevClick('upload')}
            onNextClick={onNextClick}
          />
        )

      case 'publication':
        return (
          <ModalHeader
            headerTitle={'Publication'}
            buttonTitle={'Publish'}
            onPrevClick={() => onPrevClick('crop')}
            onNextClick={onNextClick}
          />
        )
    }
  }

  return <div>{renderContent()}</div>
}
