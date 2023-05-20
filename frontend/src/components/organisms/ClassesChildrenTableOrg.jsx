import avatar_default from '@/assets/images/avatar_default.png'
import { Table, Tag } from 'antd'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { STATUS } from '@/constants/defaultValue'

const ClassesChildrenTableOrg = (props) => {
  const { t } = useTranslation()
  const listChildrenInClassroom = useMemo(() => {
    const listChildrenInClassroomAddKey =
      props.dataDetailClass.childrenInClassroom?.map((item) => {
        return { ...item, key: item.id }
      })
    return listChildrenInClassroomAddKey
  }, [props.dataDetailClass.childrenInClassroom])

  const columns = [
    {
      key: 'image',
      render: (_, record) => (
        <div className="flex justify-center">
          <div className="w-10 h-10">
            <img
              className="w-full h-full object-contain"
              src={record.image?.url || avatar_default}
              alt="image_cover"
            />
          </div>
        </div>
      )
    },
    {
      title: t('classes.full_name'),
      dataIndex: 'fullName',
      key: 'fullName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: t('classes.date_of_bird'),
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth'
    },
    {
      title: t('classes.phone'),
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: t('classes.count_absent_lessons'),
      dataIndex: 'countAbsentLessons',
      key: 'countAbsentLessons'
    },
    {
      title: t('classes.status'),
      dataIndex: 'status',
      key: 'status',
      render: (_, record) =>
        record.status === STATUS.STUDENT.PENDING ? (
          <Tag color="processing">{t('common.option.pending')}</Tag>
        ) : record.status === STATUS.STUDENT.APPROVED ? (
          <Tag color="success">{t('common.option.approved')}</Tag>
        ) : (
          <Tag color="red">{t('common.option.canceled')}</Tag>
        )
    }
  ]

  const handleDetailLessons = (data) => {
    props.setDataChildrenLessonsDetail(data)
    props.onDetailChildrenModal(true)
  }

  return (
    <div>
      <Table
        className="table-hover"
        dataSource={listChildrenInClassroom}
        columns={columns}
        onRow={(record) => {
          return {
            onClick: () => handleDetailLessons(record)
          }
        }}
        pagination={false}
      />
    </div>
  )
}

export default ClassesChildrenTableOrg
