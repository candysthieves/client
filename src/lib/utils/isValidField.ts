import {
  LoginField,
  RegistrationField,
  VALID_LOGIN_FIELDS,
  VALID_REGISTRATION_FIELDS,
} from '@/lib/model'

export const isValidRegistrationField = (field: string): field is RegistrationField => {
  return VALID_REGISTRATION_FIELDS.includes(field as RegistrationField)
}

export const isValidLoginField = (field: string): field is LoginField => {
  return VALID_LOGIN_FIELDS.includes(field as LoginField)
}
