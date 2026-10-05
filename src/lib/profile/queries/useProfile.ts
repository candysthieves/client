import { useQuery } from '@tanstack/react-query'
import { getUserProfile } from '@/lib/api'
import { profileKeys } from '@/lib/profile'

export const useProfile = (userId: string, enabled = true) =>
  useQuery({
    queryKey: profileKeys.detail(userId),
    queryFn: () => getUserProfile(userId),
    enabled: enabled && Boolean(userId),
  })
