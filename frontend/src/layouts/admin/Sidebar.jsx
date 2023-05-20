import {
  // HomeOutlined,
  MehOutlined,
  TeamOutlined,
  UserOutlined,
  FileTextOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { useMemo } from 'react'

export default function Sidebar() {
  const location = useLocation()
  const { t } = useTranslation()

  const menu = [
    //TODO: chưa có task làm dashboard, tạm để quản lý giáo viên làm trang chủ
    // {
    //   label: <Link to="/admin">{t('common.sidebar.dashboard')}</Link>,
    //   key: 'admin',
    //   icon: <HomeOutlined />
    // },
    {
      label: (
        <Link to="/admin/teachers">
          {t('common.sidebar.teacher_management')}
        </Link>
      ),
      key: 'teachers',
      icon: <UserOutlined />
    },
    {
      label: (
        <Link to="/admin/classroom">
          {t('common.sidebar.classroom_management')}
        </Link>
      ),
      key: 'classroom',
      icon: <FileTextOutlined />
    },
    {
      label: (
        <Link to="/admin/parents">{t('common.sidebar.parent_management')}</Link>
      ),
      key: 'parents',
      icon: <TeamOutlined />
    },
    {
      label: (
        <Link to="/admin/students">
          {t('common.sidebar.student_management')}
        </Link>
      ),
      key: 'students',
      icon: <MehOutlined />
    }
  ]

  const selectedSidebar = useMemo(
    () => [
      location.pathname.split('/')[2] || location.pathname.split('/').pop()
    ],
    [location.pathname]
  )

  return (
    <div>
      <Menu mode="vertical" selectedKeys={selectedSidebar} items={menu}></Menu>
    </div>
  )
}
