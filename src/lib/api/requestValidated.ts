import type { z } from 'zod'
import { request } from '@/lib/api/request'
import { validateResponse } from '@/lib/api/validateResponse'

export const requestValidated = async <S extends z.ZodTypeAny>(
  url: string,
  schema: S,
  init?: RequestInit
): Promise<z.infer<S>> => validateResponse(url, schema, await request<unknown>(url, init))
