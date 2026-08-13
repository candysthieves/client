'use client'

import { Button, GithubRepo, Google, Typography } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FormInput } from '@/components/FormInput'
import { FormPasswordInput } from '@/components/FormPasswordInput'
import { ToastError } from '@/components/Toast/Toast'
import { ApiError, login } from '@/lib/api'
import { type LoginRequest, loginSchema } from '@/lib/model'
import { isErrorResponse } from '@/lib/utils'
import s from './sign-in-form.module.scss'

export default function LogInForm() {
  const router = useRouter()

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

  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await login(data)

      localStorage.setItem('accessToken', response.accessToken)
      router.push('/profile')
    } catch (error) {
      if (error instanceof ApiError && isErrorResponse(error.data)) {
        error.data.errorsMessages.forEach(({ field, message }) => {
          if (field === 'email' || field === 'password') {
            setError(field, { message })
          }
        })

        ToastError({
          messages: error.data.errorsMessages,
        })
        return
      }

      ToastError({
        messages: 'Network error. Please try again later',
      })
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
          <FormInput
            placeholder={'Epam@epam.com'}
            control={control}
            name={'email'}
            label={'Email'}
            error={errors.email?.message}
          />

          <FormPasswordInput
            control={control}
            name={'password'}
            label={'Password'}
            placeholder={'**********'}
            error={errors.password?.message}
          />
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
    </div>
  )
}
