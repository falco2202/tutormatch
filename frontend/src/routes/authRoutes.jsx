import Register from '@/pages/Register'
import Login from '@/pages/Login'

const authRoutes = [
  {
    name: 'register',
    path: 'register',
    component: <Register />
  },
  {
    name: 'login',
    path: 'login',
    component: <Login />
  }
]

export default authRoutes
