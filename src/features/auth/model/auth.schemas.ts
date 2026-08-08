import { z } from 'zod'

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]+$/

export const usernameSchema = z
  .string()
  .min(6, 'Minimum number of characters 6')
  .max(30, 'Maximum number of characters 30')
  .regex(/^[A-Za-z0-9_-]+$/, 'Username can contain only A-Z, a-z, 0-9, _ and -')

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .pipe(z.email('The email must match the format example@example.com'))

export const passwordBaseSchema = z
  .string()
  .min(6, 'Minimum number of characters 6')
  .max(20, 'Maximum number of characters 20')

export const passwordSchema = passwordBaseSchema.regex(
  passwordPattern,
  `Password must contain 0-9, a-z, A-Z, ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ { | } ~`
)

export const recaptchaTokenSchema = z.string().min(1, 'reCAPTCHA token is required')

export const recoveryCodeSchema = z.string().uuid('Invalid recovery code')

export const termsAcceptedSchema = z.literal(true)

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

export const registrationConfirmationSchema = z.object({}).strict()

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

export const apiErrorResponseSchema = z.object({
  errorsMessages: z.array(
    z.object({
      field: z.string(),
      message: z.string(),
    })
  ),
})

export type AccessTokenResponse = z.infer<typeof accessTokenResponseSchema>
export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>
export type LoginRequest = z.infer<typeof loginSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>
export type NewPasswordRequest = z.infer<typeof newPasswordSchema>
export type PasswordRecoveryRequest = z.infer<typeof passwordRecoverySchema>
export type RegistrationConfirmationRequest = z.infer<typeof registrationConfirmationSchema>
export type RegistrationRequest = z.infer<typeof registrationSchema>
export type ResendConfirmationEmailRequest = z.infer<typeof resendConfirmationEmailSchema>
export type ValidatePasswordRecoveryCodeRequest = z.infer<typeof validatePasswordRecoveryCodeSchema>
