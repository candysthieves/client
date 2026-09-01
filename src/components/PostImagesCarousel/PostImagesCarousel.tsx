'use client'

import { Carousel } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import { useId } from 'react'
import type { PostImage } from '@/mocks/posts'
import s from './PostImagesCarousel.module.scss'

type Props = {
  images: PostImage[]
  alt?: string
  /** 'natural' — контейнер сжимается под первую картинку (object-fit: contain), без рамок, пока размеры совпадают */
  natural?: boolean
}

// широкоформатные изображения (например 16:9) вписываются в область целиком,
// остальные заполняют её с кадрированием
const isWideImage = ({ width = 0, height = 0 }: PostImage) => height > 0 && width / height > 1

const getRatio = ({ width = 0, height = 0 }: PostImage) =>
  height > 0 && width > 0 ? width / height : null

const KIT_SLIDE_CLASS = '_slide_1abcz_62'

const slideImgSelector = (scopeClass: string, position: number) =>
  `.${scopeClass} .${KIT_SLIDE_CLASS}:nth-child(${position}) img`

export const PostImagesCarousel = ({ images, alt, natural = false }: Props) => {
  const scopeId = useId().replace(/[^a-zA-Z0-9_-]/g, '')

  if (!images[0]) {
    return null
  }

  const ratio = natural ? getRatio(images[0]) : null
  const containerStyle = ratio ? { aspectRatio: String(ratio) } : undefined
  const isCarousel = images.length > 1

  // slides that should show with black bars instead of being cropped:
  // only wide (landscape) ones; the rest (e.g. 4:5) keep object-fit: cover
  const containPositions = images
    .map((image, index) => (isWideImage(image) ? index + 1 : null))
    .filter((position): position is number => position !== null)

  const containRules = containPositions
    .map(
      position =>
        `${slideImgSelector(scopeId, position)} { object-fit: contain !important; width: 100%; height: 100%; }`
    )
    .join('\n')

  const renderImage = (image: PostImage) => (
    <Image
      key={image.url}
      src={image.url}
      alt={alt || 'Post'}
      width={image.width ?? 986}
      height={image.height ?? 1130}
      className={
        natural
          ? `${s.image} ${s.imageNatural}`
          : isWideImage(image)
            ? `${s.image} ${s.imageContained}`
            : s.image
      }
    />
  )

  return (
    <div className={isCarousel ? `${s.container} ${scopeId}` : s.container} style={containerStyle}>
      {isCarousel ? <Carousel slides={images.map(image => image.url)} /> : renderImage(images[0])}
      {isCarousel && containRules.length > 0 && <style>{containRules}</style>}
    </div>
  )
}
