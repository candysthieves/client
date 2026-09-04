import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AddPostRequest } from '@/features/createPost'
import { addPost } from '@/lib/api/posts'
import { postsKeys } from '@/lib/posts/postKeys'

export function useAddPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AddPostRequest) => addPost(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.all })
    },
  })
}

// type AddPostRequest = {
//   files: File[]
//   description: string
//   locations: Location[]
// }
//{code: 57, errorsMessages: [{field: "files", message: "Files service is unavailable"}]}
