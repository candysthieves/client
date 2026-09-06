import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Post } from '@/mocks/posts'
import { ToastError, ToastSuccess } from '@/components/Toast/Toast'
import { hardDeletePost } from '@/lib/api'
import { postsKeys } from '../postKeys'

export const useHardDeletePost = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: hardDeletePost,
    onSuccess: (_, postId) => {
      queryClient.setQueryData<Post[]>(postsKeys.deletedByUser(userId), posts =>
        posts?.filter(post => post.postId !== postId)
      )
      ToastSuccess({ message: 'Post permanently deleted' })
    },
    onError: () => {
      ToastError({ messages: 'Failed to delete post permanently. Please try again.' })
    },
  })
}
