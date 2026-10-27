import type { AppNotification } from '@/lib/model'

export const mockNotifications: AppNotification[] = [
  {
    id: '1',
    type: 'payment',
    title: 'New notification',
    message: 'Следующий платеж у вас спишется через 1 день',
    createdAt: '1 час назад',
    isRead: false,
  },
  {
    id: '2',
    type: 'payment',
    title: 'New notification',
    message: 'Следующий платеж у вас спишется через 5 дней',
    createdAt: '4 дня назад',
    isRead: false,
  },
  {
    id: '3',
    type: 'message',
    title: 'New Message',
    message: '@Usertest sent you a message',
    createdAt: '1 час назад',
    isRead: false,
  },
  {
    id: '4',
    type: 'like',
    title: 'New Like',
    message: '@Usertest liked your post',
    createdAt: '1 час назад',
    isRead: false,
  },
  {
    id: '5',
    type: 'comment',
    title: 'New Comment',
    message: '@Usertest commented your post',
    createdAt: '1 час назад',
    isRead: true,
  },
  {
    id: '6',
    type: 'subscription',
    title: 'New notification',
    message: 'Your subscription expires in 7 days',
    createdAt: '1 час назад',
    isRead: true,
  },
]
