import { LoginErrorField, LoginField, RegistrationErrorField } from '@/lib/model'

export const USERNAME_PATTERN = /^[A-Za-z0-9_-]+$/

export const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]+$/

export const USERNAME_PATTERN_MESSAGE =
  'Username may only include letters, numbers, underscores, and hyphens'

export const PASSWORD_PATTERN_MESSAGE = `Password must contain at least one uppercase / lowercase letter, one digit and may have one special character`

export const VALIDATION_ERROR_COMMON_MESSAGE = 'Please check the data input'

export const DOMAIN_ERROR_COMMON_MESSAGE = 'Please check the data input'

export const DOMAIN_LOGIN_EMAIL_CONFIRM_ERROR_MESSAGE = 'Email is not confirmed'

export const DOMAIN_LOGIN_ERROR_MESSAGE = 'Invalid email or password'

export const DOMAIN_LOGIN_NOT_FOUND_ERROR_MESSAGE = 'User or email is not found'

export const DOMAIN_RESEND_EMAIL_NOT_EXISTS_ERROR_MESSAGE = 'Email does not exist in base'

export const DOMAIN_RESEND_EMAIL_ALREADY_CONFIRMED_ERROR_MESSAGE = 'Email is already confirmed'

export const VALID_REGISTRATION_FIELDS: RegistrationErrorField[] = [
  'email',
  'username',
  'password',
  'passwordConfirmation',
  'isTermsAccepted',
] as const

export const VALID_LOGIN_FIELDS: LoginField[] = ['email', 'password'] as const
export const VALID_LOGIN_ERROR_FIELDS: LoginErrorField[] = ['email', 'credentials'] as const

export const ACCESS_TOKEN_LS_KEY = 'accessToken'
