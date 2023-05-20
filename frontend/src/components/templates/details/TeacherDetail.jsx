import Title from '@/components/atoms/Title'
import ProfileDetail from '@/components/molecules/ProfileDetail'
import { DATE_FORMAT } from '@/constants/common'
import { formatMoney } from '@/utils/helper'
import { requestGetTeacherDetail } from '@/redux/reducers/userReducers'
import { Row, Spin, Table, Typography } from 'antd'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addUniqueKey } from '@/utils/helper'
import { isEmpty } from 'lodash'
import CustomHelmet from '@/components/atoms/CustomHelmet'

export default function TeacherDetail() {
  const { id } = useParams()

  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { isLoading, data } = useSelector((state) => state.userSlice)

  const getTeacherDetail = (param) => {
    dispatch(requestGetTeacherDetail(param))
  }

  useEffect(() => {
    getTeacherDetail(id)
  }, [])

  const columns = [
    {
      title: t('teachers.detail.class_name'),
      dataIndex: 'class_name',
      width: '15%'
    },
    {
      title: t('teachers.detail.quantity'),
      dataIndex: 'quantity'
    },
    {
      title: t('teachers.detail.subject'),
      dataIndex: 'subject'
    },
    {
      title: t('teachers.detail.tuition_fee'),
      dataIndex: 'tuition_fee',
      render: (item) => formatMoney(item)
    },
    {
      title: t('teachers.detail.time'),
      dataIndex: 'time'
    },
    {
      title: t('teachers.detail.date_start'),
      dataIndex: 'date_start',
      render: (item) => dayjs(item).format(DATE_FORMAT.DATE_MONTH_YEAR)
    },
    {
      title: t('teachers.detail.date_end'),
      dataIndex: 'date_end',
      render: (item) => dayjs(item).format(DATE_FORMAT.DATE_MONTH_YEAR)
    },
    {
      title: t('teachers.detail.description'),
      dataIndex: 'description',
      width: '30%'
    }
  ]

  return (
    <Spin spinning={isLoading}>
      <CustomHelmet titleHelmet={t('teachers.detail.title')} />

      <div className="mb-5">
        <Title title={t('teachers.detail.title')} />
      </div>
      {!isEmpty(data) && (
        <>
          <ProfileDetail data={data} />
          {data.profileTeacher &&
            !isEmpty(data.profileTeacher[0]?.classrooms) && (
              <>
                <Row className="my-6">
                  <Typography.Title level={5}>
                    {t('common.form.subject_information', {
                      subject: t('teachers.detail.class')
                    })}
                  </Typography.Title>
                </Row>
                <Table
                  size="large"
                  columns={columns}
                  dataSource={addUniqueKey(data.profileTeacher[0].classrooms)}
                />
              </>
            )}
        </>
      )}
    </Spin>
  )
}
