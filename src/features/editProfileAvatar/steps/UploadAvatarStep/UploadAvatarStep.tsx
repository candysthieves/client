import { Button, Cards, ImageOutline } from '@candy.thieves/ui-kit-lumos'
import { ChangeEvent, useRef } from 'react'
import s from './UploadAvatarStep.module.scss'

type UploadStepProps = {
  onFileSelected: (file: File) => void
}

export const UploadAvatarStep = ({ onFileSelected }: UploadStepProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    onFileSelected(file)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div>
      <Cards className={s.uploadMiniature}>
        <ImageOutline size={48} />
      </Cards>

      <input
        ref={fileInputRef}
        type={'file'}
        accept={'image/*'}
        onChange={handleChange}
        className={s.uploadInput}
      />

      <div className={s.uploadControls}>
        <Button type={'button'} variant={'primary'} onClick={handleButtonClick} fullWidth>
          Select from Computer
        </Button>
      </div>
    </div>
  )
}
