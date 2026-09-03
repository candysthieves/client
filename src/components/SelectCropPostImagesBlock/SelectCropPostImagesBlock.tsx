import { Button, Cards, CloseOutline, clsx, PlusCircleOutline } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import { Ref, useEffect, useMemo } from 'react'
import { PostFile } from '@/features/createPost'
import s from './SelectCropPostImagesBlock.module.scss'

type SelectCropPostImagesBlockProps = {
  isOpen: boolean
  files: PostFile[]
  onAddImage: () => void
  deleteFile: (fileId: string) => void
  setAsCurrentFile: (index: number) => void
  currentFileIndex?: number
  ref?: Ref<HTMLDivElement>
}

export const SelectCropPostImagesBlock = ({
  isOpen,
  onAddImage,
  deleteFile,
  setAsCurrentFile,
  files,
  currentFileIndex = 0,
  ref,
}: SelectCropPostImagesBlockProps) => {
  const imageUrls = useMemo(() => {
    if (!files || !Array.isArray(files) || files.length === 0) {
      return []
    }

    return files
      .filter(file => file.file instanceof File)
      .map(file => {
        console.log(file)
        return URL.createObjectURL(file.file)
      })
  }, [files])

  const addNewPostImageHandler = () => {
    console.log('addNewPostImageHandler')
    onAddImage()
  }

  useEffect(() => {
    return () => {
      imageUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [imageUrls])

  return (
    <>
      {isOpen && (
        <Cards ref={ref} className={s.selectImagesContent}>
          <Button className={clsx(s.iconButton, s.addImageButton)} onClick={addNewPostImageHandler}>
            <PlusCircleOutline
              size={36}
              svgProps={{
                className: s.addIcon,
              }}
            />
          </Button>

          <div className={s.selectImagesBlock}>
            {imageUrls.length > 0 ? (
              imageUrls.map((url, index) => {
                // const file = files[index]?.file
                // const fileKey = file ? `${file.name}-${file.lastModified}` : `image-${index}`
                const isActive = index === currentFileIndex

                return (
                  <div
                    key={files[index]?.id || index}
                    className={s.selectImageItem}
                    onClick={() => setAsCurrentFile(index)}
                  >
                    <Image
                      width={80}
                      height={82}
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className={clsx(s.imagePreview, {
                        [s.active]: isActive,
                      })}
                    />

                    <Button
                      onClick={() => deleteFile(files[index]?.id)}
                      className={clsx(s.iconButton, s.imageDeleteButton)}
                    >
                      <CloseOutline
                        size={16}
                        backgroundColor={'var(--color-dark-500)'}
                        color={'var(--color-light-100)'}
                        svgProps={{
                          className: s.icon,
                        }}
                      />
                    </Button>
                  </div>
                )
              })
            ) : (
              <div className={s.emptyMessage}>No images selected</div>
            )}
          </div>
        </Cards>
      )}
    </>
  )
}
