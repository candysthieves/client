import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { Suspense } from 'react'
import { MainPage } from '@/components/MainPage'
import { getAllPosts, getUsersCount } from '@/lib/api'
import { feedKeys, LATEST_POSTS_LIMIT } from '@/lib/feed'
import { usersKeys } from '@/lib/users'

export default async function Home() {
  // A fresh QueryClient per request — prefetched here, then handed to the client
  // via HydrationBoundary so useUsersCount/useFeedPosts pick up this data instead
  // of refetching on mount. The `next: { revalidate: 60 }` on each fetch is what
  // actually gives us ISR — the QueryClient here is only a hand-off mechanism.
  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: usersKeys.count(),
      queryFn: () => getUsersCount({ next: { revalidate: 60 } } as RequestInit),
    }),
    queryClient.prefetchQuery({
      queryKey: feedKeys.posts(LATEST_POSTS_LIMIT),
      queryFn: () =>
        getAllPosts({ limit: LATEST_POSTS_LIMIT }, { next: { revalidate: 60 } } as RequestInit),
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={null}>
        <MainPage />
      </Suspense>
    </HydrationBoundary>
  )
}
