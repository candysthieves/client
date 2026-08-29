'use client'

import { Carousel } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
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

export const PostImagesCarousel = ({ images, alt, natural = false }: Props) => {
  if (!images[0]) {
    return null
  }

  const ratio = natural ? getRatio(images[0]) : null
  const containerStyle = ratio ? { aspectRatio: String(ratio) } : undefined

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
    <div className={s.container} style={containerStyle}>
      {images.length > 1 ? <Carousel slides={images.map(renderImage)} /> : renderImage(images[0])}
    </div>
  )
}
