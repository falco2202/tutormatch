import { INIT_PAGE_PARAM } from '@/constants/defaultValue'
import { updateConversationWhenSendMessage } from '@/utils/helper'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  conversations: [],
  listeningChannel: null,
  messageListItem: {
    items: [],
    total: 0,
    currentPage: 1
  }
}

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    requestGetConversations: () => {},
    requestGetTeacherConversations: () => {},
    requestGetMessages: () => {},
    requestSendMessage: () => {},
    setMessageList: (state, { payload }) => {
      state.messageListItem = {
        ...payload,
        items: [...state.messageListItem.items, ...payload.items]
      }
    },
    toggleLoading: (state, { payload }) => {
      state.isLoading = payload
    },

    setConversationList: (state, { payload }) => {
      state.conversations = payload
    },
    clearMessages: (state) => {
      state.messageListItem = initialState.messageListItem
    },
    addNewMessageToList: (state, { payload }) => {
      // Nếu người gửi là teacher và admin ko lắng nghe đúng channel
      // của teacher thì ko thêm tin nhắn mới vào messageList hiện tại
      if (
        !payload.is_admin &&
        payload.conversation.name &&
        state.listeningChannel &&
        payload.conversation.name !== state.listeningChannel
      ) {
        return
      }
      state.messageListItem.total = state.messageListItem.total + 1
      // Khi gửi/nhận tin nhắn mới -> thêm tin nhắn mới vào đầu array
      state.messageListItem.items.unshift(payload)
      // Xóa tin nhắn cuối cùng khỏi array để lần trigger call tin
      // nhắn ở page tiếp theo ko bị lặp tin nhắn cũ
      if (state.messageListItem.items.length > INIT_PAGE_PARAM.PAGE_SIZE) {
        state.messageListItem.items.pop()
      }
    },
    setListeningChannel: (state, { payload }) => {
      state.listeningChannel = payload
    },

    updateConversationList: (state, { payload }) => {
      updateConversationWhenSendMessage(state.conversations, payload)
    }
  }
})

export const {
  requestGetConversations,
  requestGetTeacherConversations,
  setConversationList,
  toggleLoading,
  requestGetMessages,
  setMessageList,
  requestSendMessage,
  clearMessages,
  updateConversation,
  addNewMessageToList,
  setListeningChannel,
  updateConversationList
} = chatSlice.actions

export default chatSlice.reducer
