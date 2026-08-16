// import { Button, GithubRepo, Google } from '@candy.thieves/ui-kit-lumos'
// import s from './GoogleButton.module.scss'
//
// export const GoogleButton = () => {
//   const login = () => {
//     const CLIENT_ID = '1234567890.apps.googleusercontent.com'
//     const REDIRECT_URL = 'https://localhost:3000/oauth-callback-google' // / api / v1 / auth / google / callback
//     const scope = 'email profile'
//     const URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&response_type=code&redirect_uri=${REDIRECT_URL}&client_id=${CLIENT_ID}`
//     window.location.assign(URL)
//   }
//
//   return (
//     <Button onClick={login} className={s.gitHubButton}>
//       <Google size={36} />
//     </Button>
//   )
// }

import { Button, Google } from '@candy.thieves/ui-kit-lumos'
import { NEXT_PUBLIC_API_URL } from '@/constants'
import s from './GoogleButton.module.scss'

export const GoogleButton = () => {
  return (
    <Button
      as={'a'}
      href={`${NEXT_PUBLIC_API_URL}/auth/google`}
      className={s.googleButton}
      aria-label={'Sign up with Google'}
    >
      <Google size={36} />
    </Button>
  )
}
