import { useQuery } from '@tanstack/react-query'
import { getPosts } from '@/lib/api'
import { postsKeys } from '../postKeys'

export const usePosts = (userId?: string) =>
  useQuery({
    queryKey: postsKeys.byUser(userId ?? ''),
    queryFn: () => getPosts(userId!),
    enabled: Boolean(userId),
  })
