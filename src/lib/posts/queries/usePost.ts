import { useQuery } from '@tanstack/react-query'
import { getPostById } from '@/lib/api'
import { postsKeys } from '../postKeys'

export const usePost = (postId?: string) =>
  useQuery({
    queryKey: postsKeys.post(postId ?? ''),
    queryFn: () => getPostById(postId!),
    enabled: Boolean(postId),
  })
