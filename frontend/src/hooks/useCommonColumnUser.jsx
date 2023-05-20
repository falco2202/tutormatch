import { FEMALE_ICON, MALE_ICON } from '@/assets/icons'
import { AVATAR_DEFAULT } from '@/assets/images'
import { DATE_FORMAT } from '@/constants/common'

import { Typography, Image } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function useCommonColumnUser() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const tableColumns = [
    {
      title: t('common.form.full_name'),
      dataIndex: 'fullName',
      width: '15%',
      render: (_, record) => (
        <Typography.Link onClick={() => navigate(`${record.id}`)}>
          {record.fullName}
        </Typography.Link>
      )
    },
    {
      title: t('common.form.avatar'),
      dataIndex: 'image',
      width: '10%',
      render: (item) => (
        <Image
          className="aspect-square object-cover"
          src={item?.url || AVATAR_DEFAULT}
          preview={false}
          width={120}
        />
      )
    },
    {
      title: t('common.form.gender'),
      dataIndex: 'gender',
      width: '7%',
      align: 'center',
      render: (item) => (
        <img
          src={item ? MALE_ICON : FEMALE_ICON}
          alt=""
          className=" mr-1 pt-1"
          width={18}
        />
      )
    },
    {
      title: t('common.form.date_of_birth'),
      dataIndex: 'dateOfBirth',
      render: (item) => dayjs(item).format(DATE_FORMAT.DATE_MONTH_YEAR),
      width: '10%'
    },
    {
      title: t('common.form.email'),
      dataIndex: 'email',
      width: '15%'
    },
    {
      title: t('common.form.phone'),
      dataIndex: 'phone',
      width: '10%'
    }
  ]

  return tableColumns
}
