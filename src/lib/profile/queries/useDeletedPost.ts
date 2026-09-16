import { useQuery } from '@tanstack/react-query'
import { getDeletedPostById } from '@/lib/api'
import { profileKeys } from '@/lib/profile'

export const useDeletedPost = (userId: string, postId: string | undefined, isOwner: boolean) =>
  useQuery({
    queryKey: [...profileKeys.deletedPosts(userId), postId],
    queryFn: () => {
      if (!isOwner) return null
      return getDeletedPostById(postId!)
    },
    enabled: isOwner && Boolean(userId) && Boolean(postId),
  })
