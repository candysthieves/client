import { TextArea, type TextAreaProps } from '@candy.thieves/ui-kit-lumos'
import { type Control, Controller, type FieldPath, type FieldValues } from 'react-hook-form'

type FormTextAreaProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
} & Omit<TextAreaProps, 'defaultValue' | 'onBlur' | 'onChange' | 'value'>

export const FormTextArea = <T extends FieldValues>({
  control,
  name,
  ...props
}: FormTextAreaProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextArea {...props} {...field} error={fieldState.error?.message} />
      )}
    />
  )
}
