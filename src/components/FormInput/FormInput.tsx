'use client'

import { Input, type InputProps } from '@candy.thieves/ui-kit-lumos'
import { type Control, Controller, type FieldPath, type FieldValues } from 'react-hook-form'

export type FormInputProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
} & Omit<InputProps, 'name' | 'onBlur' | 'onChange' | 'value'>

export const FormInput = <T extends FieldValues>({
  control,
  name,
  ...props
}: FormInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Input {...field} {...props} error={fieldState.error?.message} />
      )}
    />
  )
}
