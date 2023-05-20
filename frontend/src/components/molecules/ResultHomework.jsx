import { Table, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

//TODO_BETA
const ResultHomework = () => {
  const { t } = useTranslation()
  const { listHomeworks } = useSelector((state) => state.fakeDataSlice)
  const columns = [
    {
      title: t('classroom.homework.test'),
      width: '70%',
      render: (_, record) => <div>{record.title}</div>
    },
    {
      title: t('classes.result'),
      dataIndex: 'point',
      width: '30%',
      align: 'center'
    }
  ]

  return (
    <>
      <div className="text-center">
        <Typography.Title level={3}>
          {t('classes.result_title')}
        </Typography.Title>
      </div>
      <Table dataSource={listHomeworks} columns={columns} pagination={false} />
    </>
  )
}

export default ResultHomework
