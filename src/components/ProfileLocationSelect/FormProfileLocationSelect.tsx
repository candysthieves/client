import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import {
  ProfileLocationSelect,
  ProfileLocationSelectProps,
  ProfileLocationValue,
} from '@/components/ProfileLocationSelect/ProfileLocationSelect'

export type FormProfileLocationSelectProps<T extends FieldValues> = {
  control: Control<T>
  countryName: FieldPath<T>
  cityName: FieldPath<T>
  disabled?: boolean
} & Omit<ProfileLocationSelectProps, 'onBlur' | 'onChange' | 'value'>

export const FormProfileLocationSelect = <T extends FieldValues>({
  control,
  countryName,
  cityName,
  disabled,
}: FormProfileLocationSelectProps<T>) => {
  const countryIdControl = useController({ control, name: countryName })
  const cityIdControl = useController({ control, name: cityName })

  const locationValue: ProfileLocationValue = {
    countryId: (countryIdControl.field.value as null | number) ?? null,
    cityId: (cityIdControl.field.value as null | number) ?? null,
  }

  const onChangeHandler = (next: ProfileLocationValue) => {
    countryIdControl.field.onChange(next.countryId)
    cityIdControl.field.onChange(next.cityId)
  }

  const onBlurHandler = () => {
    countryIdControl.field.onBlur()
    cityIdControl.field.onBlur()
  }

  return (
    <ProfileLocationSelect
      value={locationValue}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      disabled={disabled}
      countryError={countryIdControl.fieldState.error?.message}
      cityError={cityIdControl.fieldState.error?.message}
    />
  )
}
