import { Checkbox, CheckboxProps } from '@candy.thieves/ui-kit-lumos'
import { useController, type Control, type FieldValues, type Path } from 'react-hook-form'

export type FormCheckboxProps<T extends FieldValues> = Omit<
  CheckboxProps,
  'checked' | 'defaultChecked' | 'onCheckedChange'
> & {
  control: Control<T>
  name: Path<T>
}

export const FormCheckbox = <T extends FieldValues>({
  control,
  name,
  ...props
}: FormCheckboxProps<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
  })

  return <Checkbox {...props} checked={!!value} onCheckedChange={onChange} />
}
