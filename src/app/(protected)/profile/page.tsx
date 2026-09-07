'use client'

import { Typography } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/lib/hooks/useAuth'
import { usePosts } from '@/lib/posts'
import s from './page.module.scss'

export default function ProfilePage() {
  const { user } = useAuth()
  const { data: posts = [] } = usePosts(user?.id)
  const activePosts = posts.filter(post => !post.willBeDeletedIn)

  return (
    <>
      <Typography align={'center'} color={'white'} variant={'h1'}>
        Profile
      </Typography>

      <div className={s.feed}>
        {user &&
          activePosts.map((post, index) => (
            <Link
              key={post.postId}
              href={`/profile/${user.id}?postId=${post.postId}&type=published`}
              aria-label={`Open post ${index + 1}`}
              className={s.card}
            >
              <Image
                src={post.preview.url}
                alt={post.description ?? `Post ${index + 1}`}
                width={226}
                height={226}
                className={s.image}
              />
            </Link>
          ))}
      </div>
    </>
  )
}
