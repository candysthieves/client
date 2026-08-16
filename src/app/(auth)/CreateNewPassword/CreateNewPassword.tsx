'use client'

import { Button, Typography } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormPasswordInput } from '@/components/FormPasswordInput'
import { newPasswordSchema, type NewPasswordRequest } from '@/lib/model'
import s from './CreateNewPassword.module.scss'

export default function CreateNewPassword() {
  const searchParams = useSearchParams()
  const recoveryCode = searchParams.get('code') ?? searchParams.get('recoveryCode') ?? ''

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<NewPasswordRequest>({
    resolver: zodResolver(newPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      newPassword: '',
      newPasswordConfirmation: '',
      recoveryCode,
    },
  })

  const onSubmit: SubmitHandler<NewPasswordRequest> = data => {
    console.log(data)
  }

  return (
    <div className={s.pageWrapper}>
      <form className={s.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant={'h1'}
          color={'var(--color-text-primary)'}
          align={'center'}
          mb={'1.25rem'}
        >
          Create New Password
        </Typography>

        <Typography
          variant={'body2'}
          color={'var(--color-light-900)'}
          align={'center'}
          className={s.description}
        >
          Your new password must be different from previously used passwords
        </Typography>

        <div className={s.fieldsGroup}>
          <div className={s.fieldControl}>
            <FormPasswordInput
              control={control}
              name={'newPassword'}
              label={'New password'}
              placeholder={'**********'}
              error={errors.newPassword?.message}
            />
          </div>

          <div className={s.fieldControl}>
            <FormPasswordInput
              control={control}
              name={'newPasswordConfirmation'}
              label={'Password confirmation'}
              placeholder={'**********'}
              error={errors.newPasswordConfirmation?.message}
            />
          </div>
        </div>

        <Button type={'submit'} fullWidth disabled={!isValid || isSubmitting}>
          Create New Password
        </Button>
      </form>
    </div>
  )
}
