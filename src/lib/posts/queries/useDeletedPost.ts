import { useQuery } from '@tanstack/react-query'
import { getDeletedPost } from '@/lib/api'
import { postsKeys } from '../postKeys'

export const useDeletedPost = (postId?: string, enabled = true) =>
  useQuery({
    queryKey: postsKeys.deletedPost(postId ?? ''),
    queryFn: () => getDeletedPost(postId!),
    enabled: enabled && Boolean(postId),
  })
