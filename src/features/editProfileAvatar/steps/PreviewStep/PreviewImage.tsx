import { clsx } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import s from './PreviewStep.module.scss'

type PreviewImageProps = {
  src: string
  alt: string
  className?: string
}

export const PreviewImage = ({ src, alt, className }: PreviewImageProps) => {
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

      <Image
        src={src}
        alt={''}
        width={332}
        height={340}
        className={clsx(className, s.imageItem, {
          [s.hidden]: isImgLoading,
        })}
        onLoad={() => setIsImgLoading(false)}
      />
    </>
  )
}
