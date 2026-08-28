import { Button, Cards, ImageOutline } from '@candy.thieves/ui-kit-lumos'
import { useRef } from 'react'
import s from './UploadStep.module.scss'

type UploadStepProps = {
  onFileSelected: (file: File) => void
}

export const UploadStep = ({ onFileSelected }: UploadStepProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

        <Button type={'button'} variant={'outlined'} fullWidth>
          Open Draft
        </Button>
      </div>
    </div>
  )
}
