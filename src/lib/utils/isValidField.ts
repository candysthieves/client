import {
  LoginErrorField,
  LoginField,
  NewPasswordField,
  PasswordRecoveryField,
  RegistrationErrorField,
  VALID_LOGIN_ERROR_FIELDS,
  VALID_LOGIN_FIELDS,
  VALID_NEW_PASSWORD_FIELDS,
  VALID_PASSWORD_RECOVERY_FIELDS,
  VALID_REGISTRATION_FIELDS,
} from '@/lib/model'

// isValidRegistrationField === isValidErrorRegistrationField согласно ответам от бэкенда
// И для проверки Domain ошибки при sign-up и для setError соотвествующего поля формы sign-up при Validation Error
export const isValidRegistrationField = (field: string): field is RegistrationErrorField => {
  return VALID_REGISTRATION_FIELDS.includes(field as RegistrationErrorField)
}

// isValidErrorLoginField !== isValidLoginField согласно ответам от бэкенда => далее будут две разных функции-валидатора:
// используем для проверки Domain ошибки при sign-in
export const isValidErrorLoginField = (field: string): field is LoginErrorField => {
  return VALID_LOGIN_ERROR_FIELDS.includes(field as LoginErrorField)
}

// используем для setError соотвествующего поля формы sign-in при Validation Error
export const isValidLoginField = (field: string): field is LoginField => {
  return VALID_LOGIN_FIELDS.includes(field as LoginField)
}

// используем для setError соотвествующего поля формы forgot password при Validation / Domain Error
export const isValidPasswordRecoveryField = (field: string): field is PasswordRecoveryField => {
  return VALID_PASSWORD_RECOVERY_FIELDS.includes(field as PasswordRecoveryField)
}

export const isValidNewPasswordField = (field: string): field is NewPasswordField => {
  return VALID_NEW_PASSWORD_FIELDS.includes(field as NewPasswordField)
}
