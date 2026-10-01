import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import type { ProfilePostsResponse } from '@/lib/model'
import { ProfileClient } from '@/app/(public)/profile/[id]/ProfileClient'
import { getServerAccessToken, getServerUserPosts, getServerUserProfile } from '@/lib/api/server'
import { profileKeys } from '@/lib/profile/profileKeys'

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

  const queryClient = new QueryClient()

  /**
   * Access token is stored in localStorage, so it is not available on the server.
   * We get a new one from the HttpOnly refresh cookie.
   */
  const accessToken = await getServerAccessToken()

  /**
   * If the token is not available (guest, invalid refresh cookie, api is down),
   * the page is rendered without prefetched data and the client queries take over.
   */
  if (accessToken) {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: profileKeys.detail(userId),
        queryFn: () => getServerUserProfile(userId, accessToken),
        retry: false,
      }),
      queryClient.prefetchInfiniteQuery({
        queryKey: profileKeys.posts(userId),
        queryFn: ({ pageParam }) => getServerUserPosts(userId, accessToken, pageParam),
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage: ProfilePostsResponse) =>
          lastPage.hasNextPage ? (lastPage.nextCursor ?? undefined) : undefined,
        retry: false,
      }),
    ])
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={null}>
        <ProfileClient userId={userId} postId={postId} action={action} />
      </Suspense>
    </HydrationBoundary>
  )
}
