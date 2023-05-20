import QuestionsTable from '@/components/molecules/QuestionsTable';
import InputQuestion from '@/components/molecules/InputQuestions';
import DetailQuestion from '@/components/molecules/DetailQuestion';
import { Modal } from 'antd';
import { Button, Input } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { MINUTE_SECOND } from '@/constants/defaultValue';
import dayjs from 'dayjs';


//TODO_BETA
const QuestionsOrg = () => {
  const { t } = useTranslation()
  const { Search } = Input
  const dataFake = useSelector((state) => state.fakeDataSlice)
  const [listQuestions, setListQuestions] = useState([])
  const [isModalCreateQuestion, setIsModalCreateQuestion] = useState(false)
  const [isModalDetailQuestion, setIsModalDetailQuestion] = useState(false)
  const [dataDetailQuestion, setDataDetailQuestion] = useState({
    title: null,
    subject: null,
    answers: [
      {
        answer: null,
        isCorrect: undefined
      }
    ],
    time: dayjs('1:30', MINUTE_SECOND)
  })
  const dataQuestion = {
    title: null,
    subject: null,
    answers: [
      {
        answer: null,
        isCorrect: undefined
      }
    ],
    time: dayjs('1:30', MINUTE_SECOND)
  }

  useEffect(() => {
    setListQuestions(dataFake.listQuestions)
  }, [dataFake.listQuestions])

  const handleModalCreateQuestion = (status) => {
    setIsModalCreateQuestion(status)
  }

  const handleModalDetailQuestion = (status) => {
    setIsModalDetailQuestion(status)
  }

  return (
    <div>
      <div className="w-full flex justify-end absolute">
        <Button
          className="mt-[-92px]"
          type="primary" 
          onClick={() => handleModalCreateQuestion(true)} >
          {t('exercise.add_questions')}
        </Button>
      </div>
      <div className="form__handle">
        <Search
          className="w-full"
          placeholder={t('exercise.input_questions')}
          enterButton
        />
      </div>
      <div>
        <QuestionsTable
          listQuestions={listQuestions}
          onModalDetailQuestion={handleModalDetailQuestion}
          setDataDetailQuestion={setDataDetailQuestion}
        />
      </div>
      <Modal
        title={t('exercise.add_questions')}
        open={isModalCreateQuestion}
        onCancel={() => handleModalCreateQuestion(false)}
        footer={null}
        destroyOnClose
        width={1000}>
        <InputQuestion dataQuestion={dataQuestion} onModalCreateQuestion={handleModalCreateQuestion} />
      </Modal>
      <Modal
        title={t('exercise.detail_questions')}
        open={isModalDetailQuestion}
        onCancel={() => handleModalDetailQuestion(false)}
        footer={null}
        destroyOnClose
        width={1000}>
        <DetailQuestion
          dataDetailQuestion={dataDetailQuestion}
          setDataDetailQuestion={setDataDetailQuestion}
        />
      </Modal>
    </div>
  )
}

export default QuestionsOrg;
