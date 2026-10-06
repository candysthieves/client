import { Button } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormProfileLocationSelect } from '@/components/ProfileLocationSelect/FormProfileLocationSelect'
import { EditProfileRequest } from '@/lib/model'
import { editProfileSchema } from '@/lib/model/profileSettings.schemas'

export const TestLocationForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm<EditProfileRequest>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onChange',
    defaultValues: {
      // username: '', // set userName
      // firstName: '',
      // lastName: '',
      // aboutMe: '',
      countryId: null,
      cityId: null,
    },
  })

  const onSubmit = handleSubmit(data => {
    console.log('submit', data)
    alert(JSON.stringify(data, null, 2))
  })

  return (
    <form onSubmit={onSubmit} noValidate>
      <FormProfileLocationSelect control={control} countryName={'countryId'} cityName={'cityId'} />

      {errors.countryId && <p style={{ color: 'red' }}>{errors.countryId.message}</p>}

      <Button type={'submit'} disabled={!isValid || isSubmitting}>
        Save
      </Button>
    </form>
  )
}
