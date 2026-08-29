export type MockComment = {
  id: string
  username: string
  avatarUrl?: string
  text: string
  timeAgo: string
  answersCount?: number
}

export type MockLikedByUser = {
  userName: string
  src?: string
}

export type MockPost = {
  id: string
  images: string[]
  username: string
  timeAgo: string
  caption: string
  date: string
  likesCount: number
  likedByUsers: MockLikedByUser[]
  comments: MockComment[]
}

export const mockPosts: MockPost[] = [
  {
    id: '1',
    images: [
      'https://picsum.photos/seed/post1a/400/400',
      'https://picsum.photos/seed/post1b/400/400',
      'https://picsum.photos/seed/post1c/400/400',
    ],
    username: 'john_doe',
    timeAgo: '22 min ago',
    caption:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: 'August 29, 2026',
    likesCount: 2243,
    likedByUsers: [
      { userName: 'mark_levin', src: 'https://i.pravatar.cc/40?img=5' },
      { userName: 'sofia_petrova', src: 'https://i.pravatar.cc/40?img=6' },
      { userName: 'kate_wolf', src: 'https://i.pravatar.cc/40?img=7' },
    ],
    comments: [
      {
        id: 'c1-1',
        username: 'anna_murphy',
        avatarUrl: 'https://i.pravatar.cc/40?img=8',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        timeAgo: '2 hours ago',
        answersCount: 1,
      },
      {
        id: 'c1-2',
        username: 'dmitry_k',
        avatarUrl: 'https://i.pravatar.cc/40?img=9',
        text: 'This is a really nice photo!',
        timeAgo: '1 hour ago',
      },
      {
        id: 'c1-3',
        username: 'johndoe_official',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.',
        timeAgo: '30 minutes ago',
      },
    ],
  },
  {
    id: '2',
    images: [
      'https://picsum.photos/seed/post2a/400/400',
      'https://picsum.photos/seed/post2b/400/400',
    ],
    username: 'jane_smith',
    timeAgo: '1 hour ago',
    caption:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date: 'August 29, 2026',
    likesCount: 987,
    likedByUsers: [
      { userName: 'mark_levin', src: 'https://i.pravatar.cc/40?img=5' },
      { userName: 'kate_wolf', src: 'https://i.pravatar.cc/40?img=7' },
    ],
    comments: [
      {
        id: 'c2-1',
        username: 'jane_doe',
        avatarUrl: 'https://i.pravatar.cc/40?img=11',
        text: 'Amazing!',
        timeAgo: '10 minutes ago',
      },
    ],
  },
  {
    id: '3',
    images: ['https://picsum.photos/seed/post3a/400/400'],
    username: 'mike_wilson',
    timeAgo: '3 hours ago',
    caption:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    date: 'August 28, 2026',
    likesCount: 154,
    likedByUsers: [{ userName: 'sofia_petrova', src: 'https://i.pravatar.cc/40?img=6' }],
    comments: [],
  },
  {
    id: '4',
    images: [
      'https://picsum.photos/seed/post4a/400/400',
      'https://picsum.photos/seed/post4b/400/400',
    ],
    username: 'sarah_connor',
    timeAgo: '5 hours ago',
    caption:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: 'August 28, 2026',
    likesCount: 3120,
    likedByUsers: [
      { userName: 'mark_levin', src: 'https://i.pravatar.cc/40?img=5' },
      { userName: 'sofia_petrova', src: 'https://i.pravatar.cc/40?img=6' },
      { userName: 'kate_wolf', src: 'https://i.pravatar.cc/40?img=7' },
      { userName: 'anna_murphy', src: 'https://i.pravatar.cc/40?img=8' },
    ],
    comments: [
      {
        id: 'c4-1',
        username: 'kate_wolf',
        avatarUrl: 'https://i.pravatar.cc/40?img=7',
        text: 'Excepteur sint occaecat cupidatat non proident.',
        timeAgo: '4 hours ago',
        answersCount: 2,
      },
      {
        id: 'c4-2',
        username: 'mark_levin',
        text: 'Sunt in culpa qui officia deserunt mollit.',
        timeAgo: '3 hours ago',
      },
    ],
  },
]
