import {
  Button,
  clsx,
  ExpandOutline,
  ImageOutline,
  MaximizeOutline,
} from '@candy.thieves/ui-kit-lumos'
import { useEffect, useRef, useState } from 'react'
import { ExpandCropPostImageBlock } from '@/components/ExpandCropPostImageBlock'
import { SelectCropPostImagesBlock } from '@/components/SelectCropPostImagesBlock'
import { AspectRatio, PostFile } from '@/features/createPost'
import { CropImagePreview } from '@/features/createPost/steps/CropStep/CropImagePreview'
import s from './CropStep.module.scss'

type CropStepProps = {
  currentFileIndex: number
  files: PostFile[]
  updateCroppedFile: (fileId: string, newFile: File) => void
  deleteFile: (fileId: string) => void
  setAsCurrentFile: (index: number) => void
  addImage: () => void
}

export const CropStep = ({
  currentFileIndex,
  files,
  updateCroppedFile,
  deleteFile,
  addImage,
  setAsCurrentFile,
}: CropStepProps) => {
  const [isSelectImagesOpen, setIsSelectImagesOpen] = useState(false)
  const [isExpandImageOpen, seIsExpandImageOpen] = useState(false)

  const selectImagesRef = useRef<HTMLDivElement>(null)
  const expandImageRef = useRef<HTMLDivElement>(null)

  const currentFile = files[currentFileIndex]

  const openExpandImageMenuHandler = () => {
    seIsExpandImageOpen(prev => !prev)
  }

  const openMaximizeImageSliderHandler = () => console.log('openMaximizeImageSliderHandler')

  const openSelectImageMenuHandler = () => {
    setIsSelectImagesOpen(prev => !prev)
  }

  const onAddImageHandler = () => {
    addImage()
    setIsSelectImagesOpen(false) // delete later
  }

  const onSelectAspectRatioHandler = (aspectRatio: AspectRatio) => {
    seIsExpandImageOpen(false) // delete later
    console.log('onSelectAspectRatioHandler:', aspectRatio)
  }

  const handleSelectCropPostImagesBlockClickOutside = (event: MouseEvent) => {
    if (selectImagesRef.current && !selectImagesRef.current.contains(event.target as Node)) {
      setIsSelectImagesOpen(false)
    }
  }

  const handleExpandImageBlockClickOutside = (event: MouseEvent) => {
    if (expandImageRef.current && !expandImageRef.current.contains(event.target as Node)) {
      seIsExpandImageOpen(false)
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
      <CropImagePreview
        key={currentFile.id}
        src={currentFile?.url || ''}
        alt={'Crop image preview'}
        className={s.imageItem}
      />

      <Button className={clsx(s.iconButton, s.expandButton)} onClick={openExpandImageMenuHandler}>
        <ExpandOutline
          size={36}
          backgroundColor={'var(--color-dark-500)'}
          svgProps={{
            className: s.icon,
          }}
        />
      </Button>
      <Button
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
    </div>
  )
}

// To start cropping the image, access the file you want to crop inside CropStep:
// const currentFile = files[currentFileIndex]  =>  { file: {}, id: string, url: string }
//
// After cropping set updated cropped file back to the CreatePostModal state:
// updateCroppedFile(fileId, File)
