'use client'

import { Typography } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/lib/hooks/useAuth'
import { usePosts } from '@/lib/posts'
import s from './page.module.scss'

export default function ProfilePage() {
  const { user } = useAuth()
  const { data: posts = [] } = usePosts()

  return (
    <>
      <Typography align={'center'} color={'white'} variant={'h1'}>
        Profile
      </Typography>

      <div className={s.feed}>
        {user &&
          posts.map((post, index) => (
            <Link
              key={post.postId}
              href={`/profile/${user.id}?postId=${post.postId}`}
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
