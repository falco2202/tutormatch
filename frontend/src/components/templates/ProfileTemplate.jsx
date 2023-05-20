import { Card, Col, Tabs } from 'antd'
import PersonalDetails from '@/components/molecules/PersonalDetails'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { removeSymbol } from '@/utils/helper'
import { TABS } from '@/constants/profile'
import { useSelector } from 'react-redux'
import { ROLES } from '@/constants/common'
import { useMemo } from 'react'
import CreateStudentAccount from '@/components/molecules/CreateStudentAccount'
import CustomHelmet from '@/components/atoms/CustomHelmet'

const ProfileTemplate = () => {
  const { role } = useSelector((state) => state.authSlice)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const tabItems = [
    {
      key: TABS.INFORMATION,
      label: t('common.profile.tabs.personal_details'),
      children: <PersonalDetails />
    },
    {
      key: TABS.PARENT.CREATE_ACCOUNT_STUDENT,
      label: t('common.profile.tabs.create_account_student'),
      children: <CreateStudentAccount />,
      isHidden: role !== ROLES.PARENT
    }
  ]

  const tabItemsFiltered = useMemo(
    () => tabItems.filter((item) => !item.isHidden),
    [role]
  )

  const tabChangeHandler = (hashTab) => {
    navigate({ hash: hashTab })
  }

  return (
    <div className="w-full flex justify-center">
      <CustomHelmet titleHelmet={t('common.form.user_document')} />
      <Col span={16}>
        <h1 className="my-8">{t('common.form.user_document')}</h1>
        <Card>
          <Tabs
            activeKey={removeSymbol(location.hash)}
            items={tabItemsFiltered}
            onChange={tabChangeHandler}
          />
        </Card>
      </Col>
    </div>
  )
}

export default ProfileTemplate
