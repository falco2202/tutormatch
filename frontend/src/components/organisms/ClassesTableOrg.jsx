import class_default from '@/assets/images/class_default.jpg'
import { getDate } from '@/utils/helper'
import { Table } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const ClassesTableOrg = (props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { order_by_class } = props.params
  const columns = [
    {
      key: 'className',
      width: '15%',
      render: (_, record) => (
        <div className="w-full">
          <img
            className="w-full aspect-video"
            src={record.image?.url || class_default}
            alt="image_cover"
          />
        </div>
      )
    },
    {
      title: t('classes.class_name'),
      dataIndex: 'className',
      key: 'className',
      sorter: true,
      defaultSortOrder:
        !!order_by_class && (order_by_class === 'asc' ? 'ascend' : 'descend'),
      width: '25%'
    },
    {
      title: t('classes.subject'),
      dataIndex: 'subject',
      key: 'subject'
    },
    {
      title: t('classes.teacher_name'),
      key: 'profileTeacher',
      render: (_, record) => <div>{record.profileTeacher.user.fullName}</div>
    },
    {
      title: `${t('classes.tuition_fee')} (vnđ)`,
      dataIndex: 'tuitionFee',
      key: 'tuitionFee'
    },
    {
      title: t('classes.date_start'),
      key: 'date_start',
      render: (_, record) => <div>{getDate(record.dateStart)}</div>
    },
    {
      title: t('classes.date_end'),
      key: 'date_end',
      render: (_, record) => <div>{getDate(record.dateEnd)}</div>
    }
  ]

  const onChangeTable = (pagination, filters, sorter) => {
    const paramsChange = [
      { key: 'page', value: pagination.current },
      {
        key: 'order_by_class',
        value: sorter.order ? (sorter.order === 'ascend' ? 'asc' : 'desc') : ''
      }
    ]

    props.onSetParams(paramsChange)
  }

  const handleDetailClass = (data) => {
    navigate(`/classes/detail/${data.id}`)
  }

  return (
    <div className="w-full flex justify-center">
      <Table
        className="w-full table-hide-expandable table-hover table-none-background-header"
        dataSource={props.listClasses}
        columns={columns}
        onChange={onChangeTable}
        onRow={(record) => {
          return {
            onClick: () => handleDetailClass(record)
          }
        }}
        pagination={{
          size: 'default',
          total: props.total,
          defaultCurrent: 1,
          showSizeChanger: false,
          defaultPageSize: 15,
          disabled: props.total < 16
        }}
      />
    </div>
  )
}

export default ClassesTableOrg
