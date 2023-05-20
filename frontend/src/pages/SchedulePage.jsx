import ListCalendar from '@/components/organisms/ListCalendar'
import {
  defaultEventEnglish8,
  defaultEventMath8
} from '@/utils/fakeEventCalendar'
import { generateEvent } from '@/utils/helper'
import { Typography, Col, Row } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

// TODO_BETA: chỉ là prototype show dữ liệu cứng thời khóa biểu cho màn hình học sinh
export default function SchedulePage() {
  const { t } = useTranslation()
  const events = useMemo(() => {
    return generateEvent(defaultEventMath8.concat(defaultEventEnglish8))
  }, [defaultEventMath8, defaultEventEnglish8])
  return (
    <Row justify="center">
      <Col span={4}>
        <Typography.Title level={4}>
          {t('classroom.add_classroom.classroom_schedule')}
        </Typography.Title>
        <ul className="list-none ml-5 text-base">
          <li className="list_class list_class--purple">Toán 8</li>
          <li className="list_class list_class--blue">Tiếng Anh 8</li>
        </ul>
      </Col>
      <Col span={14}>
        <ListCalendar event={events} />
      </Col>
    </Row>
  )
}
