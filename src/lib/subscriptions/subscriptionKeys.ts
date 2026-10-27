import { AccountType } from '@/lib/model'

export const subscriptionKeys = {
  all: ['subscriptions'] as const,
  types: () => [...subscriptionKeys.all, 'types'] as const,
  costs: (accountType: AccountType) => [...subscriptionKeys.all, 'costs', accountType] as const,
  history: () => [...subscriptionKeys.all, 'history'] as const,
}
