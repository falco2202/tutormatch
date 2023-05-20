import CustomHelmet from '@/components/atoms/CustomHelmet'
import InputClassroom from '@/components/organisms/InputClassroom'
import { PROPS_TYPE } from '@/constants/defaultValue'
import { useTranslation } from 'react-i18next'

const ClassroomAdd = () => {
  const { t } = useTranslation()
  const dataClassroom = {
    quantity: 1,
    tuition_fee: 10000,
    file: null,
    lessons: [{ day: null, start: null, end: null }]
  }

  return (
    <div>
      <CustomHelmet
        titleHelmet={t('classroom.add_classroom.add_new_classroom')}
      />

      <InputClassroom
        dataClassroom={dataClassroom}
        type={PROPS_TYPE.ADD_CLASSROOM}
        isLoading={false}
      />
    </div>
  )
}

export default ClassroomAdd
