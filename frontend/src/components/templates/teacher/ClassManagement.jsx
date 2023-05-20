import Title from '@/components/atoms/Title'
import TableClassRoom from '@/components/molecules/TableClassroom'
import { STATUS } from '@/constants/defaultValue'
import pushNotification from '@/utils/notification'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { NOTIFICATION_PAGE } from '@/constants/common'
import CustomHelmet from '@/components/atoms/CustomHelmet'

export default function ClassManagement() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { profileData } = useSelector((state) => state.authSlice)

  useEffect(() => {
    if (
      profileData.profileTeacher &&
      profileData?.profileTeacher[0]?.status === STATUS.TEACHER.LOCKED
    ) {
      navigate('/')
      pushNotification({
        type: NOTIFICATION_PAGE.WARNING,
        message: t('error_messages.unpaid')
      })
    }
  }, [profileData])

  const handleClickAddButton = () => {
    navigate('add')
  }

  return (
    <>
      <CustomHelmet titleHelmet={t('common.sidebar.classroom_management')} />

      <Title
        title={t('common.sidebar.classroom_management')}
        addButton={true}
        buttonName={t('classroom.add_classroom.add_classroom')}
        onClickAddButton={handleClickAddButton}
      />
      <TableClassRoom />
    </>
  )
}
