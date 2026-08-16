export class ApiError<T = unknown> extends Error {
  constructor(
    public readonly status: number,
    public readonly data: T
  ) {
    super(`Request failed with status ${status}`)
    this.name = 'ApiError'
  }
}
