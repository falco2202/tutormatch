import { STATUS } from '@/constants/defaultValue'
import { requestApprovalAndCancel } from '@/redux/reducers/classReducers'
import { checkPaginationHandleInClient } from '@/utils/helper'
import { Table, Typography, Button, Popconfirm, Col } from 'antd'
import { isEmpty } from 'lodash'
import { Trans, useTranslation } from 'react-i18next'

import { useDispatch } from 'react-redux'

export default function AcceptListStudent({ columns, data, total, classData }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const requestHandler = (record, status) => {
    dispatch(
      requestApprovalAndCancel({
        classroomId: classData.detailClass.id,
        studentId: record.id,
        student_status: status
      })
    )
  }

  const tableColumns = columns.concat([
    {
      title: t('common.form.action'),
      dataIndex: 'id',
      render: (_, record) => (
        <div className="flex justify-around">
          <Col>
            <Button
              type="primary"
              onClick={() => requestHandler(record, STATUS.STUDENT.APPROVED)}
            >
              {t('common.button.approval')}
            </Button>
          </Col>
          <Col>
            <Popconfirm
              title={t('common.button.reject')}
              description={
                <Trans i18nkey="teachers.list.action.student_reject">
                  {t('teachers.list.action.student_reject', {
                    name: record.fullName
                  })}
                </Trans>
              }
              onConfirm={() => requestHandler(record, STATUS.STUDENT.REJECT)}
              onOk={t('common.button.ok')}
              cancelText={t('common.button.cancel')}
            >
              <Button className="w-full" type="primary" danger>
                {t('common.button.reject')}
              </Button>
            </Popconfirm>
          </Col>
        </div>
      ),
      align: 'center'
    }
  ])

  return (
    <>
      <div className="text-center mt-5">
        <Typography.Title level={4}>
          {t('classroom.detail.student_list_register_in_class')}
        </Typography.Title>
      </div>
      {!isEmpty(data) ? (
        <Table
          dataSource={data}
          columns={tableColumns}
          pagination={checkPaginationHandleInClient(total)}
        />
      ) : (
        <Typography.Text>
          {t('classroom.detail.no_student_register')}
        </Typography.Text>
      )}
    </>
  )
}
