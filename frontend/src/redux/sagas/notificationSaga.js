import { call, put, takeLatest } from 'redux-saga/effects'
import {
  toggleLoading,
  setNotificationList,
  requestGetNotifications,
  setDetailNotification,
  requestGetDetailNotification,
  requestSendNotification
} from '@/redux/reducers/notificationReducers'
import {
  getDetailNotificationApi,
  getNotificationListApi,
  sendNotification
} from '@/api'
import pushNotification from '@/utils/notification'
import { setIsUnauthenticated } from '@/redux/reducers/authReducers'
import { handleResMessage } from '@/utils/helper'

function* getNotificationListSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(getNotificationListApi, payload)
    yield put(setNotificationList(response.data))
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

function* getDetailNotificationListSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(getDetailNotificationApi, payload)
    let detailData = response.data
    detailData = { ...detailData, ...JSON.parse(detailData.data) }
    delete detailData.data
    yield put(setDetailNotification(detailData))
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

function* sendNotificationSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(sendNotification, payload)
    const { type, message } = handleResMessage(response)
    yield pushNotification({
      type,
      message
    })
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

export default function* userSaga() {
  yield takeLatest(requestGetNotifications, getNotificationListSaga)
  yield takeLatest(requestGetDetailNotification, getDetailNotificationListSaga)
  yield takeLatest(requestSendNotification, sendNotificationSaga)
}
