import { requestValidated } from '@/lib/api/requestValidated'
import { AccountType, AvailableAccountTypesResponse, SubscriptionsResponse } from '@/lib/model'
import {
  availableAccountTypesResponseSchema,
  subscriptionsResponseSchema,
} from '@/lib/model/subscriptions.schemas'

export const getAvailableAccountTypes = (): Promise<AvailableAccountTypesResponse> =>
  requestValidated('/subscription-types', availableAccountTypesResponseSchema)

export const getSubscriptionCosts = (accountType: AccountType): Promise<SubscriptionsResponse> => {
  const searchParams = new URLSearchParams({
    type: accountType,
  })

  return requestValidated(`/tariffs?${searchParams.toString()}`, subscriptionsResponseSchema)
}

export const _getSubscriptionCosts = (accountType: AccountType): Promise<SubscriptionsResponse> =>
  requestValidated(`/tariffs?type=${accountType}`, subscriptionsResponseSchema)
