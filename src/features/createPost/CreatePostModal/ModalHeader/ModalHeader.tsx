import { ArrowIosBack, Button, clsx, Typography } from '@candy.thieves/ui-kit-lumos'
import { CreatePostStep } from '@/features/createPost'
import s from './ModalHeader.module.scss'

type ModalHeaderProps = {
  headerTitle: string
  buttonTitle: string
  onPrevClick: (step: CreatePostStep) => void
  onNextClick: () => void
  isPublishing?: boolean
}

export const ModalHeader = ({
  headerTitle,
  buttonTitle,
  onPrevClick,
  onNextClick,
  isPublishing,
}: ModalHeaderProps) => {
  console.log('isPublishing', isPublishing)
  return (
    <div className={s.postControlsHeader}>
      <Button
        as={'button'}
        className={clsx(s.arrowButton, s.button)}
        onClick={onPrevClick}
        disabled={isPublishing}
      >
        <ArrowIosBack />
      </Button>
      <Typography variant={'h1'} color={'var(--color-light-100)'}>
        {headerTitle}
      </Typography>
      <Button
        as={'button'}
        className={clsx('typography-subtitle2', s.button, s.actionButton)}
        onClick={onNextClick}
        disabled={isPublishing}
      >
        {buttonTitle}
      </Button>
    </div>
  )
}
