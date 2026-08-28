import { ArrowIosBack, Button, clsx, Typography } from '@candy.thieves/ui-kit-lumos'
import { CreatePostStep } from '@/features/createPost'
import s from './ModalHeader.module.scss'

type ModalHeaderProps = {
  headerTitle: string
  buttonTitle: string
  onPrevClick: (step: CreatePostStep) => void
  onNextClick: () => void
}

export const ModalHeader = ({
  headerTitle,
  buttonTitle,
  onPrevClick,
  onNextClick,
}: ModalHeaderProps) => {
  return (
    <div className={s.postControlsHeader}>
      <Button as={'a'} className={clsx(s.arrowButton, s.button)} onClick={onPrevClick}>
        <ArrowIosBack />
      </Button>
      <Typography variant={'h1'} color={'var(--color-light-100)'}>
        {headerTitle}
      </Typography>
      <Button
        as={'a'}
        className={clsx('typography-subtitle2', s.button, s.actionButton)}
        onClick={onNextClick}
      >
        {buttonTitle}
      </Button>
    </div>
  )
}
