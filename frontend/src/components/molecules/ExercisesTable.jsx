import { DownloadOutlined, LinkOutlined } from '@ant-design/icons'
import { Table, Button } from 'antd'
import { useTranslation } from 'react-i18next'

//TODO_BETA
const ExercisesTable = (props) => {
  const { t } = useTranslation()
  const columns = [
    {
      title: t('exercise.title_exercises'),
      width: '30%',
      render: (_, record) => <div>{record.title}</div>
    },
    {
      title: t('exercise.description'),
      width: '40%',
      render: (_, record) => <div>{record.description}</div>
    },
    {
      title: t('classroom.detail.file_attach'),
      width: '35%',
      render: (_, record) =>
        record?.attachment?.length ? (
          record.attachment.map((item) => (
            <li key={item.id} className="flex items-center mb-1">
              <LinkOutlined className="mr-1" />
              {item.file}
            </li>
          ))
        ) : (
          <>
            <LinkOutlined className="mr-1" /> <span>tai_lieu.pdf</span>
          </>
        )
    },
    {
      width: '5%',
      render: () => (
        <div className="w-full flex justify-end">
          <Button className="min-w-[6rem] mr-5" type="primary">
            <DownloadOutlined />
            {t('common.button.download_exercise')}
          </Button>
        </div>
      )
    }
  ]

  const handleClickDetailTests = (record) => {
    props.setDataTestDetail(record)
    props.onModalDetailTest(true)
  }

  return (
    <div>
      <Table
        className="table-hover"
        dataSource={props.listTests}
        columns={columns}
        onRow={(record) => {
          return {
            onClick: () => handleClickDetailTests(record)
          }
        }}
      />
    </div>
  )
}

export default ExercisesTable
