import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { getLocalStorage, USER_TOKEN } from '@/utils/storage'

export const initSocket = () => {
  const token = getLocalStorage(USER_TOKEN)
  window.Pusher = Pusher

  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_ABLY_PUBLIC_KEY,
    wsHost: 'realtime-pusher.ably.io',
    wsPort: 443,
    disableStats: true,
    encrypted: true,
    authEndpoint: import.meta.env.VITE_AUTH_ENDPOINT,
    cluster: '',
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    }
  })
}

export const listenChannel = (channelName, eventName, request) => {
  window.Echo.private(channelName).listen(eventName, request)
}

export const stopListenEvent = (channelName) => {
  const socketId = window.Echo?.socketId()
  if (socketId) {
    window.Echo.leave(channelName)
  }
}

export const listenNotification = (channelName, request) => {
  window.Echo.private(channelName).notification(request)
}
