import { useQuery } from '@tanstack/react-query'
import { HOME_PAGE_REFETCH_INTERVAL_MS } from '@/constants'
import { getAllPosts } from '@/lib/api'
import { feedKeys } from '@/lib/feed'

export const useFeedPosts = (limit?: number) =>
  useQuery({
    queryKey: feedKeys.posts(limit),
    queryFn: () => getAllPosts({ limit }),
    refetchInterval: HOME_PAGE_REFETCH_INTERVAL_MS,
    retry: false,
  })
