import { DATE_FORMAT } from '@/constants/common'
import { requestAttendanceClassroom } from '@/redux/reducers/classReducers'
import { Typography, Modal, Table } from 'antd'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import pushNotification from '@/utils/notification'
import { NOTIFICATION_PAGE } from '@/constants/common'
import { checkPaginationHandleInClient } from '@/utils/helper'

export default function AttendanceSheet({
  isOpen,
  classDataSource,
  setAttendanceSheet,
  classroomId,
  lesson,
  total
}) {
  const { t } = useTranslation()

  const [listPresent, setListPresent] = useState([])

  const dispatch = useDispatch()

  const columns = [
    {
      title: t('common.form.email'),
      dataIndex: 'email'
    },
    {
      title: t('common.form.date_of_birth'),
      dataIndex: 'dateOfBirth',
      render: (item) => dayjs(item).format(DATE_FORMAT.DATE_MONTH_YEAR)
    },
    {
      title: t('common.form.phone'),
      dataIndex: 'phone'
    },
    {
      title: t('common.form.gender'),
      dataIndex: 'gender',
      render: (item) => (item ? t('common.form.male') : t('common.form.female'))
    },
    Table.SELECTION_COLUMN,
    {
      title: t('classroom.detail.present'),
      dataIndex: 'fullName'
    }
  ]

  const listStudent = useMemo(() => {
    const listAttendance = classDataSource?.map((item) => {
      return {
        id: item.id,
        status: listPresent.includes(item.id)
      }
    })
    return { students: listAttendance ? listAttendance : [] }
  }, [listPresent])

  const lessonId = lesson?.id

  const handleOk = () => {
    if (isEmpty(classDataSource)) {
      setAttendanceSheet()
      return pushNotification({
        type: NOTIFICATION_PAGE.WARNING,
        message: t('classroom.detail.no_attendance')
      })
    }
    dispatch(requestAttendanceClassroom({ classroomId, lessonId, listStudent }))
    setAttendanceSheet()
  }

  return (
    <Modal
      title={
        <div className="text-center my-2">
          <Typography.Title level={3}>
            {t('classroom.detail.attendance')} {t('common.form.day')}{' '}
            {dayjs(lesson?.dateStart).format(DATE_FORMAT.DATE_MONTH_YEAR)}
          </Typography.Title>
        </div>
      }
      width={1200}
      closable={false}
      open={isOpen}
      onCancel={setAttendanceSheet}
      okText={t('common.button.ok')}
      cancelText={t('common.button.cancel')}
      onOk={handleOk}
    >
      {!isEmpty(classDataSource) ? (
        <Table
          columns={columns}
          dataSource={classDataSource}
          rowSelection={{
            hideSelectAll: true,
            onChange: (selectedRowKeys) => {
              setListPresent(selectedRowKeys)
            }
          }}
          pagination={checkPaginationHandleInClient(total)}
        />
      ) : (
        <div className="text-center">{t('classroom.detail.no_student')}</div>
      )}
    </Modal>
  )
}
