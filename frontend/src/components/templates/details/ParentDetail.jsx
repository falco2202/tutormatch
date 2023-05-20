import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { requestGetParentDetail } from '@/redux/reducers/userReducers'
import { useEffect } from 'react'
import Title from '@/components/atoms/Title'
import ProfileDetail from '@/components/molecules/ProfileDetail'
import { Row, Spin, Table, Image, Typography } from 'antd'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '@/constants/common'
import { AVATAR_DEFAULT } from '@/assets/images'
import { isEmpty } from 'lodash'
import CustomHelmet from '@/components/atoms/CustomHelmet'
import { FEMALE_ICON, MALE_ICON } from '@/assets/icons'

export default function ParentDetail() {
  const { id } = useParams()

  const { t } = useTranslation()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { isLoading, data } = useSelector((state) => state.userSlice)

  const getParentDetail = (param) => {
    dispatch(requestGetParentDetail(param))
  }

  useEffect(() => {
    getParentDetail(id)
  }, [])

  const columns = [
    {
      title: t('common.form.full_name'),
      dataIndex: 'fullName',
      render: (_, record) => (
        <Typography.Link
          onClick={() => navigate(`/admin/students/${record.id}`)}
        >
          {record.fullName}
        </Typography.Link>
      )
    },
    {
      title: t('common.form.avatar'),
      dataIndex: 'image',
      render: (item) => (
        <Image src={item?.url || AVATAR_DEFAULT} preview={false} width={150} />
      )
    },
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
      render: (item) => (
        <img
          src={item ? MALE_ICON : FEMALE_ICON}
          alt=""
          className=" mr-1 pt-1"
          width={18}
        />
      )
    }
  ]
  return (
    <>
      <Spin spinning={isLoading}>
        <CustomHelmet titleHelmet={t('parents.detail.title')} />
        <div className="mb-5">
          <Title title={t('parents.detail.title')} />
        </div>
        {!isEmpty(data) && (
          <>
            <ProfileDetail data={data} />
            {!isEmpty(data.childrens) && (
              <>
                <Row className="my-6">
                  <Typography.Title level={5}>
                    {t('common.form.subject_information', {
                      subject: t('common.roles.children')
                    })}
                  </Typography.Title>
                </Row>
                <Table
                  size="large"
                  columns={columns}
                  dataSource={data.childrens}
                  pagination={false}
                />
              </>
            )}
          </>
        )}
      </Spin>
    </>
  )
}
