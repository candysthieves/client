import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost } from '@/lib/api'
import { postKeys } from '../postKeys'

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all })
    },
  })
}
