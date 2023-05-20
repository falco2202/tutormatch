import { put, call, takeLatest } from 'redux-saga/effects'
import pushNotification from '@/utils/notification'
import { handleResMessage } from '@/utils/helper'
import {
  loginApi,
  registerApi,
  logoutApi,
  getProfileApi,
  updateProfileApi,
  createAccountStudentApi,
  verifyEmailApi
} from '@/api'
import {
  requestLogin,
  toggleLoading,
  requestRegister,
  requestLogout,
  removeAuthInfo,
  setCurrentUser,
  setAvatar,
  requestAvatar,
  requestGetMe,
  setProfileUser,
  requestUpdateProfile,
  requestCreateAccountStudent,
  setCreateAccount,
  setIsUnauthenticated,
  setDataVerifyEmail,
  setStatusVerifyEmail,
  requestVerifyEmail
} from '@/redux/reducers/authReducers'
import { USER_TOKEN, getLocalStorage, setLocalStorage } from '@/utils/storage'
import { uploadImageApi } from '@/api/uploadImage'
import { LANGUAGE_KEY } from '@/constants/tokenValue'
import { SET_UP } from '@/constants/common'

function* loginSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const res = yield call(loginApi, payload)
    yield put(setCurrentUser(res))
    setLocalStorage(LANGUAGE_KEY, SET_UP.SYSTEM_LANGUAGE.VIETNAMESE)
    const { type, message } = handleResMessage(res)
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

function* registerFormSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(registerApi, payload.data)
    const { type, message, isUnauthenticated } = handleResMessage(response)
    yield pushNotification({
      type,
      message
    })
    payload.callback()
    yield put(setIsUnauthenticated(isUnauthenticated))
  } catch (error) {
    const { type, message } = handleResMessage(error)
    yield pushNotification({
      type,
      message
    })
  } finally {
    yield put(toggleLoading(false))
  }
}

function* logoutSaga() {
  yield put(toggleLoading(true))
  try {
    const getToken = getLocalStorage(USER_TOKEN)
    yield call(logoutApi, getToken)
    yield put(removeAuthInfo())
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

function* avatarSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const res = yield call(uploadImageApi, payload)
    const { type, message } = handleResMessage(res)
    yield pushNotification({
      type,
      message
    })
    const avatarFile = payload.get('file')
    const avatarUrl = URL.createObjectURL(avatarFile)
    yield put(setAvatar(avatarUrl))
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

function* getMeSaga() {
  yield put(toggleLoading(true))
  try {
    const res = yield call(getProfileApi)
    yield put(setProfileUser(res))
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

function* setProfileSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(updateProfileApi, payload)
    yield put(setProfileUser(response))
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

function* createAccountStudentSaga({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(createAccountStudentApi, payload)
    yield put(setCreateAccount(payload))
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

function* verifyEmail({ payload }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(verifyEmailApi, payload)
    yield put(setDataVerifyEmail(response.data))
  } catch (error) {
    const { type, message, isUnauthenticated } = handleResMessage(error)
    yield pushNotification({
      type,
      message
    })
    yield put(setIsUnauthenticated(isUnauthenticated))
    yield put(setStatusVerifyEmail(false))
  } finally {
    yield put(toggleLoading(false))
  }
}

export default function* authSaga() {
  yield takeLatest(requestLogin, loginSaga)
  yield takeLatest(requestRegister, registerFormSaga)
  yield takeLatest(requestLogout, logoutSaga)
  yield takeLatest(requestAvatar, avatarSaga)
  yield takeLatest(requestGetMe, getMeSaga)
  yield takeLatest(requestUpdateProfile, setProfileSaga)
  yield takeLatest(requestCreateAccountStudent, createAccountStudentSaga)
  yield takeLatest(requestVerifyEmail, verifyEmail)
}
