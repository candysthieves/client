import { Button, Cards, clsx, ImageOutline, Typography } from '@candy.thieves/ui-kit-lumos'
import { Ref } from 'react'
import { AspectRatio } from '@/features/createPost'
import s from './ExpandCropPostImageBlock.module.scss'

type ExpandCropPostImageBlockProps = {
  isOpen: boolean
  ref?: Ref<HTMLDivElement>
  onSelectAspectRatio: (aspectRatio: AspectRatio) => void
}

export const ExpandCropPostImageBlock = ({
  isOpen,
  ref,
  onSelectAspectRatio,
}: ExpandCropPostImageBlockProps) => {
  const onSelectAspectRatioHandler = (aspectRatio: AspectRatio) => {
    // add logic if needed
    onSelectAspectRatio(aspectRatio)
  }

  return (
    <>
      {isOpen && (
        <Cards ref={ref} className={s.expandImageContent}>
          <Button
            className={clsx(s.iconButton, s.originalButton)}
            onClick={() => onSelectAspectRatioHandler(AspectRatio.ORIGINAL)}
          >
            <Typography variant={'h3'} color={'var(--color-light-900)'} className={s.buttonTitle}>
              Original
            </Typography>
            <ImageOutline
              size={24}
              color={'var(--color-light-900)'}
              svgProps={{
                className: s.originalButtonIcon,
              }}
            />
          </Button>

          <Button
            className={s.iconButton}
            onClick={() => onSelectAspectRatioHandler(AspectRatio.SQUARE)}
          >
            <Typography variant={'h3'} color={'var(--color-light-900)'}>
              1:1
            </Typography>
            <div className={s.square}></div>
          </Button>

          <Button
            className={s.iconButton}
            onClick={() => onSelectAspectRatioHandler(AspectRatio.PORTRAIT)}
          >
            <Typography variant={'h3'} color={'var(--color-light-900)'}>
              4:5
            </Typography>
            <div className={s.portrait}></div>
          </Button>

          <Button
            className={s.iconButton}
            onClick={() => onSelectAspectRatioHandler(AspectRatio.WIDESCREEN)}
          >
            <Typography variant={'h3'} color={'var(--color-light-900)'}>
              16:9
            </Typography>
            <div className={s.widescreen}></div>
          </Button>
        </Cards>
      )}
    </>
  )
}
