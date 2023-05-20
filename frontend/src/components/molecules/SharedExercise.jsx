import { ROLES } from '@/constants/common'
import { DownloadOutlined, LinkOutlined } from '@ant-design/icons'
import { Button, Input, Table } from 'antd'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

//TODO_BETA
const SharedExercise = () => {
  const { t } = useTranslation()
  const { Search } = Input
  const { listExercisesShared } = useSelector((state) => state.fakeDataSlice)
  const { role } = useSelector((state) => state.authSlice)
  const columns = [
    {
      title: t('exercise.title_exercises'),
      width: '30%',
      render: (_, record) => <div>{record?.title}</div>
    },
    {
      title: t('exercise.description'),
      width: '30%',
      render: (_, record) => <div>{record?.description}</div>
    },
    {
      title: t('classroom.detail.file_attach'),
      width: '35%',
      render: (_, record) =>
        record?.attachment?.length ? (
          record?.attachment.map((item) => (
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

  return (
    <div>
      {role === ROLES.TEACHER && (
        <div className="form__handle">
          <Search
            className="w-full"
            placeholder={t('exercise.input_tests')}
            enterButton
          />
        </div>
      )}
      <div>
        <Table dataSource={listExercisesShared} columns={columns} />
      </div>
    </div>
  )
}

export default SharedExercise
