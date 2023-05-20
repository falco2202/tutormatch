import { Button, Result } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { getKeyByStatus } from '@/utils/helper'
import { NOTIFICATION_PAGE, ROLES } from '@/constants/common'
import { useEffect, useState } from 'react'
import { t } from 'i18next'
import { getLocalStorage } from '@/utils/storage'
import { USER_ROLE } from '@/constants/defaultValue'

const CommonNotification = () => {
  const navigate = useNavigate()
  const params = useParams()
  const role = parseInt(getLocalStorage(USER_ROLE))
  const [notification, setNotification] = useState({
    key: 'not_found',
    status: NOTIFICATION_PAGE.NOT_FOUND
  })

  const getStatus = (status) => {
    const availableStatus = NOTIFICATION_PAGE[status]
    return availableStatus ?? NOTIFICATION_PAGE.NOT_FOUND
  }
  const backToPreviousURL = () => {
    if (role === ROLES.ADMIN) {
      return navigate('/admin/teachers')
    }
    return navigate('/')
  }
  useEffect(() => {
    const status = getStatus(params.status)
    setNotification({
      status: status,
      key: getKeyByStatus(status)
    })
  }, [params.status])

  return (
    <Result
      status={notification.status}
      title={notification.status}
      subTitle={t(`common.notification.${notification.key}`)}
      extra={
        <Button type="primary" onClick={() => backToPreviousURL()}>
          {t('common.button.back')}
        </Button>
      }
    />
  )
}

export default CommonNotification
