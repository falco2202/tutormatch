import { Input, Table, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

//TODO_BETA
const FindQuestion = (props) => {
  const { t } = useTranslation()
  const { Search } = Input
  const { listQuestions } = useSelector((state) => state.fakeDataSlice)
  const columns = [
    {
      title: t('exercise.question'),
      render: (_, record) => (
        <div>
          {record.title}
        </div>
      )
    },
    {
      render: (_, record) => (
        <div>
          <Button type="primary" onClick={() => handleAddQuestion(record)}>
            {t('common.button.add')}
          </Button>
        </div>
      )
    }
  ];

  const handleAddQuestion = (record) => {
    const dataQuestionAdd = props.listQuestions
    dataQuestionAdd.push(record)
    props.setListQuestions(dataQuestionAdd)
    props.onModalAddQuestion(false)
  }

  return (
    <div>
      <div className="form__handle">
        <Search
          className="w-full"
          placeholder={t('exercise.input_questions')}
          enterButton
        />
      </div>
      <div>
        <Table
          className="table-hover"
          dataSource={listQuestions}
          columns={columns}
        />
      </div>
    </div>
  )
}

export default FindQuestion;
