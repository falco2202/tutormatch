import { addExerciseShared } from '@/redux/reducers/fakeDataReducers'
import pushNotification from '@/utils/notification'
import { LinkOutlined } from '@ant-design/icons'
import { Input, Table, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

//TODO_BETA
const ExerciseShareOrg = (props) => {
  const { t } = useTranslation()
  const { Search } = Input
  const { listExercises } = useSelector((state) => state.fakeDataSlice)
  const dispatch = useDispatch()
  const columns = [
    {
      title: t('exercise.title_exercises'),
      width: '25%',
      render: (_, record) => <div>{record?.title}</div>
    },
    {
      title: t('exercise.description'),
      width: '35%',
      render: (_, record) => <div>{record?.description}</div>
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
      render: (_, record) => (
        <div className="w-full flex justify-end">
          <Button
            className="w-[6rem]"
            type="primary"
            onClick={() => handleSelectHomeWork(record)}
          >
            {t('common.button.select')}
          </Button>
        </div>
      )
    }
  ]
  const handleCloseModal = () => {
    props.handleModalExercise(false)
  }
  const handleSelectHomeWork = (record) => {
    dispatch(addExerciseShared(record))
    handleCloseModal()
    pushNotification({
      type: 'success',
      message: t('succeed_messages.share_success')
    })
  }
  return (
    <div>
      <div className="form__handle">
        <Search
          className="w-full"
          placeholder={t('exercise.input_tests')}
          enterButton
        />
      </div>
      <div>
        <Table dataSource={listExercises} columns={columns} />
      </div>
    </div>
  )
}

export default ExerciseShareOrg
