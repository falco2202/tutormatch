import { Button, Radio, Form, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import CountDown from '@/components/molecules/CountDown';
import { generateUniqueKey } from '@/utils/helper';

//TODO_BETA
const StepTakeTheTest = (props) => {
  const { t } = useTranslation()
  const [formTakeQuestion] = Form.useForm()

  const handleNextQuestion = () => {
    formTakeQuestion.resetFields();
    props.onNextQuestion()
  }

  const onFinish = () => {
    handleNextQuestion()
  }

  const typeQuestion = (question) => {
    const questionCorrect = question?.answers.filter((item) => item.isCorrect)

    if (questionCorrect.length > 1) {
      return 2
    }
    return 1
  }
  return (
    <div>
      <div>
        <CountDown
          time={props.time}
          indexQuestion={props.indexQuestion}
          onFinish={onFinish}
        />
      </div>
      <div>
        <Form
          form={formTakeQuestion}
          onFinish={onFinish}>
          <div className="flex justify-center">
            <div className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex p-10 w-[700px]">
              <div className='flex flex-col space-y-5 w-full'>
                <div>
                  <strong>{`${props.indexQuestion + 1}. ${props.listQuestions[props.indexQuestion].title}`}</strong>
                </div>
                <div>
                  {typeQuestion(props.listQuestions[props.indexQuestion]) === 1 ? (
                    <Form.Item name="answers">
                      <Radio.Group className="flex text-base flex-col ml-5 space-y-4">
                        {props.listQuestions[props.indexQuestion].answers.map((item, index) => (
                          <Radio key={generateUniqueKey('feature', index)} value={item.id}>
                            {item.answer}
                          </Radio>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  ) : (
                    <Form.Item name="answers">
                      <Checkbox.Group className="checkbox-margin-none flex text-base flex-col ml-5 space-y-4">
                        {props.listQuestions[props.indexQuestion].answers.map((item, index) => (
                          <Checkbox key={generateUniqueKey('feature', index)} value={item.id}>
                            {item.answer}
                          </Checkbox>
                        ))}
                      </Checkbox.Group>
                    </Form.Item>
                  )}
                </div>
                <div className="w-full flex justify-center">
                  <Button type="primary" htmlType="submit">
                    {props.indexQuestion === props.listQuestions.length - 1 ? t('common.button.finish') : t('common.button.next')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Form>

      </div>
    </div>
  )
}

export default StepTakeTheTest;
