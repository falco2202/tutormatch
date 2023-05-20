import { takeLatest, call, put } from 'redux-saga/effects'
import { handleResMessage } from '@/utils/helper'
import {
  requestIncrease,
  increase,
  decrease,
  toggleLoading,
  setListWard,
  requestGetWard,
  requestGetCity,
  setListCity
} from '@/redux/reducers/appReducers'
import { setIsUnauthenticated } from '@/redux/reducers/authReducers'
import pushNotification from '@/utils/notification'
import { getCityApi, getWardApi } from '@/api/wardApi'
// Day se la function call api, function ben duoi chi la simulator
const fakePromise = () =>
  new Promise((resolve, reject) => {
    const randomNumber = Math.round(Math.random())
    setTimeout(() => {
      if (randomNumber) {
        return resolve('foo')
      }
      reject('fail')
    }, 1500)
  })

function* increaseCount() {
  yield put(toggleLoading(true))
  try {
    yield call(fakePromise)
    yield put(increase())
    yield pushNotification({ type: 'success', message: 'Success' })
  } catch (error) {
    yield pushNotification({ type: 'error', message: error })
  } finally {
    yield put(toggleLoading(false))
  }
}

function* decreaseCount() {
  yield put(toggleLoading(true))
  try {
    yield call(fakePromise)
    yield put(decrease())
    yield pushNotification({ type: 'success', message: 'Tru duoc roi ne' })
  } catch (error) {
    yield pushNotification({ type: 'error', message: error })
  } finally {
    yield put(toggleLoading(false))
  }
}

function* getWard() {
  yield put(toggleLoading(true))
  try {
    const { data } = yield call(getWardApi)
    yield put(setListWard(data))
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

function* getCity() {
  yield put(toggleLoading(true))
  try {
    const { data } = yield call(getCityApi)
    yield put(setListCity(data))
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

export default function* appSaga() {
  yield takeLatest(requestIncrease, increaseCount)
  yield takeLatest(decrease, decreaseCount)
  yield takeLatest(requestGetWard, getWard)
  yield takeLatest(requestGetCity, getCity)
}
