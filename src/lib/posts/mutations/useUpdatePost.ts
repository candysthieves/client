import { type InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Post, ProfilePostsResponse } from '@/lib/model'
import { ToastError, ToastSuccess } from '@/components/Toast/Toast'
import { updatePost } from '@/lib/api'
import { profileKeys } from '@/lib/profile/profileKeys'
import { postsKeys } from '../postKeys'

type UpdatePostInput = {
  postId: string
  userId: string
  description: string
}

type UpdatePostContext = {
  previousPosts?: Post[]
  previousProfileResponse?: InfiniteData<ProfilePostsResponse>
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ postId, description }: UpdatePostInput) => updatePost(postId, description),

    onMutate: async ({ postId, userId, description }: UpdatePostInput) => {
      await queryClient.cancelQueries({ queryKey: postsKeys.all })
      await queryClient.cancelQueries({ queryKey: profileKeys.posts(userId) })

      const previousPosts = queryClient.getQueryData<Post[]>(postsKeys.all)
      const previousProfileResponse = queryClient.getQueryData<InfiniteData<ProfilePostsResponse>>(
        profileKeys.posts(userId)
      )

      queryClient.setQueryData<Post[]>(postsKeys.all, posts =>
        posts?.map(post => (post.id === postId ? { ...post, description } : post))
      )

      queryClient.setQueryData<InfiniteData<ProfilePostsResponse>>(
        profileKeys.posts(userId),
        data =>
          data
            ? {
                ...data,
                pages: data.pages.map(page => ({
                  ...page,
                  items: page.items.map(item =>
                    item.id === postId ? { ...item, description } : item
                  ),
                })),
              }
            : data
      )

      return { previousPosts, previousProfileResponse }
    },

    onError: (_error, variables, context) => {
      const { previousPosts, previousProfileResponse } = (context ?? {}) as UpdatePostContext

      queryClient.setQueryData(postsKeys.all, previousPosts)
      queryClient.setQueryData(profileKeys.posts(variables.userId), previousProfileResponse)

      ToastError({ messages: 'Failed to update post. Please try again.' })
    },

    onSuccess: () => {
      ToastSuccess({ message: 'Post updated successfully' })
    },

    onSettled: (_data, _error, variables) => {
      void queryClient.invalidateQueries({ queryKey: postsKeys.all })
      void queryClient.invalidateQueries({ queryKey: profileKeys.posts(variables.userId) })
    },
  })
}
