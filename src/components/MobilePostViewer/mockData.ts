// Temporary types and mock data for MobilePostViewer.

export type PostImage = {
  // inner fields are not finalized by the backend yet
  url: string
  width?: number
  height?: number
}

export type PostPreview = {
  url: string
}

export type Post = {
  postId: string
  description?: string
  images: PostImage[]
  preview: PostPreview
  userId: string
  userName: string
  avatarUrl?: string
  createdAt: string
  willBeDeletedIn: Date | null
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=986&h=1130&auto=format&fit=crop`

const previewOf = (id: string) => ({
  url: `https://images.unsplash.com/${id}?q=80&w=196&h=226&auto=format&fit=crop`,
})

export const mockPosts: Post[] = [
  {
    postId: '1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    images: [
      {
        url: unsplash('photo-1778017458320-fd7f6688cbf5'),
        width: 986,
        height: 1130,
      },
      {
        url: unsplash('photo-1503023345310-bd7c1de61c7d'),
        width: 986,
        height: 1130,
      },
    ],
    preview: previewOf('photo-1778017458320-fd7f6688cbf5'),
    avatarUrl: 'https://i.pravatar.cc/96?img=12',
    userId: 'user-1',
    userName: 'alex_johnson',
    createdAt: '2 hours ago',
    willBeDeletedIn: null,
  },
  {
    postId: '2',
    description: 'Weekend trip to the mountains. No filter needed.',
    images: [
      {
        url: unsplash('photo-1506744038136-46273834b3fb'),
        width: 986,
        height: 1130,
      },
    ],
    preview: previewOf('photo-1506744038136-46273834b3fb'),
    avatarUrl: 'https://i.pravatar.cc/96?img=15',
    userId: 'user-2',
    userName: 'anna.murphy',
    createdAt: '5 hours ago',
    willBeDeletedIn: null,
  },
  {
    postId: '3',
    images: [
      {
        url: unsplash('photo-1441974231531-c6227db76b6e'),
        width: 986,
        height: 1130,
      },
    ],
    preview: previewOf('photo-1441974231531-c6227db76b6e'),
    avatarUrl: 'https://i.pravatar.cc/96?img=33',
    userId: 'user-3',
    userName: 'dmitry_k',
    createdAt: 'yesterday',
    willBeDeletedIn: null,
  },
  {
    postId: '4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.',
    images: [
      {
        url: unsplash('photo-1465146344425-f00d5f5c8f07'),
        width: 986,
        height: 1130,
      },
    ],
    preview: previewOf('photo-1465146344425-f00d5f5c8f07'),
    avatarUrl: 'https://i.pravatar.cc/96?img=25',
    userId: 'user-4',
    userName: 'jane_doe',
    createdAt: '3 days ago',
    willBeDeletedIn: null,
  },
]
