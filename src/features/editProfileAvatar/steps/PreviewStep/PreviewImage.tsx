import { clsx } from '@candy.thieves/ui-kit-lumos'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import s from './CropStep.module.scss'

type CropImagePreviewProps = {
  src: string
  alt: string
  className?: string
}

export const CropImagePreview = ({ src, alt, className }: CropImagePreviewProps) => {
  const [isImgLoading, setIsImgLoading] = useState(true)

  return (
    <>
      {isImgLoading && (
        <Skeleton
          className={s.imageSkeleton}
          baseColor={'var(--color-light-700)'}
          highlightColor={'var(--color-light-500)'}
          enableAnimation
          customHighlightBackground={
            'linear-gradient(90deg, var(--color-light-700) 25%, var(--color-light-500) 50%, var(--color-light-700) 75%)'
          }
        />
      )}

      <img
        src={src}
        alt={alt}
        className={clsx(className, {
          [s.hidden]: isImgLoading,
        })}
        onLoad={() => setIsImgLoading(false)}
      />
    </>
  )
}
