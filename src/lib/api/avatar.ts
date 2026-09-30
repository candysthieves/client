import { UpdateAvatarRequest, UpdateAvatarResponse } from '@/features/createPost'
import { request } from '@/lib/api/request'
import { Avatar } from '@/lib/model'

export const getAvatar = (): Promise<Avatar> => request<Avatar>(`/users/my-avatar`)

export const updateAvatar = async (data: UpdateAvatarRequest): Promise<UpdateAvatarResponse> => {
  const formData = new FormData()
  formData.append('file', data.file)

  return request<UpdateAvatarResponse>('/users/my-avatar', {
    method: 'POST',
    body: formData,
  })
}

export const deleteAvatar = () =>
  request<void>(`/users/my-avatar`, {
    method: 'DELETE',
  })
