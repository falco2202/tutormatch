import Sidebar from '@/layouts/admin/Sidebar'
import Header from '@/layouts/admin/Header'
import Footer from '@/layouts/admin/Footer'
import { Outlet } from 'react-router-dom'
import { ROLES } from '@/constants/common'
import { getLocalStorage } from '@/utils/storage'
import { USER_ROLE } from '@/constants/defaultValue'
import ChatPopUp from '@/layouts/ChatPopUp'
import { useSelector } from 'react-redux'

export default function CommonLayout() {
  const { role } = useSelector((status) => status.authSlice)

  const roleId = role || +getLocalStorage(USER_ROLE)

  return (
    <>
      <Header />
      <div className="flex content">
        {role === ROLES.ADMIN && (
          <div className="w-1/6">
            <Sidebar />
          </div>
        )}
        <div className="w-full p-6">
          <Outlet />
        </div>
      </div>
      <div className="fixed bottom-0 right-0">
        {roleId === ROLES.TEACHER && <ChatPopUp />}
      </div>
      <Footer />
    </>
  )
}
