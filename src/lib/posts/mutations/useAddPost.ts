import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AddPostRequest } from '@/features/createPost'
import { addPost } from '@/lib/api/posts'
import { postsKeys } from '@/lib/posts/postKeys'
import { profileKeys } from '@/lib/profile/profileKeys'

export function useAddPost(userId?: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AddPostRequest) => addPost(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postsKeys.all })

      if (userId) {
        await queryClient.invalidateQueries({ queryKey: profileKeys.detail(userId) })
      }
    },
  })
}

// type AddPostRequest = {
//   files: File[]
//   description: string
//   locations: Location[]
// }
//{code: 57, errorsMessages: [{field: "files", message: "Files service is unavailable"}]}
