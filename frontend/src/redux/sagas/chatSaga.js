import pushNotification from '@/utils/notification'
import { handleResMessage } from '@/utils/helper'
import { call, put, takeLatest } from 'redux-saga/effects'
import { sendMessageChat, getMessageList, getConversationList } from '@/api'
import { setIsUnauthenticated } from '@/redux/reducers/authReducers'

import {
  requestGetMessages,
  setMessageList,
  requestGetConversations,
  requestGetTeacherConversations,
  setConversationList,
  toggleLoading,
  requestSendMessage,
  addNewMessageToList,
  updateConversationList
} from '@/redux/reducers/chatReducers'

function* getConversationListSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(getConversationList, payload)
    yield put(setConversationList(response.data))
  } catch (error) {
    const { type, message, isUnauthenticated } = handleResMessage(error)
    yield pushNotification({
      type,
      message
    })
    yield put(setIsUnauthenticated(isUnauthenticated))
  } finally {
    yield put(toggleLoading(false))
  }
}

function* getMessageListSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(getMessageList, payload)
    yield put(setMessageList(response.data))
  } catch (error) {
    const { type, message, isUnauthenticated } = handleResMessage(error)
    yield pushNotification({
      type,
      message
    })
    yield put(setIsUnauthenticated(isUnauthenticated))
  } finally {
    yield put(toggleLoading(false))
  }
}

function* sendMessageSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const responseMessage = yield call(sendMessageChat, payload)
    const { data } = responseMessage
    const { message, channelName } = data
    const newMessage = {
      ...message,
      conversation: { name: channelName }
    }
    yield put(addNewMessageToList(newMessage))
    yield put(updateConversationList(newMessage))
  } catch (error) {
    const { type, message, isUnauthenticated } = handleResMessage(error)
    yield pushNotification({
      type,
      message
    })
    yield put(setIsUnauthenticated(isUnauthenticated))
  } finally {
    yield put(toggleLoading(false))
  }
}

function* getTeacherConversationSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const { data: conversation } = yield call(getConversationList)
    yield put(setConversationList(conversation))
    if (conversation[0] && conversation[0].userId === payload) {
      const { data } = yield call(getMessageList, {
        chatId: conversation[0].id
      })
      yield put(setMessageList({ ...data, chatId: conversation[0].id }))
    }
  } catch (error) {
    const { type, message, isUnauthenticated } = handleResMessage(error)
    yield pushNotification({
      type,
      message
    })
    yield put(setIsUnauthenticated(isUnauthenticated))
  } finally {
    yield put(toggleLoading(false))
  }
}

export default function* chatSaga() {
  yield takeLatest(requestGetMessages, getMessageListSaga)
  yield takeLatest(requestGetConversations, getConversationListSaga)
  yield takeLatest(requestGetTeacherConversations, getTeacherConversationSaga)
  yield takeLatest(requestSendMessage, sendMessageSaga)
}
