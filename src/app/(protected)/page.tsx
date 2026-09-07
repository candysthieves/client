import { Suspense } from 'react'
import { MainPage } from '@/components/MainPage'
import { getAllPosts, getUsersCount } from '@/lib/api'

const LATEST_POSTS_LIMIT = 4

export default async function Home() {
  const [usersCount, posts] = await Promise.all([
    getUsersCount({ next: { revalidate: 60 } } as RequestInit)
      .then(res => res.count)
      .catch(() => null),
    getAllPosts({ limit: LATEST_POSTS_LIMIT }, { next: { revalidate: 60 } } as RequestInit)
      .then(res => res.slice(0, LATEST_POSTS_LIMIT))
      .catch(() => null),
  ])

  return (
    <Suspense fallback={null}>
      <MainPage initialUsersCount={usersCount} posts={posts} />
    </Suspense>
  )
}
