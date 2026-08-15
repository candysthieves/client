import { useController, type Control, type FieldValues, type Path } from 'react-hook-form'
import { Recaptcha, type RecaptchaProps } from '@/components/Recaptcha'

export type FormRecaptchaProps<T extends FieldValues> = Omit<
  RecaptchaProps,
  'errorMessage' | 'onChange' | 'onExpired'
> & {
  control: Control<T>
  name: Path<T>
}

export const FormRecaptcha = <T extends FieldValues>({
  control,
  name,
  ...props
}: FormRecaptchaProps<T>) => {
  const {
    field: { onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return (
    <Recaptcha
      {...props}
      onChange={onChange}
      onExpired={() => onChange('')}
      errorMessage={error?.message}
    />
  )
}
