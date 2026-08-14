export const USERNAME_PATTERN = /^[A-Za-z0-9_-]+$/

export const USERNAME_PATTERN_MESSAGE = 'Username must match /^[A-Za-z0-9_-]+$/ regular expression'

export const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]+$/

export const PASSWORD_PATTERN_MESSAGE = `Password must contain 0-9, a-z, A-Z, ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ { | } ~ `

export const VALIDATION_ERROR_COMMON_MESSAGE = 'Validation error'

export const DOMAIN_ERROR_COMMON_MESSAGE = 'Something went wrong. Please try again'

export const DOMAIN_LOGIN_EMAIL_CONFIRM_ERROR_MESSAGE = 'Email is not confirmed'

export const DOMAIN_LOGIN_ERROR_MESSAGE = 'Invalid email or password'

export const DOMAIN_LOGIN_NOT_FOUND_ERROR_MESSAGE = 'User with this email was not found'

export const DOMAIN_RESEND_EMAIL_ALREADY_CONFIRMED_ERROR_MESSAGE = 'Email is already confirmed'

export const DOMAIN_RESEND_EMAIL_NOT_EXISTS_ERROR_MESSAGE = 'Email does not exist'
