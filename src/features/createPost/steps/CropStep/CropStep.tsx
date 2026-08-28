import { Button, PlusCircleOutline } from '@candy.thieves/ui-kit-lumos'
import s from './CropStep.module.scss'

type CropStepProps = {
  file: File
  addImage: () => void
}

export const CropStep = ({ file, addImage }: CropStepProps) => {
  const imageUrl = URL.createObjectURL(file)

  return (
    <div className={s.imageContent}>
      <img src={imageUrl} alt={'Crop preview'} className={s.imageItem} />
      <Button className={s.addImageButton} onClick={addImage}>
        <PlusCircleOutline size={24} />
      </Button>
    </div>
  )
}

// URL.createObjectURL() во время render не оставлять.
// позже добавлю useEffect/useMemo + URL.revokeObjectURL()
// либо буду передавать уже подготовленный preview URL.
