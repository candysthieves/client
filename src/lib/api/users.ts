import { request } from '@/lib/api/request'
import { UsersCountResponse, usersCountResponseSchema } from '@/lib/model'

export const getUsersCount = async (init?: RequestInit): Promise<UsersCountResponse> => {
  const response = await request<unknown>('/users/count', init)

  return usersCountResponseSchema.parse(response)
}
