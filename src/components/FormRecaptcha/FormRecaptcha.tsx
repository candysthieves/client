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
  onVerify?: (token: string) => void
}

const FormRecaptchaInner = <T extends FieldValues>(
  { control, name, onVerify, ...recaptchaProps }: FormRecaptchaProps<T>,
  ref: Ref<ReCAPTCHA>
) => {
  const {
    field: { onChange: setToken },
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  const handleTokenChange = (token: null | string) => {
    setToken(token)

    if (token) {
      onVerify?.(token)
    }
  }

  const handleExpired = () => setToken('')

  return (
    <Recaptcha
      ref={ref}
      {...recaptchaProps}
      onChange={handleTokenChange}
      onExpired={handleExpired}
      errorMessage={error?.message}
    />
  )
}

export const FormRecaptcha = forwardRef(FormRecaptchaInner) as <T extends FieldValues>(
  props: FormRecaptchaProps<T> & { ref?: Ref<ReCAPTCHA> }
) => ReturnType<typeof FormRecaptchaInner>
