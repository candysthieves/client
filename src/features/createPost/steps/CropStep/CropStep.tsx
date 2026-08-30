import {
  Button,
  clsx,
  Expand,
  ExpandOutline,
  ImageOutline,
  MaximizeOutline,
  PlusCircleOutline,
} from '@candy.thieves/ui-kit-lumos'
import { useState } from 'react'
import { SelectCropPostImagesBlock } from '@/components/SelectCropPostImagesBlock'
import s from './CropStep.module.scss'

type CropStepProps = {
  file: File
  addImage: () => void
}

export const CropStep = ({ file, addImage }: CropStepProps) => {
  const [isSelectImagesOpen, setIsSelectImagesOpen] = useState(false)

  const imageUrl = URL.createObjectURL(file)

  const openExpandImageMenuHandler = () => console.log('openExpandImageMenuHandler')
  const openMaximizeImageSliderHandler = () => console.log('openMaximizeImageSliderHandler')

  const openSelectImageMenuHandler = () => {
    setIsSelectImagesOpen(prev => !prev)
  }

  const onAddImageHandler = () => {
    setIsSelectImagesOpen(false) // delete later
    console.log('onAddImageHandler')
  }

  return (
    <div className={s.imageContent}>
      <img src={imageUrl} alt={'Crop preview'} className={s.imageItem} />
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

      <SelectCropPostImagesBlock isOpen={isSelectImagesOpen} onAddImage={onAddImageHandler} />
    </div>
  )
}

// URL.createObjectURL() во время render не оставлять.
// позже добавлю useEffect/useMemo + URL.revokeObjectURL()
// либо буду передавать уже подготовленный preview URL.
