import { Button, clsx, MaximizeOutline, Slider } from '@candy.thieves/ui-kit-lumos'
import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { createCroppedImage } from '@/lib/utils'
import s from './CropImage.module.scss'

export type CropStepApi = {
  applyCrop: () => Promise<void>
}

type CropImageProps = {
  imageUrl: string
  fileId: string
  aspect: number
  updateCroppedFile: (fileId: string, newFile: File) => void
  apiRef?: RefObject<CropStepApi | null>
  children?: ReactNode
}

export const CropImage = ({
  imageUrl,
  fileId,
  aspect,
  updateCroppedFile,
  apiRef,
  children,
}: CropImageProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isZoomOpen, setIsZoomOpen] = useState(false)

  const zoomRangeRef = useRef<HTMLDivElement>(null)
  const maximizeButtonRef = useRef<HTMLButtonElement>(null)

  const openMaximizeImageSliderHandler = () => {
    setIsZoomOpen(prev => !prev)
  }

  const handleZoomRangeClickOutside = (event: MouseEvent) => {
    const isInside =
      zoomRangeRef.current?.contains(event.target as Node) ||
      maximizeButtonRef.current?.contains(event.target as Node)

    if (!isInside) {
      setIsZoomOpen(false)
    }
  }

  useEffect(() => {
    if (!isZoomOpen) return
    document.addEventListener('mousedown', handleZoomRangeClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleZoomRangeClickOutside)
    }
  }, [isZoomOpen])

  const onCropComplete = (_croppedArea: Area, croppedArea: Area) => {
    setCroppedAreaPixels(croppedArea)
  }

  const handleCrop = async () => {
    if (!croppedAreaPixels) return

    const croppedFile = await createCroppedImage(imageUrl, croppedAreaPixels)

    updateCroppedFile(fileId, croppedFile)
  }

  const handleCropRef = useRef(handleCrop)

  useEffect(() => {
    handleCropRef.current = handleCrop
  })

  useEffect(() => {
    if (!apiRef) return

    apiRef.current = { applyCrop: () => handleCropRef.current() }

    return () => {
      apiRef.current = null
    }
  }, [apiRef])

  return (
    <>
      <div className={s.cropContainer}>
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
        {children}
        {isZoomOpen && (
          <div className={s.zoomRangeContainer} ref={zoomRangeRef}>
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={values => setZoom(values[0])}
            />
          </div>
        )}
        <Button
          ref={maximizeButtonRef}
          className={clsx(s.iconButton, s.maximizeButton)}
          onClick={openMaximizeImageSliderHandler}
        >
          <MaximizeOutline
            size={36}
            backgroundColor={'var(--color-dark-500)'}
            svgProps={{
              className: s.icon,
            }}
          />
        </Button>
      </div>
    </>
  )
}
