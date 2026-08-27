import { Button, Typography } from '@candy.thieves/ui-kit-lumos'

type PublicationStepProps = {
  files: File[]
  currentFileIndex: number
  description: string
  onPreviousFile: () => void
  onNextFile: () => void
  onDescriptionChange: (value: string) => void
}

export const PublicationStep = ({
  files,
  currentFileIndex,
  description,
  onPreviousFile,
  onNextFile,
  onDescriptionChange,
}: PublicationStepProps) => {
  const currentFile = files[currentFileIndex]

  return (
    <div>
      <header>
        <button type={"button"}>←</button>

        <Typography variant={"h2"}>Publication</Typography>

        <Button type={"button"} variant={"text"}>
          Publish
        </Button>
      </header>

      <div>
        <button type={"button"} onClick={onPreviousFile} disabled={currentFileIndex === 0}>
          ←
        </button>

        <img src={URL.createObjectURL(currentFile)} alt={""} />

        <button type={"button"} onClick={onNextFile} disabled={currentFileIndex === files.length - 1}>
          →
        </button>
      </div>

      <textarea
        value={description}
        onChange={event => onDescriptionChange(event.target.value)}
        placeholder={"Add publication description"}
      />
    </div>
  )
}

// Опять же, createObjectURL здесь потом вынесем.
