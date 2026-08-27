import { Button, Typography } from '@candy.thieves/ui-kit-lumos'

type CropStepProps = {
  file: File
  onNext: () => void
}

export const CropStep = ({ file, onNext }: CropStepProps) => {
  const imageUrl = URL.createObjectURL(file)

  return (
    <div>
      <header>
        <Button type={'button'} variant={'text'}>
          ←
        </Button>

        <Typography variant={'h2'}>Cropping</Typography>

        <Button type={'button'} variant={'text'} onClick={onNext}>
          Next
        </Button>
      </header>

      <img src={imageUrl} alt={''} />
    </div>
  )
}

// URL.createObjectURL() во время render не оставлять.
// позже добавлю useEffect/useMemo + URL.revokeObjectURL()
// либо буду передавать уже подготовленный preview URL.
