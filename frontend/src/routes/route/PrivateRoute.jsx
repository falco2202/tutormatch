import { getLocalStorage, USER_TOKEN } from '@/utils/storage'
import { Navigate } from 'react-router-dom'
const PrivateRoute = ({ children }) => {
  const localStorageToken = getLocalStorage(USER_TOKEN)
  if (!localStorageToken) {
    return <Navigate to="/login" />
  }
  return <>{children}</>
}

export default PrivateRoute
