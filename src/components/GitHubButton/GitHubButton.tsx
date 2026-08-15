// import { Button, GithubRepo } from '@candy.thieves/ui-kit-lumos'
// import s from './GitHubButton.module.scss'
//
// export const GitHubButton = () => {
//   const login = () => {
//     const CLIENT_ID = '1234567890'
//     // const REDIRECT_URL = 'https://api.github.com/users/'
//     const URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user:email`
//     window.location.assign(URL)
//   }
//
//   return (
//     <Button onClick={login} className={s.gitHubButton}>
//       <GithubRepo size={36} />
//     </Button>
//   )
// }
// // const handleGoogleLogin = () => {
// //   window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`
// // }

import { Button, GithubRepo } from '@candy.thieves/ui-kit-lumos'
import { NEXT_PUBLIC_API_URL } from '@/constants'
import s from './GitHubButton.module.scss'

export const GitHubButton = () => {
  return (
    <Button as={'a'} href={`${NEXT_PUBLIC_API_URL}/auth/github`} className={s.gitHubButton}>
      <GithubRepo size={36} color={'var(--color-light-100)'} />
    </Button>
  )
}
