import { z } from 'zod'
import { ErrorStatus } from '@/lib/api/enums'
import {
  PASSWORD_PATTERN,
  PASSWORD_PATTERN_MESSAGE,
  USERNAME_PATTERN,
  USERNAME_PATTERN_MESSAGE,
} from './constants'

export const usernameSchema = z
  .string()
  .min(6, 'username must be longer than or equal to 6 characters')
  .max(30, 'username must be shorter than or equal to 30 characters')
  .regex(USERNAME_PATTERN, USERNAME_PATTERN_MESSAGE)

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .pipe(z.email('The email must match the format example@example.com'))

export const passwordBaseSchema = z
  .string()
  .min(6, 'password must be longer than or equal to 6 characters')
  .max(20, 'password must be shorter than or equal to 20 characters')

export const passwordSchema = passwordBaseSchema.regex(PASSWORD_PATTERN, PASSWORD_PATTERN_MESSAGE)

export const recaptchaTokenSchema = z.string().min(1, 'recaptchaToken should not be empty')

export const recoveryCodeSchema = z.string().min(1, 'Recovery code is required')

// export const termsAcceptedSchema = z.literal(true, {
//   error: 'isTermsAccepted must be equal to true',
// })

export const termsAcceptedSchema = z.boolean().refine(val => val === true, {
  message: 'You must accept the terms and conditions',
})

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordBaseSchema,
})

export const registrationSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    passwordConfirmation: passwordSchema,
    isTermsAccepted: termsAcceptedSchema,
  })
  .refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  })

export const registrationConfirmationSchema = z.object({
  code: z
    .string()
    .min(36, 'Confirmation code must be exactly 36 characters')
    .max(36, 'Confirmation code must be exactly 36 characters'),
})

export const resendConfirmationEmailSchema = z.object({
  email: emailSchema,
})

export const passwordRecoverySchema = z.object({
  email: emailSchema,
  recaptchaToken: recaptchaTokenSchema,
})

export const validatePasswordRecoveryCodeSchema = z.object({
  recoveryCode: recoveryCodeSchema,
})

export const newPasswordSchema = z
  .object({
    recoveryCode: recoveryCodeSchema,
    newPassword: passwordSchema,
    newPasswordConfirmation: passwordSchema,
  })
  .refine(({ newPassword, newPasswordConfirmation }) => newPassword === newPasswordConfirmation, {
    message: 'Passwords must match',
    path: ['newPasswordConfirmation'],
  })

export const accessTokenResponseSchema = z.object({
  accessToken: z.string(),
})

export const loginResponseSchema = accessTokenResponseSchema

export const errorMessageSchema = z.object({
  field: z.string(),
  message: z.string(),
})

export const apiErrorResponseSchema = z.object({
  code: z.enum(ErrorStatus),
  errorsMessages: z.array(errorMessageSchema),
})
