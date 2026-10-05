import { type Control, type FieldPath, type FieldValues, useController } from 'react-hook-form'
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
  const country = useController({ control, name: countryName })
  const city = useController({ control, name: cityName })

  const locationValue: ProfileLocationValue = {
    countryId: (country.field.value as null | number) ?? null,
    cityId: (city.field.value as null | number) ?? null,
  }

  const onChangeHandler = (next: ProfileLocationValue) => {
    country.field.onChange(next.countryId)
    city.field.onChange(next.cityId)
  }

  const onBlurHandler = () => {
    country.field.onBlur()
    city.field.onBlur()
  }

  return (
    <ProfileLocationSelect
      value={locationValue}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      disabled={disabled}
      countryError={country.fieldState.error?.message}
      cityError={city.fieldState.error?.message}
    />
  )
}
