'use client'

import { Button, GithubRepo, Google, Typography } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { GitHubButton, GoogleButton } from '@/components'
import { FormInput } from '@/components/FormInput'
import { FormPasswordInput } from '@/components/FormPasswordInput'
import { ToastError, ToastSuccess } from '@/components/Toast/Toast'
import { ApiError, login } from '@/lib/api'
import {
  ACCESS_TOKEN_LS_KEY,
  type LoginRequest,
  loginSchema,
  SIGN_IN_SUCCESS_MESSAGE,
  SIGN_IN_SUCCESS_TITLE,
} from '@/lib/model'
import { isErrorResponse, mapLoginDomainError, mapLoginValidationError } from '@/lib/utils'
import s from './page.module.scss'

export default function SignInForm() {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginRequest>({
    // resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginRequest> = async data => {
    try {
      // setIsLoading(true)
      const response = await login(data)

      localStorage.setItem(ACCESS_TOKEN_LS_KEY, response.accessToken)

      ToastSuccess({
        title: SIGN_IN_SUCCESS_TITLE,
        message: SIGN_IN_SUCCESS_MESSAGE,
      })

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
        } else if (isDomainError) {
          ToastError({
            title: 'Domain Error',
            messages: error.data.errorsMessages,
          })
        }
        return
      } else {
        throw error // Проброс в глобальный error handler всех остальных ошибок не связанных с Validation / Domain errors - позже будет доработка логики
      }
    }
    // finally {
    //   setIsLoading(false)
    // }
  }

  return (
    <main className={s.pageWrapper}>
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
          <GoogleButton />
          <GitHubButton />
        </div>

        <div className={s.fieldsGroup}>
          <FormInput
            placeholder={'Epam@epam.com'}
            control={control}
            name={'email'}
            label={'Email'}
            // type={'email'}
            type={'text'}
            error={errors.email?.message}
          />

          <div className={s.passwordFieldControl}>
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

        <Button type={'submit'} fullWidth disabled={!isValid || isSubmitting}>
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
    </main>
  )
}
