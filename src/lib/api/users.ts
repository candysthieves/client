import { request } from '@/lib/api/request'
import { UsersCountResponse } from '@/lib/model'

export const getUsersCount = (init?: RequestInit) =>
  request<UsersCountResponse>('/users/count', init)
