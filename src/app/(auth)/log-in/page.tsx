'use client'

import {
  Button,
  FormInput,
  GithubRepo,
  Google,
  PasswordInput,
  Typography,
} from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { ApiError, login } from '@/app/lib/api'
import { isErrorResponse } from '@/app/lib/isErrorResponse'
import { ToastError } from '@/components/Toast/Toast'
import { type LoginRequest, loginSchema } from '@/features/auth/model'
import s from './log-in-form.module.scss'

export default function LogInForm() {
  const router = useRouter()

  const {
    register,
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
      await login(data)
      router.push('/account')
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
        <Typography variant={'h1'} className={s.title}>
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

        <FormInput
          placeholder={'Epam@epam.com'}
          control={control}
          name={'email'}
          label={'Email'}
          error={errors.email?.message}
        />

        <PasswordInput
          label={'Password'}
          placeholder={'**********'}
          error={errors.password?.message}
          {...register('password')}
        />

        <Typography
          href={'#forgot'}
          variant={'body1'}
          color={'var(--color-light-900)'}
          align={'right'}
          className={s.forgotPassword}
        >
          Forgot Password
        </Typography>

        <Button type={'submit'} fullWidth disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </Button>

        <div className={s.footer}>
          <Typography variant={'subtitle1'} align={'center'}>
            Don&apos;t have an account?
          </Typography>

          <Button as={'button'} disabled={false} onClick={() => {}} variant={'text'}>
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  )
}
