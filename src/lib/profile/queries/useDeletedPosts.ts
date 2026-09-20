import { useQuery } from '@tanstack/react-query'
import { getDeletedPosts } from '@/lib/api'
import { profileKeys } from '@/lib/profile'

export const useDeletedPosts = (userId: string, isOwner: boolean) =>
  useQuery({
    queryKey: profileKeys.deletedPosts(userId),
    queryFn: () => getDeletedPosts(),
    enabled: isOwner && Boolean(userId),
  })
