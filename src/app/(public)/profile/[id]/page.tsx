import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import type { ProfilePostsResponse } from '@/lib/model'
import { ProfileClient } from '@/app/(public)/profile/[id]/ProfileClient'
import { getServerPost, getServerUserPosts, getServerUserProfile } from '@/lib/api/server'
import { postsKeys } from '@/lib/posts/postKeys'
import { profileKeys } from '@/lib/profile/profileKeys'

type Params = { id: string }
type SearchParams = { postId?: string; action?: string; type?: string }

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
  const { postId, action, type } = await searchParams

  // Если есть postId и action=create, перенаправляем без action (удаляем action) - обработка редиректа на сервере
  if (postId && action === 'create') {
    const newSearchParams = new URLSearchParams()
    newSearchParams.set('postId', postId)

    // Перенаправляем на тот же URL, но без action
    redirect(`/profile/${userId}?${newSearchParams.toString()}`)
  }

  const queryClient = new QueryClient()

  /**
   * Profile and post endpoints are public, so the page is prefetched as a guest:
   * the server renders filled HTML instead of a loading stub that is filled after
   * JavaScript runs in the browser.
   *
   * The access token lives in localStorage and is not available here, and the
   * HttpOnly refresh cookie belongs to the API domain, so an authenticated viewer
   * is re-fetched on the client after hydration (see ProfileClient).
   */

  // Deleted posts are owner-only, they are fetched by the client after the auth state is known
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: profileKeys.detail(userId),
      queryFn: () => getServerUserProfile(userId),
      retry: false,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: profileKeys.posts(userId),
      queryFn: ({ pageParam }) => getServerUserPosts(userId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage: ProfilePostsResponse) =>
        lastPage.hasNextPage ? (lastPage.nextCursor ?? undefined) : undefined,
      retry: false,
    }),
    ...(postId && type !== 'deleted'
      ? [
          queryClient.prefetchQuery({
            queryKey: postsKeys.post(postId),
            queryFn: () => getServerPost(postId),
            retry: false,
          }),
        ]
      : []),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={null}>
        <ProfileClient userId={userId} postId={postId} action={action} />
      </Suspense>
    </HydrationBoundary>
  )
}
