import { useEffect, useMemo, useState } from 'react'
import {
  MessageOutlined,
  UserOutlined,
  BellOutlined,
  GlobalOutlined
} from '@ant-design/icons'
import { Col, Row, Dropdown, Button, Popover } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate, Link } from 'react-router-dom'
import { requestGetMe, requestLogout } from '@/redux/reducers/authReducers'
import { useDispatch, useSelector } from 'react-redux'
import { getLocalStorage } from '@/utils/storage'
import { generateUniqueKey, handleChangeLanguage } from '@/utils/helper'
import { ROLES } from '@/constants/common'
import { TABS } from '@/constants/profile'
import { USER_ROLE } from '@/constants/defaultValue'
import { NotificationList } from '@/components/notifications/NotificationList'
import { LANGUAGE_KEY, USER_TOKEN } from '@/constants/tokenValue'
import { requestGetNotifications } from '@/redux/reducers/notificationReducers'
import logo_tutormatch from '@/assets/images/logo_tutormatch.png'
import dayjs from 'dayjs'

function Header() {
  const { t } = useTranslation()
  const { profileData } = useSelector((state) => state.authSlice)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const role = parseInt(getLocalStorage(USER_ROLE))
  const languageKey = getLocalStorage(LANGUAGE_KEY)
  const token = getLocalStorage(USER_TOKEN)
  useEffect(() => {
    if (token && !profileData.email) {
      dispatch(requestGetMe())
    }
  }, [])

  useEffect(() => {
    if (!profileData) {
      navigate('/')
    }
  }, [profileData])

  const { items, total, currentPage } = useSelector(
    (state) => state.notificationSlice
  )
  const languageItems = [
    {
      key: 'vi',
      label: 'Tiếng Việt - VI',
      onClick: () => handleChangeLanguage('vi', setLocale)
    },
    {
      key: 'en',
      label: 'English - EN',
      onClick: () => handleChangeLanguage('en', setLocale)
    }
  ]

  // TODO waiting for eslint config
  // eslint-disable-next-line no-unused-vars
  const [_, setLocale] = useState('vi')

  useEffect(() => {
    dayjs.locale(languageKey)
    setLocale(languageKey)
  }, [])

  const dropdownItems = [
    {
      key: 1,
      label: (
        <Button
          className="border-none w-full bg-transparent shadow-none flex"
          onClick={() =>
            navigate({
              pathname: '/profile',
              hash: TABS.INFORMATION
            })
          }
        >
          {t('common.profile.title')}
        </Button>
      )
    },
    {
      key: 2,
      label: (
        <Button
          className="border-none bg-transparent shadow-none flex"
          onClick={() => dispatch(requestLogout())}
        >
          <span>{t('common.button.logout')}</span>
        </Button>
      )
    }
  ]
  const headerItems = [
    {
      key: generateUniqueKey('header', 1),
      title: t('common.header.home'),
      path: '/',
      rolesAccess: [ROLES.PARENT, ROLES.STUDENT, ROLES.TEACHER]
    },
    {
      key: generateUniqueKey('header', 2),
      title: t('common.header.classes'),
      path: '/classes',
      rolesAccess: [ROLES.PARENT, ROLES.STUDENT]
    },
    {
      key: generateUniqueKey('header', 3),
      title: t('common.header.classroom_management'),
      path: '/class-management',
      rolesAccess: [ROLES.TEACHER]
    },
    //TODO_BETA
    {
      key: generateUniqueKey('header', 4),
      title: t('common.header.tests'),
      path: '/tests',
      rolesAccess: [ROLES.STUDENT]
    },
    {
      key: generateUniqueKey('header', 5),
      title: t('common.header.exercise'),
      path: '/exercise',
      rolesAccess: [ROLES.TEACHER]
    },
    // TODO_BETA: header calendar
    {
      key: generateUniqueKey('header', 6),
      title: t('classroom.add_classroom.classroom_schedule'),
      path: '/calendar',
      rolesAccess: [ROLES.TEACHER, ROLES.PARENT]
    },
    {
      key: generateUniqueKey('header', 7),
      title: t('classroom.add_classroom.classroom_schedule'),
      path: '/schedule',
      rolesAccess: [ROLES.STUDENT]
    }
    // TODO: Chức năng payment tạm thời lược bỏ
    // {
    //   key: generateUniqueKey('header', 5),
    //   title: t('common.header.payment'),
    //   path: '/payment',
    //   rolesAccess: [ROLES.TEACHER]
    // }
  ]

  const headerItemsMemo = useMemo(() => {
    const itemsFiltered = headerItems.filter(
      (item) => !item.rolesAccess || item.rolesAccess.includes(role)
    )
    if (!profileData.email || role === ROLES.ADMIN) {
      return null
    }

    return (
      <div className="nav-bar flex gap-6">
        {itemsFiltered.map((item, idx) => (
          <Link
            className="no-underline"
            key={generateUniqueKey('nav-item', idx)}
            to={item.path}
          >
            <span className="text-white tracking-widest font-semibold">
              {item.title.toUpperCase()}
            </span>
          </Link>
        ))}
      </div>
    )
  }, [role, languageKey, profileData])

  const hasMore = useMemo(() => +items.length < +total, [items.length])

  const handleLoadMore = () => {
    if (!hasMore) return
    dispatch(
      requestGetNotifications({
        page: currentPage + 1
      })
    )
  }

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen)
  }

  const renderUserInfo = useMemo(() => {
    if (!profileData.email) {
      return (
        <Row className="space-x-4">
          <Button onClick={() => navigate('/login')}>
            {t('common.button.login')}
          </Button>
          <Button onClick={() => navigate('/register')}>
            {t('common.button.register')}
          </Button>
        </Row>
      )
    }
    return (
      <Row className="header__option" justify="end" align="middle">
        <Col span={2} className="header__notify">
          {role === ROLES.ADMIN && (
            <MessageOutlined
              className="header__option-icon"
              onClick={() => navigate('/admin/chat')}
            />
          )}
        </Col>
        <Col span={2} className="header__notify">
          <Popover
            content={
              <NotificationList
                hasMore={hasMore}
                loadMore={handleLoadMore}
                setOpen={setOpen}
              />
            }
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <BellOutlined className="header__option-icon" />
          </Popover>
        </Col>
        <Col span={2} className="header__notify">
          <Dropdown
            menu={{
              items: languageItems
            }}
            placement="bottomRight"
          >
            <span className="dropdown-header">
              <GlobalOutlined className="mr-1" />
              {t('common.header.language_key')}
            </span>
          </Dropdown>
        </Col>
        <Col className="header__notify ml-4">
          <Dropdown
            className="header--dropdown"
            menu={{ items: dropdownItems }}
            placement="bottomRight"
          >
            <div className="flex">
              <UserOutlined className="header__option-icon" />
              <p>
                {t('hello')}, {profileData.fullName}
              </p>
            </div>
          </Dropdown>
        </Col>
      </Row>
    )
  }, [profileData, role, languageKey, items, open])

  const isAdminRoute = useMemo(() => {
    const firstPathName = location.pathname.split('/')[1]
    return firstPathName === 'admin'
  }, [location.pathname])

  useEffect(() => {
    if (role !== ROLES.ADMIN && isAdminRoute) {
      return navigate('/notifications/403')
    }
  }, [])

  return (
    <Row className="header-wrapper bg-sky-700" justify="center">
      <Col xl={16} md={20} className="header ">
        <div className="header__logo">
          <button
            className="cursor-pointer border-none bg-transparent text-white text-2xl font-bold"
            onClick={() => {
              navigate('/')
            }}
          >
            <div className="w-52">
              <img
                className="w-full object-contain"
                src={logo_tutormatch}
                alt="logo-tutormatch"
              />
            </div>
          </button>
        </div>
        {headerItemsMemo}
        {renderUserInfo}
      </Col>
    </Row>
  )
}
export default Header
