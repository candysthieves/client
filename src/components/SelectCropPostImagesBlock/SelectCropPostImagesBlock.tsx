import { Button, Cards, clsx, PlusCircleOutline } from '@candy.thieves/ui-kit-lumos'
import { Ref } from 'react'
import s from './SelectCropPostImagesBlock.module.scss'

type SelectCropPostImagesBlockProps = {
  isOpen: boolean
  onAddImage: () => void
  ref?: Ref<HTMLDivElement>
}

export const SelectCropPostImagesBlock = ({
  isOpen,
  onAddImage,
  ref,
}: SelectCropPostImagesBlockProps) => {
  const addNewPostImageHandler = () => {
    console.log('addNewPostImageHandler')
    onAddImage()
  }

  return (
    <div ref={ref}>
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
    </div>
  )
}
