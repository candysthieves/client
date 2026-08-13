import { PasswordInput, type PasswordInputProps } from '@candy.thieves/ui-kit-lumos'
import { type Control, Controller, type FieldPath, type FieldValues } from 'react-hook-form'

export type FormPasswordInputProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
} & Omit<PasswordInputProps, 'name' | 'onBlur' | 'onChange' | 'value'>

export const FormPasswordInput = <T extends FieldValues>({
  control,
  name,
  ...props
}: FormPasswordInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <PasswordInput {...field} {...props} error={fieldState.error?.message} />
      )}
    />
  )
}
