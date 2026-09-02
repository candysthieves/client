import type { CSSProperties } from 'react'

export const POST_IMAGE_AREA_MAX_WIDTH = 490
export const POST_IMAGE_AREA_MAX_HEIGHT = 562
export const POST_IMAGE_AREA_REFERENCE_WIDTH = 972

type ImageDimensions = {
  width?: number
  height?: number
}

/**
 * Размер области изображений поста задаётся первым изображением:
 * высота фиксирована (POST_IMAGE_AREA_MAX_HEIGHT), ширина считается из его
 * aspect ratio и ограничена POST_IMAGE_AREA_MAX_WIDTH.
 *
 * @example 4:5 → 450×562, 1:1 → 490×562, 16:9 → 490×562
 */
export const getPostImageAreaSize = (image: ImageDimensions | undefined) => {
  const { width = 0, height = 0 } = image ?? {}
  const aspectRatio = width > 0 && height > 0 ? width / height : 1

  return {
    width: Math.min(
      Math.round(POST_IMAGE_AREA_MAX_HEIGHT * aspectRatio),
      POST_IMAGE_AREA_MAX_WIDTH
    ),
    height: POST_IMAGE_AREA_MAX_HEIGHT,
  }
}

/**
 * Inline-стиль с шириной области для grid-контейнера модалки:
 * левая колонка модалки подстраивается под первое изображение поста.
 * Ширина задаётся в процентах от полной ширины модалки, поэтому колонка
 * сохраняет пропорции (4:5 уже, чем 1:1) при любом масштабе модалки.
 */
export const getPostImageAreaStyle = (image: ImageDimensions | undefined): CSSProperties => {
  const { width } = getPostImageAreaSize(image)
  const percent = (width / POST_IMAGE_AREA_REFERENCE_WIDTH) * 100

  return { '--image-area-width': `${percent}%` } as CSSProperties
}
