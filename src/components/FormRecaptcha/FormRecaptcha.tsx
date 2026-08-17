import type ReCAPTCHA from 'react-google-recaptcha'
import { forwardRef, type Ref } from 'react'
import { useController, type Control, type FieldValues, type Path } from 'react-hook-form'
import { Recaptcha, type RecaptchaProps } from '@/components/Recaptcha'

export type FormRecaptchaProps<T extends FieldValues> = Omit<
  RecaptchaProps,
  'errorMessage' | 'onChange' | 'onExpired'
> & {
  control: Control<T>
  name: Path<T>
}

const FormRecaptchaInner = <T extends FieldValues>(
  { control, name, ...props }: FormRecaptchaProps<T>,
  ref: Ref<ReCAPTCHA>
) => {
  const {
    field: { onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return (
    <Recaptcha
      ref={ref}
      {...props}
      onChange={onChange}
      onExpired={() => onChange('')}
      errorMessage={error?.message}
    />
  )
}

export const FormRecaptcha = forwardRef(FormRecaptchaInner) as <T extends FieldValues>(
  props: FormRecaptchaProps<T> & { ref?: Ref<ReCAPTCHA> }
) => ReturnType<typeof FormRecaptchaInner>
