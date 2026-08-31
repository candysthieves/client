import { useQuery } from '@tanstack/react-query'
import { getPosts } from '@/lib/api'
import { postKeys } from '../postKeys'

export const usePosts = () =>
  useQuery({
    queryKey: postKeys.all,
    queryFn: getPosts,
  })
