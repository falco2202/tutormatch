import { Route, Routes, useNavigate } from 'react-router-dom'
import routes from '@/routes'
import CommonLayout from '@/pages/CommonLayout'
import PrivateRoute from '@/routes/route/PrivateRoute'
import AuthRoute from '@/routes/route/AuthRoute'
import publicRoutes from '@/routes/route/publicRoutes'
import authRoute from './routes/authRoutes'
import 'dayjs/locale/en'
import 'dayjs/locale/vi'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setIsUnauthenticated } from '@/redux/reducers/authReducers'
import { removeAuthInfo } from '@/redux/reducers/authReducers'
import CommonNotification from '@/components/notifications/CommonNotification'
import { getNotificationChannelName } from '@/utils/helper'
import {
  addNewNotification,
  requestGetNotifications
} from '@/redux/reducers/notificationReducers'
import {
  initSocket,
  listenNotification,
  stopListenEvent
} from '@/utils/realtimeHelper'
import { getLocalStorage } from '@/utils/storage'
import { USER_ID } from '@/constants/tokenValue'
import { ROLES } from '@/constants/common'

const App = () => {
  const { isUnauthenticated, role, profileData } = useSelector(
    (state) => state.authSlice
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userId = profileData.id || +getLocalStorage(USER_ID)

  useEffect(() => {
    if (isUnauthenticated) {
      dispatch(removeAuthInfo())
      dispatch(setIsUnauthenticated(false))
      navigate('/login')
    }
  }, [isUnauthenticated])

  useEffect(() => {
    if (profileData.email && !window.Echo) {
      initSocket()
    }
    if (profileData.email && role !== ROLES.ADMIN) {
      dispatch(requestGetNotifications())
      listenNotification(getNotificationChannelName(userId), (notification) => {
        dispatch(addNewNotification(notification))
      })
    }
    return () => {
      stopListenEvent(getNotificationChannelName(userId))
    }
  }, [profileData.email])

  return (
    <Routes>
      {/* Public Route */}
      {publicRoutes.map((val) => (
        <Route key={val.name} path={val.path} element={val.component} />
      ))}
      {/* Auth Route */}
      {authRoute.map((val) => (
        <Route
          key={val.name}
          path={val.path}
          exact={val.exact}
          name={val.name}
          element={<AuthRoute>{val.component}</AuthRoute>}
        />
      ))}
      {/* Private Route */}
      <Route path="/" element={<CommonLayout />}>
        {routes.map((val) => (
          <Route
            key={val.name}
            path={val.path}
            exact={val.exact}
            name={val.name}
            element={<PrivateRoute>{val.component}</PrivateRoute>}
          />
        ))}
        <Route path="*" element={<CommonNotification />} />
      </Route>
    </Routes>
  )
}

export default App
