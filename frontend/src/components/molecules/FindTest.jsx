import { Input, Table, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';


//TODO_BETA
const FindTest = (props) => {
  const { t } = useTranslation()
  const { Search } = Input
  const { listTests } = useSelector((state) => state.fakeDataSlice)
  const columns = [
    {
      title: t('exercise.tests'),
      width: '70%',
      render: (_, record) => (
        <div>
          {record?.title}
        </div>
      )
    },
    {
      title: t('exercise.subject'),
      width: '20%',
      render: (_, record) => (
        <div>
          {record?.subject}
        </div>
      )
    },
    {
      render: (_, record) => (
        <div className="w-full flex justify-end">
          <Button
            className="w-[6rem] mr-5"
            type="primary"
            onClick={() => handleSelectHomeWork(record)}>
            {t('common.button.select')}
          </Button>
        </div>
      )
    }
  ]

  const handleSelectHomeWork = (record) => {
    props.setDataHomework(record)
    props.onNextStepGiveHomework()
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
        <Table
          dataSource={listTests}
          columns={columns}
        />
      </div>
    </div>
  )
}

export default FindTest;
