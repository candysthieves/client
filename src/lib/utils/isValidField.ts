import {
  LoginField,
  NewPasswordField,
  RegistrationField,
  VALID_LOGIN_FIELDS,
  VALID_NEW_PASSWORD_FIELDS,
  VALID_REGISTRATION_FIELDS,
} from '@/lib/model'

export const isValidRegistrationField = (field: string): field is RegistrationField => {
  return VALID_REGISTRATION_FIELDS.includes(field as RegistrationField)
}

export const isValidLoginField = (field: string): field is LoginField => {
  return VALID_LOGIN_FIELDS.includes(field as LoginField)
}

export const isValidNewPasswordField = (field: string): field is NewPasswordField => {
  return VALID_NEW_PASSWORD_FIELDS.includes(field as NewPasswordField)
}
