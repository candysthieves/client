'use client'

import { Button, Typography } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { ToastError } from '@/components'
import { FormPasswordInput } from '@/components/FormPasswordInput'
import { ApiError, newPassword as createNewPassword, validatePasswordRecoveryCode } from '@/lib/api'
import { newPasswordSchema, type NewPasswordRequest } from '@/lib/model'
import {
  isErrorResponse,
  mapNewPasswordDomainError,
  mapNewPasswordValidationError,
} from '@/lib/utils'
import s from './page.module.scss'

export default function CreateNewPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const recoveryCode = searchParams.get('code') ?? searchParams.get('recoveryCode') ?? ''
  const [isCheckingCode, setIsCheckingCode] = useState(true)

  const {
    control,
    handleSubmit,
    setError,
    trigger,
    formState: { errors, isSubmitting, isValid },
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
    let isMounted = true

    const checkRecoveryCode = async () => {
      if (!recoveryCode) {
        router.replace('/recovery-link-expired')
        return
      }

      try {
        await validatePasswordRecoveryCode({ recoveryCode })

        if (isMounted) {
          setIsCheckingCode(false)
        }
      } catch (error) {
        if (error instanceof ApiError) {
          router.replace('/recovery-link-expired')
          return
        }

        if (isMounted) {
          setIsCheckingCode(false)
        }

        ToastError({
          title: 'Error',
          messages: 'Something went wrong. Please try again later.',
        })
      }
    }

    void checkRecoveryCode()

    return () => {
      isMounted = false
    }
  }, [recoveryCode, router])

  useEffect(() => {
    if (newPassword && newPasswordConfirmation) {
      void trigger('newPasswordConfirmation')
    }
  }, [newPassword, newPasswordConfirmation, trigger])

  const onSubmit: SubmitHandler<NewPasswordRequest> = async data => {
    try {
      await createNewPassword(data)
      router.push('/sign-in')
    } catch (error) {
      if (error instanceof ApiError && isErrorResponse(error.data)) {
        const domainError = mapNewPasswordDomainError(error)

        if (domainError === 'recovery-link-expired') {
          router.replace('/recovery-link-expired')
          return
        }

        const isValidationError = mapNewPasswordValidationError(error, setError)

        if (isValidationError) {
          ToastError({
            title: 'Validation Error',
            messages: error.data.errorsMessages,
          })
        }
        return
      }

      ToastError({
        title: 'Error',
        messages: 'Something went wrong. Please try again later.',
      })
    }
  }

  if (isCheckingCode) {
    return null
  }

  return (
    <div className={s.page}>
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
          <div className={s.field}>
            <FormPasswordInput
              control={control}
              name={'newPassword'}
              label={'New password'}
              placeholder={'**********'}
              error={errors.newPassword?.message}
            />
          </div>

          <div className={s.field}>
            <FormPasswordInput
              control={control}
              name={'newPasswordConfirmation'}
              label={'Password confirmation'}
              placeholder={'**********'}
              error={errors.newPasswordConfirmation?.message}
            />
          </div>
        </div>

        <Typography variant={'body2'} color={'var(--color-light-900)'} className={s.description}>
          Your password must be between 6 and 20 characters
        </Typography>

        <div className={s.submit}>
          <Button type={'submit'} fullWidth disabled={!isValid || isSubmitting || isCheckingCode}>
            Create new password
          </Button>
        </div>
      </form>
    </div>
  )
}
