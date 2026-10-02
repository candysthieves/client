import type { z } from 'zod'
import { request } from '@/lib/api/request'
import { ResponseValidationError } from '@/lib/api/responseValidationError'

export const requestValidated = async <S extends z.ZodTypeAny>(
  url: string,
  schema: S,
  init?: RequestInit
): Promise<z.infer<S>> => {
  const response = await request<unknown>(url, init)
  const result = schema.safeParse(response)

  if (!result.success) {
    throw new ResponseValidationError(url, result.error.issues, response)
  }

  return result.data
}
