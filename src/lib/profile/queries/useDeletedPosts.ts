import { useQuery } from '@tanstack/react-query'
import { getDeletedPosts } from '@/lib/api'
import { profileKeys } from '@/lib/profile'

export const useDeletedPosts = (userId: string, isOwner: boolean) =>
  useQuery({
    queryKey: profileKeys.deletedPosts(userId),
    queryFn: () => getDeletedPosts(),
    // Запрос сработает только если пользователь смотрит свой профиль
    enabled: isOwner && Boolean(userId),
  })
