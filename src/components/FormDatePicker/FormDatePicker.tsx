'use client'

import { DatePicker, type DatePickerProps } from '@candy.thieves/ui-kit-lumos'
import { type Control, Controller, type FieldPath, type FieldValues } from 'react-hook-form'
import { formDateToPickerDate, pickerDateToFormDate } from '@/lib/utils'

export type FormDatePickerProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
} & Omit<DatePickerProps, 'defaultValue' | 'error' | 'mode' | 'onChange' | 'value'>

export const FormDatePicker = <T extends FieldValues>({
  control,
  name,
  ...props
}: FormDatePickerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <DatePicker
          {...props}
          mode={'single'}
          value={formDateToPickerDate(field.value ?? '')}
          error={fieldState.error?.message}
          onBlur={() => field.onBlur()}
          onChange={value =>
            field.onChange(pickerDateToFormDate(value instanceof Date ? value : undefined))
          }
        />
      )}
    />
  )
}
