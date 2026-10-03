'use client'

import { Button, Typography } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormProfileLocationSelect } from '@/components/ProfileLocationSelect'
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
    // сюда прилетит { location: { countryId, cityId } }
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

      <pre style={{ marginTop: 16, fontSize: 12 }}>
        {JSON.stringify({ isValid, isDirty, errors }, null, 2)}
      </pre>
    </form>
  )
}
export default function Search() {
  return (
    <main>
      <h1>Search</h1>
      <Typography variant={'caption1'}>Search content</Typography>
      <TestLocationForm />
    </main>
  )
}
