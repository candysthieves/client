import { PostCard } from '@/components/PostCard'
import { RegisteredUsersCounter } from '@/components/RegisteredUsersCounter'
import s from './MainPage.module.scss'
import { mockPosts } from './mockPosts'

export const MainPage = () => {
  return (
    <div className={s.root}>
      <RegisteredUsersCounter count={9213} />

      <div className={s.postsGrid}>
        {mockPosts.map(post => (
          <PostCard
            caption={post.caption}
            images={post.images}
            key={post.id}
            timeAgo={post.timeAgo}
            username={post.username}
          />
        ))}
      </div>
    </div>
  )
}
