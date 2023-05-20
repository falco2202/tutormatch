import Sidebar from '@/layouts/admin/Sidebar'
import Header from '@/layouts/admin/Header'
import Footer from '@/layouts/admin/Footer'
import { Outlet } from 'react-router-dom'

export default function AdminPage() {
  return (
    <>
      <Header />
      <div className="flex content">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-5/6 m-6">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  )
}
