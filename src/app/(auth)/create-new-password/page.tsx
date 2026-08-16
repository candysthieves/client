'use client'

import { Button, Typography } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { FormPasswordInput } from '@/components/FormPasswordInput'
import { newPasswordSchema, type NewPasswordRequest } from '@/lib/model'
import s from './page.module.scss'

export default function CreateNewPasswordPage() {
  const searchParams = useSearchParams()
  const recoveryCode = searchParams.get('code') ?? searchParams.get('recoveryCode') ?? ''

  const {
    control,
    handleSubmit,
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
    if (newPassword && newPasswordConfirmation) {
      void trigger('newPasswordConfirmation')
    }
  }, [newPassword, newPasswordConfirmation, trigger])

  const onSubmit: SubmitHandler<NewPasswordRequest> = data => {
    console.log(data)
  }

  return (
    <div className={s.page}>
      <form className={s.card} onSubmit={handleSubmit(onSubmit)}>
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
          <Button type={'submit'} fullWidth disabled={!isValid || isSubmitting}>
            Create new password
          </Button>
        </div>
      </form>
    </div>
  )
}
