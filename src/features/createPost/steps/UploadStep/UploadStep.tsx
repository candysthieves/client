import { Button, Typography } from '@candy.thieves/ui-kit-lumos'

type UploadStepProps = {
  onFileSelected: (file: File) => void
}

export const UploadStep = ({ onFileSelected }: UploadStepProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    onFileSelected(file)
  }

  return (
    <div>
      <Typography variant={"h2"}>Add Photo</Typography>

      <input type={"file"} accept={"image/*"} onChange={handleChange} />

      <Button type={"button"}>Open Draft</Button>
    </div>
  )
}

// здесь UI:
// preview;
// Select from Computer;
// Open Draft.
