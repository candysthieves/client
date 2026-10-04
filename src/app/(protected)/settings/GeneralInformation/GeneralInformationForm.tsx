'use client'

import type { ReactNode } from 'react'
import { Button, Input } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormInput } from '@/components/FormInput'
import { FormTextArea } from '@/components/FormTextArea'
import { ToastError, ToastSuccess } from '@/components/Toast/Toast'
import { MAX_ABOUT_ME_LENGTH } from '@/constants'
import { ApiError } from '@/lib/api'
import {
  type EditProfileRequest,
  editProfileSchema,
  PROFILE_SETTINGS_SAVED_MESSAGE,
} from '@/lib/model'
import { useMyProfile, useUpdateMyProfile } from '@/lib/profile'
import {
  getChangedProfileFields,
  isErrorResponse,
  isServerUnavailableError,
  mapEditProfileDomainError,
  mapEditProfileValidationError,
  showGlobalError,
  showServerUnavailableToast,
  toFormValues,
} from '@/lib/utils'
import s from './GeneralInformationForm.module.scss'

type Props = {
  // Rendered next to the fields, above the divider; the Save button stays below it.
  photoSlot?: ReactNode
}

export const GeneralInformationForm = ({ photoSlot }: Props) => {
  // Load errors are reported by the global query error handler (showGlobalError).
  const { data: profile, isPending: isProfileLoading } = useMyProfile()
  const { mutate: updateProfile, isPending: isSaving } = useUpdateMyProfile()

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isValid, isDirty, dirtyFields },
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

    // Auth errors, unexpected statuses and response-contract violations: same handling as the rest of the app.
    showGlobalError(error)
  }

  const onSubmit = handleSubmit(values => {
    updateProfile(getChangedProfileFields(values, dirtyFields), {
      onSuccess: savedProfile => {
        // Saved values become the new baseline, so the button is disabled until the next change.
        reset(toFormValues(savedProfile))
        ToastSuccess({ message: PROFILE_SETTINGS_SAVED_MESSAGE })
      },
      onError: handleSaveError,
    })
  })

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className={s.content}>
        {photoSlot}

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
            aria-invalid={Boolean(errors.firstName)}
          />

          <FormInput
            control={control}
            name={'lastName'}
            label={'Last Name'}
            placeholder={'Doe'}
            aria-invalid={Boolean(errors.lastName)}
          />

          {/* Placeholder: real calendar date-picker is being built separately and will replace this input. */}
          <Input label={'Date of birth'} placeholder={'dd.mm.yyyy'} disabled />

          {/* Placeholder: country/city picker library is still being chosen by the team. */}
          <div className={s.locationRow}>
            <Input label={'Select your country'} placeholder={'Country'} disabled />
            <Input label={'Select your city'} placeholder={'City'} disabled />
          </div>

          <FormTextArea
            control={control}
            name={'aboutMe'}
            label={'About Me'}
            maxLength={MAX_ABOUT_ME_LENGTH}
            aria-invalid={Boolean(errors.aboutMe)}
          />
        </div>
      </div>

      <div className={s.actions}>
        <Button type={'submit'} disabled={!isDirty || !isValid || isSaving || isProfileLoading}>
          Save changes
        </Button>
      </div>
    </form>
  )
}
