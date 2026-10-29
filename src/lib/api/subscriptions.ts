import { requestValidated } from '@/lib/api/requestValidated'
import {
  AccountType,
  AvailableAccountTypesResponse,
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

export const getSubscriptionHistory = (
  page: number,
  pageSize: number
): Promise<SubscriptionHistoryResponse> => {
  const searchParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  })

  return requestValidated(
    `/subscriptions/history?${searchParams.toString()}`,
    subscriptionHistoryResponseSchema
  )
}
