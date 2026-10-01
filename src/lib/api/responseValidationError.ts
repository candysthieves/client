import type { z } from 'zod'

export class ResponseValidationError extends Error {
  constructor(
    public readonly url: string,
    public readonly issues: z.core.$ZodIssue[],
    public readonly raw: unknown
  ) {
    const details = issues
      .map(issue => {
        const path = issue.path.length ? issue.path.map(String).join('.') : '<root>'
        return `${path}: ${issue.message}`
      })
      .join('; ')

    super(`Invalid response from ${url}${details ? ` — ${details}` : ''}`)
    this.name = 'ResponseValidationError'
  }
}
