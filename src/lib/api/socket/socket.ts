import { io } from 'socket.io-client'
import { authMe } from '@/lib/api'
import { ACCESS_TOKEN_LS_KEY } from '@/lib/model'

export const TEMPORARY_SOCKET_URL = 'http://localhost:5002' // TODO change to real URL from backend and set as env to socket

// export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
export const socket = io(TEMPORARY_SOCKET_URL, {
  autoConnect: false,
  transports: ['websocket'],
  auth: callback => {
    callback({
      token: localStorage.getItem(ACCESS_TOKEN_LS_KEY),
    })
  },
})
