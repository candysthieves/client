export type MockPost = {
  id: string
  images: string[]
  username: string
  timeAgo: string
  caption: string
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
  },
  {
    id: '3',
    images: ['https://picsum.photos/seed/post3a/400/400'],
    username: 'mike_wilson',
    timeAgo: '3 hours ago',
    caption:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
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
  },
]
