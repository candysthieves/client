import { useQuery } from '@tanstack/react-query'
import { getAvatar } from '@/lib/api/avatar'
import { avatarKeys } from '@/lib/avatar'

export const useAvatar = () =>
  useQuery({
    queryKey: avatarKeys.avatar(),
    queryFn: () => getAvatar(),
  })
