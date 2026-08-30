import { Button, Cards, clsx, PlusCircleOutline } from '@candy.thieves/ui-kit-lumos'
import s from './SelectCropPostImagesBlock.module.scss'

type SelectCropPostImagesBlockProps = {
  isOpen: boolean
  onAddImage: () => void
}

export const SelectCropPostImagesBlock = ({
  isOpen,
  onAddImage,
}: SelectCropPostImagesBlockProps) => {
  const addNewPostImageHandler = () => {
    console.log('addNewPostImageHandler')
    onAddImage()
  }

  return (
    <>
      {isOpen && (
        <Cards className={s.selectImagesContent}>
          <Button className={clsx(s.iconButton, s.addImageButton)} onClick={addNewPostImageHandler}>
            <PlusCircleOutline
              size={36}
              svgProps={{
                className: s.addIcon,
              }}
            />
          </Button>

          <div className={s.selectImagesBlock}>
            <div className={s.selectImageItem}></div>
            <div className={s.selectImageItem}></div>
            <div className={s.selectImageItem}></div>
          </div>
        </Cards>
      )}
    </>
  )
}
