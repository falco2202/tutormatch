import { useTranslation } from 'react-i18next'
import { Button, Image, Typography } from 'antd'
import { AVATAR_DEFAULT } from '@/assets/images'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { DATE_FORMAT, ROLES } from '@/constants/common'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

const useTable = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { role } = useSelector((state) => state.authSlice)

  const tableColumns = [
    {
      title: t('common.form.full_name'),
      dataIndex: 'fullName',
      render: (_, record) => (
        <Typography.Link onClick={() => navigate(`${record.id}`)}>
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
      render: (item) => (item ? t('common.form.male') : t('common.form.female'))
    },
    {
      title: t('common.form.address'),
      dataIndex: 'address',
      render: (item) =>
        item
          ? `${item[0]?.address ?? ''}, ${item[0]?.ward?.name ?? ''}, ${
              item[0]?.ward?.city?.name ?? ''
            }`
          : t('error_messages.not_found')
    },
    {
      title: t('common.form.action'),
      dataIndex: 'id',
      render: (id) => (
        <div className="flex justify-around">
          <Button
            className="bg-green-500 text-white min-w-[6rem]"
            onClick={() => {
              navigate(`${id}`)
            }}
          >
            {t('common.button.approval')}
          </Button>
          <Button
            className="min-w-[6rem]"
            type="primary"
            onClick={() => {
              navigate(`${id}`)
            }}
            danger
          >
            {t('common.button.cancel')}
          </Button>
        </div>
      ),
      isHidden: role !== ROLES.TEACHER
    }
  ]
  const tableColumnsFiltered = useMemo(
    () => tableColumns.filter((item) => !item.isHidden),
    [role]
  )

  return tableColumnsFiltered
}

export { useTable }
