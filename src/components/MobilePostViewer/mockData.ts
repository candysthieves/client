export type PostImage = {
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
  createdAt: string
  willBeDeletedIn: Date | null
}

export const mockPosts: Post[] = [
  {
    postId: '1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1778017458320-fd7f6688cbf5?q=80&w=1080&h=1080&auto=format&fit=crop',
        width: 1080,
        height: 1080,
      },
      {
        url: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&h=1250&auto=format&fit=crop',
        width: 1000,
        height: 1250,
      },
      {
        url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1280&h=720&auto=format&fit=crop',
        width: 1280,
        height: 720,
      },
    ],
    preview: {
      url: 'https://images.unsplash.com/photo-1778017458320-fd7f6688cbf5?q=80&w=196&h=196&auto=format&fit=crop',
    },
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
        url: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&h=1250&auto=format&fit=crop',
        width: 1000,
        height: 1250,
      },
    ],
    preview: {
      url: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=296&h=296&auto=format&fit=crop',
    },
    userId: 'user-2',
    userName: 'anna.murphy',
    createdAt: '5 hours ago',
    willBeDeletedIn: null,
  },
  {
    postId: '3',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1280&h=720&auto=format&fit=crop',
        width: 1280,
        height: 720,
      },
    ],
    preview: {
      url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=296&h=296&auto=format&fit=crop',
    },
    userId: 'user-3',
    userName: 'dmitry_k',
    createdAt: 'yesterday',
    willBeDeletedIn: null,
  },
]
