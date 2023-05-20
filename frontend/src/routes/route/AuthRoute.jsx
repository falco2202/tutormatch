import { ROLES } from '@/constants/common'
import { USER_ROLE } from '@/constants/defaultValue'
import { getLocalStorage, USER_TOKEN } from '@/utils/storage'
import { Navigate } from 'react-router-dom'
const AuthRoute = ({ children }) => {
  const localStorageToken = getLocalStorage(USER_TOKEN)
  const localStorageRole = parseInt(getLocalStorage(USER_ROLE))
  if (localStorageToken) {
    if (localStorageRole === ROLES.ADMIN) {
      return <Navigate to="/admin/teachers" />
    }
    return <Navigate to="/" />
  }
  return <>{children}</>
}

export default AuthRoute
