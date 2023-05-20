import { useDispatch } from 'react-redux';
import { useTranslation, Trans } from 'react-i18next';
import { Button, Table, Modal } from 'antd';
import { convertNumberToTime } from '@/utils/helper';
import { deleteQuestion } from '@/redux/reducers/fakeDataReducers';


//TODO_BETA
const QuestionsTable = (props) => {
  const { confirm } = Modal
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const columns = [
    {
      title: t('exercise.question'),
      width: '50%',
      render: (_, record) => (
        <div>
          {record.title}
        </div>
      )
    },
    {
      title: t('exercise.time'),
      width: '20%',
      render: (_, record) => (
        <div>
          {convertNumberToTime(record.time)}
        </div>
      )
    },
    {
      title: t('exercise.subject'),
      width: '20%',
      render: (_, record) => (
        <div>
          {record.subject}
        </div>
      )
    },
    {
      render: (_, record) => (
        <div>
          <Button className="w-[6rem]" danger type="primary"
            onClick={(e) => {
              e.stopPropagation()
              deleteQuestionRequest(record)
            }}>
            {t('common.button.delete')}
          </Button>
        </div>
      )
    }
  ];

  const deleteQuestionRequest = (record) => {
    return confirm({
      title: t('exercise.question_delete'),
      content: (
        <Trans i18nkey="exercise.question_del ete_modal_confirm">
          {t('exercise.question_delete_modal_confirm', {
            question: record.title
          })}
        </Trans>
      ),
      onOk() {
        handleDelete(record.id)
      },
      okText: t('common.button.ok'),
      cancelText: t('common.button.cancel')
    })
  }

  const handleDelete = (id) => {
    dispatch(deleteQuestion(id))
  }

  const handleClickDetailQuestion = (record) => {
    props.setDataDetailQuestion(record)
    props.onModalDetailQuestion(true)
  }

  return (
    <div>
      <Table
        className="table-hover"
        dataSource={props.listQuestions}
        columns={columns}
        onRow={(record) => {
          return {
            onClick: () => handleClickDetailQuestion(record)
          };
        }}
      />
    </div>
  )
}

export default QuestionsTable;
