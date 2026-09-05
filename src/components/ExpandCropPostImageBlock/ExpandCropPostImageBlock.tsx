import { Button, Cards, clsx, Typography } from '@candy.thieves/ui-kit-lumos'
import { Ref } from 'react'
import { AspectRatio } from '@/features/createPost'
import s from './ExpandCropPostImageBlock.module.scss'

type ExpandCropPostImageBlockProps = {
  isOpen: boolean
  ref?: Ref<HTMLDivElement>
  selectedAspectRatio: AspectRatio
  onSelectAspectRatio: (aspectRatio: AspectRatio) => void
}

export const ExpandCropPostImageBlock = ({
  isOpen,
  ref,
  selectedAspectRatio,
  onSelectAspectRatio,
}: ExpandCropPostImageBlockProps) => {
  const onSelectAspectRatioHandler = (aspectRatio: AspectRatio) => {
    // add logic if needed
    onSelectAspectRatio(aspectRatio)
  }

  const getLabelColor = (aspectRatio: AspectRatio) =>
    selectedAspectRatio === aspectRatio ? 'var(--color-light-100)' : 'var(--color-light-900)'

  return (
    <>
      {isOpen && (
        <Cards ref={ref} className={s.expandImageContent}>
          <Button
            className={s.iconButton}
            onClick={() => onSelectAspectRatioHandler(AspectRatio.SQUARE)}
          >
            <Typography variant={'h3'} color={getLabelColor(AspectRatio.SQUARE)}>
              1:1
            </Typography>
            <div
              className={clsx(
                s.square,
                selectedAspectRatio === AspectRatio.SQUARE && s.activeShape
              )}
            ></div>
          </Button>

          <Button
            className={s.iconButton}
            onClick={() => onSelectAspectRatioHandler(AspectRatio.PORTRAIT)}
          >
            <Typography variant={'h3'} color={getLabelColor(AspectRatio.PORTRAIT)}>
              4:5
            </Typography>
            <div
              className={clsx(
                s.portrait,
                selectedAspectRatio === AspectRatio.PORTRAIT && s.activeShape
              )}
            ></div>
          </Button>

          <Button
            className={s.iconButton}
            onClick={() => onSelectAspectRatioHandler(AspectRatio.WIDESCREEN)}
          >
            <Typography variant={'h3'} color={getLabelColor(AspectRatio.WIDESCREEN)}>
              16:9
            </Typography>
            <div
              className={clsx(
                s.widescreen,
                selectedAspectRatio === AspectRatio.WIDESCREEN && s.activeShape
              )}
            ></div>
          </Button>
        </Cards>
      )}
    </>
  )
}
