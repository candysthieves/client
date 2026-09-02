import { request } from '@/lib/api/request'
import { UsersCountResponse } from '@/lib/model'

export const getUsersCount = () => request<UsersCountResponse>('/users/count')
