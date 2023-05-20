import apiClient from '@/api/apiClient'
import { CHAT } from '@/api/constants'

const getMessageList = (params) =>
  apiClient.get(`${CHAT.API_CHAT}/${params.chatId}`, {
    params: { page: params.page }
  })

const getConversationList = (params) => apiClient.get(CHAT.API_CHAT, { params })

const sendMessageChat = (data) => apiClient.post(CHAT.API_CHAT, data)

export { getConversationList, getMessageList, sendMessageChat }
