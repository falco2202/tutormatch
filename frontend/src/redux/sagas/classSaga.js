import { call, put, takeLatest } from 'redux-saga/effects'
import {
  toggleLoading,
  requestGetListClass,
  setClassList,
  requestDeleteClassroom,
  requestApprovalAndCancel,
  requestAttendanceClassroom,
  requestGetDetailClassGlobal,
  requestGetDetailClass,
  setDetailClass,
  requestFeedbackClassroom,
  updateFeedbackList,
  addFeedback
} from '@/redux/reducers/classReducers'
import {
  getListClassroomManagement,
  deleteClassroom,
  getDetailClassroom,
  approvalAndCancel,
  attendanceClassroomApi,
  getDetailClassGlobal,
  getStudentsList,
  feedbackClassroom
} from '@/api'
import { setIsUnauthenticated } from '@/redux/reducers/authReducers'
import pushNotification from '@/utils/notification'
import { handleResMessage } from '@/utils/helper'
import { STATUS } from '@/constants/defaultValue'
import { setListData } from '@/redux/reducers/userReducers'

function* getClassroomListSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(getListClassroomManagement, payload)
    yield put(setClassList(response.data))
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

function* deleteClassroomSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(deleteClassroom, payload)
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

function* getDetailClassroomSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(getDetailClassroom, payload)
    yield put(setDetailClass(response.data))
    // Đối ứng call 2 api, vì api detail class của phụ huynh không có feedback
    // BE hết effort vì tập trung làm tài liêu
    const responseDetailClassGlobal = yield call(getDetailClassGlobal, payload)
    yield put(addFeedback(responseDetailClassGlobal.data))
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
function* setApprovalAndCancel({ payload }) {
  const { classroomId } = payload
  yield put(toggleLoading(true))
  try {
    const response = yield call(approvalAndCancel, payload)
    const { data: detailClassroom } = yield call(
      getDetailClassroom,
      classroomId
    )
    yield put(setDetailClass(detailClassroom))
    const { data: listStudent } = yield call(getStudentsList, {
      classroom_id: classroomId,
      student_status: STATUS.STUDENT.PENDING,
      page_size: 9999
    })
    yield put(setListData(listStudent))
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

function* attendanceClassroomSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(attendanceClassroomApi, payload)
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

function* getDetailClassGlobalSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(getDetailClassGlobal, payload)
    yield put(setDetailClass(response.data))
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

function* feedbackClassroomSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    yield call(feedbackClassroom, payload.data)
    yield put(updateFeedbackList(payload))
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

export default function* classSaga() {
  yield takeLatest(requestGetListClass, getClassroomListSaga)
  yield takeLatest(requestDeleteClassroom, deleteClassroomSaga)
  yield takeLatest(requestGetDetailClass, getDetailClassroomSaga)
  yield takeLatest(requestApprovalAndCancel, setApprovalAndCancel)
  yield takeLatest(requestAttendanceClassroom, attendanceClassroomSaga)
  yield takeLatest(requestGetDetailClassGlobal, getDetailClassGlobalSaga)
  yield takeLatest(requestFeedbackClassroom, feedbackClassroomSaga)
}
