import { useQuery } from '@tanstack/react-query'
import { getDeletedPosts } from '@/lib/api'
import { postsKeys } from '../postKeys'

export const useDeletedPosts = (userId?: string) =>
  useQuery({
    queryKey: postsKeys.deletedByUser(userId ?? ''),
    queryFn: getDeletedPosts,
    enabled: Boolean(userId),
  })
