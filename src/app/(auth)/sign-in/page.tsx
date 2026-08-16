'use client'

import { Button, GithubRepo, Google, Typography } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormInput } from '@/components/FormInput'
import { FormPasswordInput } from '@/components/FormPasswordInput'
import { ToastError } from '@/components/Toast/Toast'
import { ApiError, login } from '@/lib/api'
import { type LoginRequest, loginSchema } from '@/lib/model'
import { isErrorResponse, mapLoginDomainError, mapLoginValidationError } from '@/lib/utils'
import s from './sign-in-form.module.scss'

export default function LogInForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginRequest> = async data => {
    try {
      setIsLoading(true)
      const response = await login(data)

      localStorage.setItem('accessToken', response.accessToken)
      router.replace('/profile')
    } catch (error) {
      if (error instanceof ApiError && isErrorResponse(error.data)) {
        const isValidationError = mapLoginValidationError(error, setError)
        const isDomainError = mapLoginDomainError(error, setError)

        if (isValidationError) {
          ToastError({
            title: 'Validation Error',
            messages: error.data.errorsMessages,
          })
          return
        } else if (isDomainError) {
          ToastError({
            title: 'Domain Error',
            messages: error.data.errorsMessages,
          })
          return
        }
      }

      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={s.pageWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.formContainer}>
        <Typography
          variant={'h1'}
          color={'var(--color-text-primary)'}
          align={'center'}
          mb={'1.25rem'}
        >
          Sign In
        </Typography>

        <div className={s.socialsContainer}>
          <a href={'https://vash-backend.com'} className={s.socialButton}>
            <Google />
          </a>

          <a href={'https://vash-backend.com'} className={`${s.socialButton} ${s.githubIcon}`}>
            <GithubRepo />
          </a>
        </div>

        <div className={s.fieldsGroup}>
          <div className={s.fieldControl}>
            <FormInput
              placeholder={'Epam@epam.com'}
              control={control}
              name={'email'}
              label={'Email'}
              type={'email'}
              error={errors.email?.message}
            />
          </div>

          <div className={s.fieldControl}>
            <FormPasswordInput
              control={control}
              name={'password'}
              label={'Password'}
              placeholder={'**********'}
              error={errors.password?.message}
            />
          </div>
        </div>

        <Link href={'/forgot-password'} className={s.forgotPassword}>
          <Typography variant={'body1'} color={'var(--color-light-900)'} align={'right'}>
            Forgot Password
          </Typography>
        </Link>

        <Button type={'submit'} fullWidth disabled={!isValid || isSubmitting || isLoading}>
          Sign In
        </Button>

        <div className={s.footer}>
          <Typography variant={'subtitle1'} align={'center'}>
            Don&apos;t have an account?
          </Typography>

          <Button as={Link} href={'/sign-up'} variant={'text'}>
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  )
}
