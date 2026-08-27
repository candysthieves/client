'use client'

import { Carousel } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import type { PostImage } from '@/components/PostDetailsModal/PostDetailsModal.mock'
import s from './PostImagesCarousel.module.scss'

type Props = {
  images: PostImage[]
  alt?: string
}

// широкоформатные изображения (например 16:9) вписываются в область целиком,
// остальные заполняют её с кадрированием
const isWideImage = ({ width = 0, height = 0 }: PostImage) => height > 0 && width / height > 1

export const PostImagesCarousel = ({ images, alt }: Props) => {
  if (!images[0]) {
    return null
  }

  const renderImage = (image: PostImage) => (
    <Image
      key={image.url}
      src={image.url}
      alt={alt || 'Post'}
      width={image.width ?? 986}
      height={image.height ?? 1130}
      className={isWideImage(image) ? `${s.image} ${s.imageContained}` : s.image}
    />
  )

  return (
    <div className={s.container}>
      {images.length > 1 ? <Carousel slides={images.map(renderImage)} /> : renderImage(images[0])}
    </div>
  )
}
