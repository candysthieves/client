'use client'

import { Button, Typography } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { ToastError, ToastSuccess } from '@/components'
import { FormPasswordInput } from '@/components/FormPasswordInput'
import { ApiError } from '@/lib/api'
import { useNewPassword } from '@/lib/auth'
import { type NewPasswordRequest, newPasswordSchema } from '@/lib/model'
import {
  isErrorResponse,
  mapNewPasswordDomainError,
  mapNewPasswordValidationError,
} from '@/lib/utils'
import s from './page.module.scss'

export const NewPasswordContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const recoveryCode = searchParams.get('recoveryCode') ?? ''
  const { mutate: createNewPassword, isPending } = useNewPassword()

  const {
    control,
    handleSubmit,
    setError,
    trigger,
    formState: { errors, isValid },
  } = useForm<NewPasswordRequest>({
    resolver: zodResolver(newPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      newPassword: '',
      newPasswordConfirmation: '',
      recoveryCode,
    },
  })

  const newPassword = useWatch({ control, name: 'newPassword' })
  const newPasswordConfirmation = useWatch({ control, name: 'newPasswordConfirmation' })

  useEffect(() => {
    if (newPassword && newPasswordConfirmation) {
      void trigger('newPasswordConfirmation')
    }
  }, [newPassword, newPasswordConfirmation, trigger])

  useEffect(() => {
    if (!recoveryCode) {
      router.replace('/password-recovery-link-expired')
    }
  }, [recoveryCode, router])

  const onSubmit: SubmitHandler<NewPasswordRequest> = data => {
    createNewPassword(data, {
      onSuccess: () => {
        router.replace('/sign-in')

        ToastSuccess({
          title: 'Password updated',
          message: 'You have successfully changed your password',
        })
      },

      onError: error => {
        if (error instanceof ApiError && isErrorResponse(error.data)) {
          const isValidationError = mapNewPasswordValidationError(error, setError)
          const isDomainError = mapNewPasswordDomainError(error, setError)

          if (isDomainError) {
            ToastError({
              title: 'Email verification Error',
              messages: 'Email verification link invalid. Resend verification link',
            })
            router.replace('/password-recovery-link-expired')
          } else if (isValidationError) {
            ToastError({
              title: 'Validation Error',
              messages: error.data.errorsMessages,
            })
          }
          return
        }
        throw error
      },
    })
  }

  if (!recoveryCode) {
    return null
  }

  return (
    <main className={s.page}>
      <form className={s.card} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography
          variant={'h1'}
          color={'var(--color-text-primary)'}
          align={'center'}
          mb={'2.875rem'}
        >
          Create New Password
        </Typography>

        <div className={s.fields}>
          <div>
            <FormPasswordInput
              control={control}
              name={'newPassword'}
              label={'New password'}
              placeholder={'**********'}
              error={errors.newPassword?.message}
            />
          </div>

          <div>
            <FormPasswordInput
              control={control}
              name={'newPasswordConfirmation'}
              label={'Password confirmation'}
              placeholder={'**********'}
              error={errors.newPasswordConfirmation?.message}
            />
          </div>
        </div>

        <div className={s.descriptionWrapper}>
          <Typography variant={'body2'} color={'var(--color-light-900)'} className={s.description}>
            Your password must be between 6 and 20 characters
          </Typography>
        </div>

        <div className={s.submit}>
          <Button type={'submit'} fullWidth disabled={!isValid || isPending}>
            Create new password
          </Button>
        </div>
      </form>
    </main>
  )
}
