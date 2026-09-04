import { Area } from 'react-easy-crop'

export const createCroppedImage = async (imageSrc: string, pixelCrop: Area): Promise<File> => {
  const image = new Image()

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve()
    image.onerror = () => reject(new Error('Failed to load image for cropping'))
    image.src = imageSrc
  })

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Could not get canvas context')
  }

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg'))

  if (!blob) {
    throw new Error('Could not create blob')
  }

  return new File([blob], 'cropped-image.jpg', {
    type: 'image/jpeg',
  })
}
