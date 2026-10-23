import { UpdateAvatarRequest, UpdateAvatarResponse } from '@/features/createPost'
import { request } from '@/lib/api/request'
import { requestValidated } from '@/lib/api/requestValidated'
import { Avatar, avatarSchema, updateAvatarResponseSchema } from '@/lib/model'

export const getAvatar = (): Promise<Avatar> => requestValidated(`/users/my-avatar`, avatarSchema)

export const updateAvatar = async (data: UpdateAvatarRequest): Promise<UpdateAvatarResponse> => {
  const formData = new FormData()
  formData.append('file', data.file)

  return requestValidated('/users/my-avatar', updateAvatarResponseSchema, {
    method: 'PUT',
    body: formData,
  })
}

export const deleteAvatar = () =>
  request<void>(`/users/my-avatar`, {
    method: 'DELETE',
  })
