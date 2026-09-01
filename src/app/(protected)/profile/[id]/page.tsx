import { redirect } from 'next/navigation'
import { ProfileClient } from '@/app/(protected)/profile/[id]/ProfileClient'

type Params = { id: string }
type SearchParams = { postId?: string; action?: string }

type ProfilePageProps = {
  params: Params | Promise<Params>
  searchParams: Promise<SearchParams> | SearchParams
}

/**
 * Из ТЗ:
 * /profile/123?postId=456 Открыто модальное окно с постом, у которого id = 456
 *
 *
 * Если в url вручную задать оба параметра:
 * например, .../profile/123?postId=456&action=create, то action необходимо убрать из url (на стороне next сервера),
 * чтобы не было открыто двух модальных окон одновременно
 *
 * Задаём приоритет по условию из ТЗ выше:
 */

export default async function ProfilePage({ params, searchParams }: ProfilePageProps) {
  const { id: userId } = await params
  const { postId, action } = await searchParams

  // Если есть postId и action=create, перенаправляем без action (удаляем action) - обработка редиректа на сервере
  if (postId && action === 'create') {
    const newSearchParams = new URLSearchParams()
    newSearchParams.set('postId', postId)

    // Перенаправляем на тот же URL, но без action
    redirect(`/profile/${userId}?${newSearchParams.toString()}`)
  }

  return <ProfileClient userId={userId} postId={postId} action={action} />
}
