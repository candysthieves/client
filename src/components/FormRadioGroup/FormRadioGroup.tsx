'use client'

import { RadioGroup, RadioGroupProps, Typography } from '@candy.thieves/ui-kit-lumos'
import { type Control, Controller, type FieldPath, type FieldValues } from 'react-hook-form'
import s from './FormRadioGroup.module.scss'

export type FormRadioGroupProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
} & Omit<RadioGroupProps, 'name' | 'onBlur' | 'onChange' | 'value'>

export const FormRadioGroup = <T extends FieldValues>({
  control,
  name,
  ...props
}: FormRadioGroupProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={s.radioContainer}>
          <RadioGroup
            {...props}
            name={field.name}
            value={field.value ?? ''}
            onValueChange={field.onChange}
            onBlur={field.onBlur}
            ref={field.ref}
          />
          {fieldState.error && (
            <Typography
              className={s.errorMessage}
              variant={'form-error'}
              color={'var(--color-danger-500)'}
            >
              {fieldState.error.message}
            </Typography>
          )}
        </div>
      )}
    />
  )
}
