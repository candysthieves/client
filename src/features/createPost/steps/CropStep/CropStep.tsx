import { Button, clsx, ExpandOutline, ImageOutline } from '@candy.thieves/ui-kit-lumos'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { ExpandCropPostImageBlock } from '@/components/ExpandCropPostImageBlock'
import { SelectCropPostImagesBlock } from '@/components/SelectCropPostImagesBlock'
import { AspectRatio, PostFile } from '@/features/createPost'
import { CropImage, type CropStepApi } from './CropImage/CropImage'
import s from './CropStep.module.scss'

export type { CropStepApi } from './CropImage/CropImage'

type CropStepProps = {
  currentFileIndex: number
  files: PostFile[]
  updateCroppedFile: (fileId: string, newFile: File) => void
  deleteFile: (fileId: string) => void
  setAsCurrentFile: (index: number) => void
  addImage: () => void
  apiRef?: RefObject<CropStepApi | null>
}

export const CropStep = ({
  currentFileIndex,
  files,
  updateCroppedFile,
  deleteFile,
  addImage,
  setAsCurrentFile,
  apiRef,
}: CropStepProps) => {
  const [isSelectImagesOpen, setIsSelectImagesOpen] = useState(false)
  const [isExpandImageOpen, setIsExpandImageOpen] = useState(false)
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatio>(AspectRatio.SQUARE)

  const selectImagesRef = useRef<HTMLDivElement>(null)
  const expandImageRef = useRef<HTMLDivElement>(null)

  const currentFile = files[currentFileIndex]
  const imageUrl = currentFile.url

  const openExpandImageMenuHandler = () => {
    setIsExpandImageOpen(prev => !prev)
  }

  const openSelectImageMenuHandler = () => {
    setIsSelectImagesOpen(prev => !prev)
  }

  const onAddImageHandler = () => {
    addImage()
  }

  const onSelectAspectRatioHandler = (aspectRatio: AspectRatio) => {
    setSelectedAspectRatio(aspectRatio)
    setIsExpandImageOpen(false)
  }

  const aspectMap: Record<AspectRatio, number> = {
    [AspectRatio.SQUARE]: 1,
    [AspectRatio.PORTRAIT]: 4 / 5,
    [AspectRatio.WIDESCREEN]: 16 / 9,
  }

  const aspect = aspectMap[selectedAspectRatio]

  const handleSelectCropPostImagesBlockClickOutside = (event: MouseEvent) => {
    if (selectImagesRef.current && !selectImagesRef.current.contains(event.target as Node)) {
      setIsSelectImagesOpen(false)
    }
  }

  const handleExpandImageBlockClickOutside = (event: MouseEvent) => {
    if (expandImageRef.current && !expandImageRef.current.contains(event.target as Node)) {
      setIsExpandImageOpen(false)
    }
  }

  useEffect(() => {
    if (!isSelectImagesOpen) return
    document.addEventListener('mousedown', handleSelectCropPostImagesBlockClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleSelectCropPostImagesBlockClickOutside)
    }
  }, [isSelectImagesOpen])

  useEffect(() => {
    if (!isExpandImageOpen) return
    document.addEventListener('mousedown', handleExpandImageBlockClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleExpandImageBlockClickOutside)
    }
  }, [isExpandImageOpen])

  return (
    <div className={s.imageContent}>
      <CropImage
        key={currentFile.id}
        imageUrl={imageUrl}
        fileId={currentFile.id}
        aspect={aspect}
        updateCroppedFile={updateCroppedFile}
        apiRef={apiRef}
      >
        <Button className={clsx(s.iconButton, s.expandButton)} onClick={openExpandImageMenuHandler}>
          <ExpandOutline
            size={36}
            backgroundColor={'var(--color-dark-500)'}
            svgProps={{
              className: s.icon,
            }}
          />
        </Button>
        <Button className={clsx(s.iconButton, s.imageButton)} onClick={openSelectImageMenuHandler}>
          <ImageOutline
            size={36}
            backgroundColor={'var(--color-dark-500)'}
            svgProps={{
              className: s.icon,
            }}
          />
        </Button>

        <ExpandCropPostImageBlock
          ref={expandImageRef}
          isOpen={isExpandImageOpen}
          selectedAspectRatio={selectedAspectRatio}
          onSelectAspectRatio={onSelectAspectRatioHandler}
        />

        <SelectCropPostImagesBlock
          ref={selectImagesRef}
          currentFileIndex={currentFileIndex}
          files={files}
          isOpen={isSelectImagesOpen}
          onAddImage={onAddImageHandler}
          setAsCurrentFile={setAsCurrentFile}
          deleteFile={deleteFile}
        />
      </CropImage>
    </div>
  )
}
