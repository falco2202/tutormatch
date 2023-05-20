import ListCalendar from '@/components/organisms/ListCalendar'
import { Typography, Col, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import { defaultEventMath8, defaultEventMath9 } from '@/utils/fakeEventCalendar'
import { getLocalStorage } from '@/utils/storage'
import { USER_ROLE } from '@/constants/defaultValue'
import { ROLES } from '@/constants/common'
import { generateEvent } from '@/utils/helper'
import { useMemo } from 'react'

// TODO_BETA: chỉ là prototype show dữ liệu cứng thời khóa biểu cho màn hình giáo viên và phụ huynh
export default function CalendarPage() {
  const role = +getLocalStorage(USER_ROLE)

  const { t } = useTranslation()

  const events = useMemo(() => {
    return generateEvent(defaultEventMath8.concat(defaultEventMath9))
  }, [defaultEventMath8, defaultEventMath9])
  return (
    <Row justify="center">
      <Col span={4}>
        <Typography.Title level={4}>
          {t('classroom.add_classroom.classroom_schedule')}
        </Typography.Title>
        {role === ROLES.TEACHER ? (
          <ul className="list-none ml-5 text-base">
            <li className="list_class list_class--purple">Toán 8</li>
            <li className="list_class list_class--blue">Toán 9</li>
          </ul>
        ) : (
          <ul className="list-none ml-5 text-base">
            <li className="list_class list_class--blue">
              Hoàng Thị Hồng Nhung
            </li>
            <li className="list_class list_class--purple">
              Hoàng Thị Thanh Nga
            </li>
          </ul>
        )}
      </Col>
      <Col span={14}>
        <ListCalendar event={events} />
      </Col>
    </Row>
  )
}
