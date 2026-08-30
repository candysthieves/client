import { Button, Cards, ImageOutline, Tooltip } from '@candy.thieves/ui-kit-lumos'
import { ChangeEvent, useRef, useState } from 'react'
import { clearPostDraft, isPostDraftExist } from '@/lib/utils'
import s from './UploadStep.module.scss'

type UploadStepProps = {
  onFileSelected: (file: File) => void
  onLoadDraft?: () => void
}

export const UploadStep = ({ onFileSelected, onLoadDraft }: UploadStepProps) => {
  const [hasPostDraft, setHasPostDraft] = useState(isPostDraftExist())
  const fileInputRef = useRef<HTMLInputElement>(null)

  const TOOLTIP_MESSAGE = hasPostDraft ? '' : "You don't have any saved drafts to create a post"

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

  const handleClearPostDraft = () => {
    clearPostDraft()
    setHasPostDraft(false)
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

        <Tooltip content={TOOLTIP_MESSAGE}>
          <div className={s.openDraftButtonWrapper}>
            <Button
              type={'button'}
              variant={'outlined'}
              onClick={onLoadDraft}
              fullWidth
              disabled={!hasPostDraft}
            >
              Open Draft
            </Button>
          </div>
        </Tooltip>

        {hasPostDraft && (
          <Button type={'button'} variant={'secondary'} onClick={handleClearPostDraft} fullWidth>
            Delete Draft
          </Button>
        )}
      </div>
    </div>
  )
}
