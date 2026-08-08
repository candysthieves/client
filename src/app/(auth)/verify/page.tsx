import { redirect } from 'next/navigation'
import { ApiError, registrationConfirmation } from '@/lib/api'
import { mapRegistrationConfirmationError } from '@/lib/utils/mapRegistrationConfirmationError'

type Props = {
  searchParams: Promise<{
    code?: string
  }>
}

export default async function VerifyPage({ searchParams }: Props) {
  const { code } = await searchParams // or token

  /**
   * If user opened link /verify  by himself without code
   */
  if (!code) {
    redirect('/email-verification-expired')
  }
  console.log('VERIFY PAGE RENDER', code)
  try {
    console.log('BEFORE CONFIRMATION', code)
    await registrationConfirmation({ code })
    console.log('AFTER CONFIRMATION', code)
    redirect('/congratulations') // проверить работает ли
  } catch (error) {
    console.log('CONFIRMATION ERROR', error)
    if (error instanceof ApiError) {
      const redirectTo = mapRegistrationConfirmationError(error)
      if (redirectTo) {
        redirect(redirectTo)
      }
    }

    throw error
  }
}
// if (error instanceof ApiError && error.data.code === 'TOKEN_EXPIRED') { // если export class ApiError<T = unknown>
//   // уточнить у бэкенд и как будет называться error.data.code при expired и будут ли другие например TOKEN_INVALID, TOKEN_ALREADY_USED
//   redirect('/email-verification-expired')
// }
// if (error instanceof ApiError &&
//   error.status === 400 &&
//   error.data.code === 'TOKEN_EXPIRED') { // бэкенд должен гарантировать { "code": "TOKEN_EXPIRED" }
//   // уточнить у бэкенд и как будет называться error.data.code при expired и будут ли другие например TOKEN_INVALID, TOKEN_ALREADY_USED
//   redirect('/email-verification-expired')
// }
//
//     throw error
//   }
// }
