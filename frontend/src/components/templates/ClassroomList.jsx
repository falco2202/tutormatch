import { useTranslation } from 'react-i18next'
import Title from '@/components/atoms/Title'
import TableClassroom from '@/components/molecules/TableClassroom'
import CustomHelmet from '@/components/atoms/CustomHelmet'

export default function ClassroomList() {
  const { t } = useTranslation()

  return (
    <>
      <CustomHelmet titleHelmet={t('common.sidebar.classroom_management')} />
      <Title
        title={t('common.sidebar.classroom_management')}
        addButton={false}
      />
      <TableClassroom />
    </>
  )
}
