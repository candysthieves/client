// import { useQuery } from '@tanstack/react-query'
// import { getAvatar } from '@/lib/api/avatar'
// import { avatarKeys } from '@/lib/avatar'
//
// export const useAvatar = () =>
//   useQuery({
//     queryKey: avatarKeys.avatar(),
//     queryFn: () => getAvatar(),
//   })

import { useQuery } from '@tanstack/react-query'
import { getAvatar } from '@/lib/api/avatar'
import { avatarKeys } from '@/lib/avatar'

type UseAvatarOptions = {
  enabled?: boolean
}

export const useAvatar = (options: UseAvatarOptions = {}) =>
  useQuery({
    queryKey: avatarKeys.avatar(),
    queryFn: () => getAvatar(),
    enabled: options.enabled ?? true,
  })
