'use client'

import { Button, Input, Typography } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { FormInput } from '@/components/FormInput'
import { FormTextArea } from '@/components/FormTextArea'
import { ToastError, ToastSuccess } from '@/components/Toast/Toast'
import { MAX_ABOUT_ME_LENGTH } from '@/constants'
import { ApiError } from '@/lib/api'
import {
  type EditProfileRequest,
  editProfileSchema,
  type MyProfileResponse,
  PROFILE_SETTINGS_SAVED_MESSAGE,
  SERVER_UNAVAILABLE_ERROR_MESSAGE,
  SERVER_UNAVAILABLE_ERROR_TITLE,
} from '@/lib/model'
import { useMyProfile, useUpdateMyProfile } from '@/lib/profile'
import {
  isErrorResponse,
  mapEditProfileDomainError,
  mapEditProfileValidationError,
} from '@/lib/utils'
import s from './GeneralInformationForm.module.scss'

const SERVER_ERROR_MIN_STATUS = 500

// fetch rejects with a TypeError when the server is unreachable, so anything that is not an ApiError is a network failure.
const isServerUnavailableError = (error: Error) =>
  !(error instanceof ApiError) || error.status >= SERVER_ERROR_MIN_STATUS

const showServerUnavailableToast = () =>
  ToastError({ title: SERVER_UNAVAILABLE_ERROR_TITLE, messages: SERVER_UNAVAILABLE_ERROR_MESSAGE })

const toFormValues = (profile: MyProfileResponse): EditProfileRequest => ({
  username: profile.username,
  firstName: profile.firstName ?? '',
  lastName: profile.lastName ?? '',
  aboutMe: profile.aboutMe ?? '',
})

export const GeneralInformationForm = () => {
  const { data: profile, isPending: isProfileLoading, error: profileError } = useMyProfile()
  const { mutate: updateProfile, isPending: isSaving } = useUpdateMyProfile()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<EditProfileRequest>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      aboutMe: '',
    },
    values: profile ? toFormValues(profile) : undefined,
    resetOptions: { keepDirtyValues: true },
  })

  const aboutMeValue = useWatch({ control, name: 'aboutMe' })

  useEffect(() => {
    // Auth errors (401) are handled by the protected layout, so only report an unreachable server here.
    if (profileError && isServerUnavailableError(profileError)) {
      showServerUnavailableToast()
    }
  }, [profileError])

  const handleSaveError = (error: Error) => {
    if (error instanceof ApiError && isErrorResponse(error.data)) {
      const isValidationError = mapEditProfileValidationError(error, setError)
      const isDomainError = mapEditProfileDomainError(error, setError)

      if (!isValidationError && !isDomainError) {
        ToastError({ messages: error.data.errorsMessages })
      }
      return
    }

    // Network failure or 5xx: the form keeps the entered values, but nothing was saved.
    if (isServerUnavailableError(error)) {
      showServerUnavailableToast()
      return
    }

    ToastError({ messages: error.message })
  }

  const onSubmit = handleSubmit(({ username, firstName, lastName, aboutMe }) => {
    // Date of birth, country and city are visual placeholders for now and are not sent.
    updateProfile(
      { username, firstName, lastName, aboutMe: aboutMe || null },
      {
        onSuccess: () => ToastSuccess({ message: PROFILE_SETTINGS_SAVED_MESSAGE }),
        onError: handleSaveError,
      }
    )
  })

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className={s.fields}>
        <FormInput
          control={control}
          name={'username'}
          label={'Username'}
          placeholder={'Epam11'}
          autoComplete={'username'}
          required
          aria-invalid={Boolean(errors.username)}
        />

        <FormInput
          control={control}
          name={'firstName'}
          label={'First Name'}
          placeholder={'John'}
          required
          aria-invalid={Boolean(errors.firstName)}
        />

        <FormInput
          control={control}
          name={'lastName'}
          label={'Last Name'}
          placeholder={'Doe'}
          required
          aria-invalid={Boolean(errors.lastName)}
        />

        {/* Placeholder: real calendar date-picker is being built separately and will replace this input. */}
        <Input label={'Date of birth'} placeholder={'dd.mm.yyyy'} disabled />

        {/* Placeholder: country/city picker library is still being chosen by the team. */}
        <div className={s.locationRow}>
          <Input label={'Select your country'} placeholder={'Country'} disabled />
          <Input label={'Select your city'} placeholder={'City'} disabled />
        </div>

        <div className={s.aboutMeField}>
          <FormTextArea
            control={control}
            name={'aboutMe'}
            label={'About Me'}
            maxLength={MAX_ABOUT_ME_LENGTH}
            aria-invalid={Boolean(errors.aboutMe)}
          />
          <Typography variant={'caption1'} color={'var(--color-light-900)'} className={s.counter}>
            {aboutMeValue?.length ?? 0}/{MAX_ABOUT_ME_LENGTH}
          </Typography>
        </div>
      </div>

      <hr className={s.divider} />

      <div className={s.actions}>
        <Button type={'submit'} disabled={!isValid || isSaving || isProfileLoading}>
          Save changes
        </Button>
      </div>
    </form>
  )
}
