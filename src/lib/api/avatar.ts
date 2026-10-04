import { UpdateAvatarRequest, UpdateAvatarResponse } from '@/features/createPost'
import { request } from '@/lib/api/request'
import { requestValidated } from '@/lib/api/requestValidated'
import { Avatar, avatarSchema } from '@/lib/model'

export const getAvatar = (): Promise<Avatar> => requestValidated(`/users/my-avatar`, avatarSchema)

export const updateAvatar = async (data: UpdateAvatarRequest): Promise<UpdateAvatarResponse> => {
  const formData = new FormData()
  formData.append('file', data.file)

  return request<UpdateAvatarResponse>('/users/my-avatar', {
    method: 'PUT',
    body: formData,
  })
}

export const deleteAvatar = () =>
  request<void>(`/users/my-avatar`, {
    method: 'DELETE',
  })
