import { getDate } from '@/utils/helper';
import { Table } from 'antd';
import { useTranslation } from 'react-i18next';

const ClassesDetailTableOrg = ({ absentLessons, lessonsUntilNow }) => {
  const { t } = useTranslation()
  const columns = [
    {
      title: t('classes.date'),
      key: 'date',
      render: (_, record) => (
        <div>
          {getDate(record.time_start)}
        </div>
      )
    },
    {
      title: t('classes.status_student'),
      dataIndex: 'status_student',
      key: 'status_student',
      render: (_, record) => (
        <div>
          {isDateExist(record.id, absentLessons) ? (
            <div className="text-red-400">{t('classes.attendance_absent')}</div>
          ) : (
            <div className="text-green-400">{t('classes.attendance_present')}</div>
          )}
        </div>
      )
    }
  ];

  const isDateExist = (id, absentLessons) => {
    if (!absentLessons) return false
    return absentLessons.some((item) => item.id === id)
  }

  return (
    <div className="w-full flex justify-center">
      <Table
        className="w-4/5"
        dataSource={lessonsUntilNow}
        columns={columns}
        pagination={false}
      />
    </div>
  )
}

export default ClassesDetailTableOrg
