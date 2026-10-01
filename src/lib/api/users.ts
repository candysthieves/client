import { requestValidated } from '@/lib/api/requestValidated'
import { usersCountResponseSchema } from '@/lib/model'

export const getUsersCount = async (init?: RequestInit) => {
  return requestValidated('/users/count', usersCountResponseSchema, init)
}
