import { useQuery } from '@tanstack/react-query'
import { getPosts } from '@/lib/api'
import { postsKeys } from '../postKeys'

export const usePosts = () =>
  useQuery({
    queryKey: postsKeys.all,
    queryFn: getPosts,
  })
