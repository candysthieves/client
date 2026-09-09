import { useInfiniteQuery } from '@tanstack/react-query'
import { getUserPosts } from '@/lib/api'
import { profileKeys } from '../profileKeys'

export const useProfilePosts = (userId: string) =>
  useInfiniteQuery({
    queryKey: profileKeys.posts(userId),
    queryFn: ({ pageParam }) => getUserPosts(userId, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: lastPage => (lastPage.hasNextPage ? lastPage.nextCursor : undefined),
    gcTime: 0,
  })
