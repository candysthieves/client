import { type Control, Controller, type FieldPath, type FieldValues } from 'react-hook-form'
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
//
// export const FormProfileLocationSelect = <T extends FieldValues>({
//   control,
//   countryName,
//   cityName,
//   disabled,
//   ...props
// }: FormProfileLocationSelectProps<T>) => {
//   return (
//     <Controller
//       control={control}
//       name={countryName}
//       render={({ field: countryField }) => (
//         <Controller
//           control={control}
//           name={cityName}
//           render={({ field: cityField, fieldState }) => (
//             <ProfileLocationSelect
//               value={{
//                 countryId: (countryField.value as null | number) ?? null,
//                 cityId: (cityField.value as null | number) ?? null,
//               }}
//               onChange={next => {
//                 countryField.onChange(next.countryId)
//                 cityField.onChange(next.cityId)
//               }}
//               onBlur={() => {
//                 countryField.onBlur()
//                 cityField.onBlur()
//               }}
//               disabled={disabled}
//               error={fieldState.error?.message}
//               {...props}
//             />
//           )}
//         />
//       )}
//     />
//   )
// }

import { useController } from 'react-hook-form'

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
      error={country.fieldState.error?.message ?? city.fieldState.error?.message}
    />
  )
}
