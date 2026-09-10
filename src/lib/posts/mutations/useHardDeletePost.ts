import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { GetDeletedPostsResponse } from '@/lib/model'
import { ToastError, ToastSuccess } from '@/components'
import { hardDeletePost } from '@/lib/api'
import { profileKeys } from '@/lib/profile'

export function useHardDeletePost(userId?: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: string) => hardDeletePost(postId),

    onSuccess: async (_, postId) => {
      ToastSuccess({ message: 'Post permanently deleted' })

      if (userId) {
        queryClient.setQueryData<GetDeletedPostsResponse>(
          profileKeys.deletedPosts(userId),
          currentData =>
            currentData
              ? {
                  ...currentData,
                  items: currentData.items.filter(post => post.id !== postId),
                }
              : currentData
        )

        await queryClient.invalidateQueries({
          queryKey: profileKeys.deletedPosts(userId),
          refetchType: 'none',
        })
      }
    },
    onError: () => {
      ToastError({ messages: 'Failed to permanently delete post.' })
    },
  })
}
