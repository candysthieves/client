import { MainPage } from '@/components/MainPage'
import { getUsersCount } from '@/lib/api'

export default async function Home() {
  const usersCount = await getUsersCount({ next: { revalidate: 60 } } as RequestInit).catch(
    () => null
  )

  return <MainPage initialUsersCount={usersCount?.count ?? 0} />
}
