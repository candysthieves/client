import { useQuery } from '@tanstack/react-query'
import { getPost } from '@/lib/api'
import { postsKeys } from '../postKeys'

export const usePost = (postId?: string, userId?: string, enabled = true) =>
  useQuery({
    queryKey: postsKeys.detail(postId ?? ''),
    queryFn: () => getPost(postId!, userId!),
    enabled: Boolean(postId && userId) && enabled,
  })
