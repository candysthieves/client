import { request } from '@/lib/api/request'
import { requestValidated } from '@/lib/api/requestValidated'
import {
  AccountType,
  AvailableAccountTypesResponse,
  CurrentSubscriptionResponse,
  currentSubscriptionResponseSchema,
  SubscriptionHistoryResponse,
  SubscriptionsResponse,
} from '@/lib/model'
import {
  availableAccountTypesResponseSchema,
  subscriptionHistoryResponseSchema,
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

export const getSubscriptionHistory = (): Promise<SubscriptionHistoryResponse> =>
  requestValidated('/subscriptions/history', subscriptionHistoryResponseSchema)

export const getCurrentSubscription = (): Promise<CurrentSubscriptionResponse> =>
  requestValidated(`/subscriptions/current`, currentSubscriptionResponseSchema)

export const cancelCurrentSubscription = () =>
  request<void>(`/subscriptions/current`, {
    method: 'DELETE',
  })
