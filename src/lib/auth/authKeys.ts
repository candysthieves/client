export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,

  passwordRecovery: () => [...authKeys.all, 'password-recovery'] as const,

  validatePasswordRecoveryCode: (recoveryCode: string) =>
    [...authKeys.passwordRecovery(), 'validate', recoveryCode] as const,
}

// authKeys
// ['auth']
// ├── ['auth', 'me']
// └── ['auth', 'password-recovery']
//       └── ['auth', 'password-recovery', 'validate', recoveryCode]
