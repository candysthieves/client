import { io } from 'socket.io-client'

export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ['websocket'],
  // auth: {
  //   token: typeof window !== 'undefined' ? localStorage.getItem(ACCESS_TOKEN_LS_KEY) : null,
  // },
})
