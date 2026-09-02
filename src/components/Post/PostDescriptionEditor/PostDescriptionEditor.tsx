import { TextArea, Typography } from '@candy.thieves/ui-kit-lumos'

type Props = {
  value: string
  onChange: (value: string) => void
  className?: string
  textAreaClassName?: string
  counterClassName?: string
}

export const PostDescriptionEditor = ({
  value,
  onChange,
  className,
  textAreaClassName,
  counterClassName,
}: Props) => (
  <div className={className}>
    <TextArea
      label={'Add publication descriptions'}
      value={value}
      onChange={event => onChange(event.target.value)}
      maxLength={500}
      className={textAreaClassName}
    />

    <Typography variant={'caption1'} color={'var(--color-light-900)'} className={counterClassName}>
      {value.length}/500
    </Typography>
  </div>
)
