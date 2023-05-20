import InfoQuestion from '@/components/molecules/InfoQuestion';
import InputQuestion from '@/components/molecules/InputQuestions';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react';


//TODO_BETA
const DetailQuestion = (props) => {
  const { t } = useTranslation()
  const [isEditQuestion, setIsEditQuestion] = useState(false)
  
  const handleEditQuestion = () => {
    setIsEditQuestion(true)
  }
  return (
    <div>
      <div className="absolute w-full flex justify-end">
        {!isEditQuestion && (
          <Button
            className="mr-24"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditQuestion()}>
            {t('exercise.edit_question')}
          </Button>
        )}
      </div>
      <div>
        {isEditQuestion ? (
          <InputQuestion
            dataQuestion={props.dataDetailQuestion}
            type="EDIT"
            setIsEditQuestion={setIsEditQuestion}
            setDataDetailQuestion={props.setDataDetailQuestion}
          />
        ) : (
          <div className="w-[90%]">
            <InfoQuestion dataDetailQuestion={props.dataDetailQuestion} />
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailQuestion;
