import { all } from 'redux-saga/effects'
import appSaga from '@/redux/sagas/appSaga'
import userSaga from '@/redux/sagas/userSaga'
import authSaga from '@/redux/sagas/authSaga'
import chatSaga from '@/redux/sagas/chatSaga'
import classSaga from '@/redux/sagas/classSaga'
import notificationSaga from '@/redux/sagas/notificationSaga'

export default function* rootSaga() {
  yield all([
    appSaga(),
    authSaga(),
    userSaga(),
    chatSaga(),
    classSaga(),
    notificationSaga()
  ])
}
