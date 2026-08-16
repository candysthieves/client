import { z } from 'zod'
import {
  accessTokenResponseSchema,
  apiErrorResponseSchema,
  errorMessageSchema,
  loginResponseSchema,
  loginSchema,
  newPasswordSchema,
  passwordRecoverySchema,
  registrationConfirmationSchema,
  registrationSchema,
  resendConfirmationEmailSchema,
  validatePasswordRecoveryCodeSchema,
} from './auth.schemas'

export type AccessTokenResponse = z.infer<typeof accessTokenResponseSchema>
export type ErrorMessageResponse = z.infer<typeof errorMessageSchema>
export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>
export type LoginRequest = z.infer<typeof loginSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>
export type NewPasswordRequest = z.infer<typeof newPasswordSchema>
export type PasswordRecoveryRequest = z.infer<typeof passwordRecoverySchema>
export type RegistrationConfirmationRequest = z.infer<typeof registrationConfirmationSchema>
export type RegistrationRequest = z.infer<typeof registrationSchema>
export type ResendConfirmationEmailRequest = z.infer<typeof resendConfirmationEmailSchema>
export type ValidatePasswordRecoveryCodeRequest = z.infer<typeof validatePasswordRecoveryCodeSchema>
export type RegistrationField = keyof RegistrationRequest
export type LoginField = keyof LoginRequest

export const VALID_LOGIN_FIELDS = ['email', 'password'] as const
export const VALID_REGISTRATION_FIELDS = [
  'username',
  'email',
  'password',
  'passwordConfirmation',
  'isTermsAccepted',
] as const
