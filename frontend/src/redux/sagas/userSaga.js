import { call, put, takeLatest } from 'redux-saga/effects'
import {
  toggleLoading,
  requestGetParent,
  requestGetParentDetail,
  requestGetTeacher,
  requestGetTeacherDetail,
  requestSetConfirmTeacher,
  requestGetStudentDetail,
  setStatusUser,
  requestSetLockAndUnlockTeacher,
  setListData,
  setDetailData,
  requestGetClassroom,
  requestGetStudent
} from '@/redux/reducers/userReducers'

import {
  getParentsList,
  getParentDetail,
  getTeachersList,
  getTeacherDetail,
  setConfirmTeacher,
  setLockAndUnlockTeacher,
  getListClassroom,
  getStudentsList,
  getStudentDetail
} from '@/api'
import { setIsUnauthenticated } from '@/redux/reducers/authReducers'
import pushNotification from '@/utils/notification'
import { handleResMessage } from '@/utils/helper'

function* getParentsListSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(getParentsList, payload)
    yield put(setListData(response.data))
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

function* getParentDetailSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(getParentDetail, payload)
    yield put(setDetailData(response))
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

function* getTeacherListSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(getTeachersList, payload)
    yield put(setListData(response.data))
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

function* getTeacherDetailSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(getTeacherDetail, payload)
    yield put(setDetailData(response))
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

function* getStudentDetailSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(getStudentDetail, payload)
    yield put(setDetailData(response))
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

function* setConfirmTeacherSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(setConfirmTeacher, payload)
    yield put(setStatusUser(response))
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

function* setLockAndUnlockTeacherSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(setLockAndUnlockTeacher, payload)
    yield put(setStatusUser(response))
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

function* getListClassroomSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(getListClassroom, payload)
    yield put(setListData(response.data))
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
function* getStudentsListSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(getStudentsList, payload)
    yield put(setListData(response.data))
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
  yield takeLatest(requestGetParent, getParentsListSaga)
  yield takeLatest(requestGetParentDetail, getParentDetailSaga)
  yield takeLatest(requestGetTeacher, getTeacherListSaga)
  yield takeLatest(requestGetTeacherDetail, getTeacherDetailSaga)
  yield takeLatest(requestGetStudentDetail, getStudentDetailSaga)
  yield takeLatest(requestSetConfirmTeacher, setConfirmTeacherSaga)
  yield takeLatest(requestSetLockAndUnlockTeacher, setLockAndUnlockTeacherSaga)
  yield takeLatest(requestGetClassroom, getListClassroomSaga)
  yield takeLatest(requestGetStudent, getStudentsListSaga)
}
