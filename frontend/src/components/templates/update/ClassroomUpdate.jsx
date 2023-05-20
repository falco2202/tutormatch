import InputClassroom from '@/components/organisms/InputClassroom'
import dayjs from 'dayjs'
import {
  HOURS_MINUTE,
  PROPS_TYPE,
  YEAR_MONTH_DAY
} from '@/constants/defaultValue'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { requestGetDetailClass } from '@/redux/reducers/classReducers'
import { useTranslation } from 'react-i18next'
import CustomHelmet from '@/components/atoms/CustomHelmet'

const ClassroomUpdate = () => {
  const classroomId = useParams()
  const dataClassroom = useSelector((state) => state.classSlice)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [dataUpdateClassroom, setDataUpdateClassroom] = useState({
    class_name: null,
    subject: null,
    quantity: 1,
    tuition_fee: 10000,
    description: null,
    file: null,
    m_ward_id: null,
    address: null,
    rangeDate: [],
    lessons: [{ day: null, start: null, end: null }]
  })

  useEffect(() => {
    dispatch(requestGetDetailClass(classroomId.id))
  }, [classroomId.id])

  useEffect(() => {
    const {
      className,
      subject,
      quantity,
      tuitionFee,
      description,
      image,
      address,
      dateStart,
      dateEnd
    } = dataClassroom.classInformation?.detailClass || {
      className: null,
      subject: null,
      quantity: 1,
      tuitionFee: 10000,
      description: null,
      image: null,
      address: [],
      dateStart: null,
      dateEnd: null
    }

    const lessons = dataClassroom.classInformation?.numLesson?.map((item) => {
      return {
        day: item.day,
        start: dayjs(item.start, HOURS_MINUTE),
        end: dayjs(item.end, HOURS_MINUTE)
      }
    })
    const rangeDate = [
      dayjs(dateStart, YEAR_MONTH_DAY),
      dayjs(dateEnd, YEAR_MONTH_DAY)
    ]
    const updateClassroom = {
      class_name: className,
      subject,
      quantity,
      tuition_fee: tuitionFee,
      description,
      file: image?.url,
      m_ward_id: address ? address[0]?.ward.id : '',
      address: address ? address[0]?.address : '',
      rangeDate,
      lessons
    }

    setDataUpdateClassroom(updateClassroom)
  }, [dataClassroom])

  return (
    <div>
      <CustomHelmet
        titleHelmet={t('classroom.add_classroom.update_classroom')}
      />

      <InputClassroom
        dataClassroom={dataUpdateClassroom}
        type={PROPS_TYPE.UPDATE_CLASSROOM}
        classroomId={classroomId.id}
        isLoading={dataClassroom.isLoading}
      />
    </div>
  )
}

export default ClassroomUpdate
