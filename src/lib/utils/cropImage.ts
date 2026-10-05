const CROPPED_IMAGE_EDGE = 492
const CROPPED_IMAGE_MIME_TYPE = 'image/jpeg'
const CROPPED_IMAGE_QUALITY = 0.92
const CROPPED_IMAGE_BACKGROUND = '#ffffff'

const loadImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()

    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Failed to load image for cropping'))
    image.src = url
  })

const canvasToBlob = (canvas: HTMLCanvasElement) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      blob => (blob ? resolve(blob) : reject(new Error('Could not create cropped image'))),
      CROPPED_IMAGE_MIME_TYPE,
      CROPPED_IMAGE_QUALITY
    )
  })

const getCroppedFileName = (name: string) => `${name.replace(/\.[^.]+$/, '')}-cropped.jpg`

/**
 * Обрезает изображение по центру в квадрат и возвращает новый File.
 *
 * Сторона результата — меньшая сторона исходника, ограниченная
 * CROPPED_IMAGE_EDGE, поэтому аватар не растягивается и не раздувает
 * размер загружаемого файла. Результат всегда квадратный JPEG.
 */
export const cropImage = async (file: File): Promise<File> => {
  const sourceUrl = URL.createObjectURL(file)

  try {
    const image = await loadImage(sourceUrl)
    // размер центрального квадрата, который вырезаем из оригинала
    const cropSize = Math.min(image.naturalWidth, image.naturalHeight)

    const edge = Math.min(image.naturalWidth, image.naturalHeight, CROPPED_IMAGE_EDGE)
    const offsetX = Math.round((image.naturalWidth - cropSize) / 2)
    const offsetY = Math.round((image.naturalHeight - cropSize) / 2)
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (!context) {
      throw new Error('Could not get canvas context')
    }

    canvas.width = CROPPED_IMAGE_EDGE
    canvas.height = CROPPED_IMAGE_EDGE

    // JPEG не хранит альфа-канал: прозрачные пиксели стали бы чёрными
    context.fillStyle = CROPPED_IMAGE_BACKGROUND
    context.fillRect(0, 0, edge, edge)
    context.drawImage(
      image,
      offsetX,
      offsetY,
      cropSize,
      cropSize,
      0,
      0,
      CROPPED_IMAGE_EDGE,
      CROPPED_IMAGE_EDGE
    )

    const blob = await canvasToBlob(canvas)

    return new File([blob], getCroppedFileName(file.name), { type: CROPPED_IMAGE_MIME_TYPE })
  } finally {
    URL.revokeObjectURL(sourceUrl)
  }
}
