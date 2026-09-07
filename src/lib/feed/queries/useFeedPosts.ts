import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from '@/lib/api'
import { feedKeys } from '../feedKeys'

export const useFeedPosts = (limit?: number) =>
  useQuery({
    queryKey: feedKeys.posts(limit),
    queryFn: () => getAllPosts({ limit }),
    retry: false,
  })
