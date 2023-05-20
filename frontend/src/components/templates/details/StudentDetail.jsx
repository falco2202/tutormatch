import Title from '@/components/atoms/Title'
import ProfileDetail from '@/components/molecules/ProfileDetail'
import { requestGetStudentDetail } from '@/redux/reducers/userReducers'
import { Spin, Table, Typography, Image } from 'antd'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { CLASS_COVER_IMAGE_DEFAULT } from '@/assets/images'
import { DATE_FORMAT, ROLES } from '@/constants/common'
import dayjs from 'dayjs'
import { formatMoney, addUniqueKey } from '@/utils/helper'
import CustomHelmet from '@/components/atoms/CustomHelmet'

export default function StudentDetail() {
  const { id } = useParams()

  const { t } = useTranslation()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { isLoading, data } = useSelector((state) => state.userSlice)
  const { role } = useSelector((state) => state.authSlice)
  const getStudentDetail = (param) => {
    dispatch(requestGetStudentDetail(param))
  }
  useEffect(() => {
    getStudentDetail(id)
  }, [])

  const columns = [
    {
      title: t('common.form.class_name'),
      dataIndex: 'className',
      render: (_, record) => (
        <Typography.Link
          onClick={() =>
            navigate(
              `${
                role === ROLES.ADMIN ? '/admin/classroom' : '/classes/detail'
              }/${record.id}`
            )
          }
        >
          {record.className}
        </Typography.Link>
      ),
      width: '15%'
    },
    {
      title: t('common.form.quantity'),
      dataIndex: 'quantity',
      width: '7%',
      align: 'center'
    },
    {
      title: t('common.form.subject'),
      dataIndex: 'subject'
    },
    {
      title: t('common.form.tuition_fee'),
      dataIndex: 'tuitionFee',
      render: (item) => formatMoney(item)
    },
    {
      title: t('common.form.date_start'),
      dataIndex: 'dateStart',
      render: (item) => dayjs(item).format(DATE_FORMAT.DATE_MONTH_YEAR)
    },
    {
      title: t('common.form.date_end'),
      dataIndex: 'dateEnd',
      render: (item) => dayjs(item).format(DATE_FORMAT.DATE_MONTH_YEAR)
    },
    {
      title: t('common.form.image'),
      dataIndex: 'image',
      render: (_, record) => (
        <Image
          src={record.image?.url || CLASS_COVER_IMAGE_DEFAULT}
          preview={false}
          width={100}
          alt={record.className}
        />
      )
    },
    {
      title: t('common.form.address'),
      dataIndex: 'address',
      render: (item) =>
        item
          ? `${item[0]?.address ?? ''}, ${item[0]?.ward?.name ?? ''}, ${
              item[0]?.ward?.city?.name ?? ''
            }`
          : t('error_messages.not_found'),
      width: '10%'
    },
    {
      title: t('common.form.avg_star'),
      dataIndex: 'avgStar',
      render: (item) => (item ? item : t('common.form.not_rate')),
      align: 'center'
    }
  ]

  const dataClassroom = useMemo(() => {
    return data ? addUniqueKey(data.classrooms) : []
  }, [data])

  return (
    <Spin spinning={isLoading}>
      <CustomHelmet titleHelmet={t('students.detail.title')} />
      <div className="flex justify-center">
        <div className="w-5/6">
          <div className="mb-5">
            <Title title={t('students.detail.title')} />
          </div>
          {!isEmpty(data) && (
            <>
              <ProfileDetail data={data} />
              {!isEmpty(dataClassroom) && (
                <>
                  <Typography.Title className="my-6" level={4}>
                    {t('common.form.class')}
                  </Typography.Title>
                  <Table
                    dataSource={dataClassroom}
                    columns={columns}
                    pagination={false}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Spin>
  )
}
