import { useQuery } from '@tanstack/react-query'
import { getUserPosts } from '@/lib/api'
import { profileKeys } from '../profileKeys'

export const useProfilePosts = (userId: string) =>
  useQuery({
    queryKey: profileKeys.posts(userId),
    queryFn: () => getUserPosts(userId),
  })
