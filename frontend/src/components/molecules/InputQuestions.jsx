import { Input, Button, Checkbox, Form, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { TimePicker } from 'antd';
import { MINUTE_SECOND } from '@/constants/defaultValue';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { convertNumberToTime, convertTimeToNumber } from '@/utils/helper';
import { useDispatch } from 'react-redux';
import { addQuestion, editQuestion } from '@/redux/reducers/fakeDataReducers';


//TODO_BETA
const InputQuestion = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [formInputQuestion] = Form.useForm()
  const {
    title,
    subject,
    answers,
    time
  } = props.dataQuestion

  useEffect(() => {
    const dataQuestion = {
      title,
      subject,
      answers,
      time: props.type === 'EDIT' ? dayjs(convertNumberToTime(time), MINUTE_SECOND) : time
    }
    formInputQuestion.setFieldsValue(dataQuestion)
  }, [])

  const onFinish = (values) => {
    const answers = values.answers.map((item) => {
      return {
        answer: item.answer,
        isCorrect: item.isCorrect || false
      }
    })
    const time = dayjs(values.time).format(MINUTE_SECOND)
    const dataQuestion = {
      ...props.dataQuestion,
      title: values.title,
      time: convertTimeToNumber(time),
      subject: values.subject,
      answers
    }

    if (props.type === 'EDIT') {
      dispatch(editQuestion(dataQuestion))
      props.setDataDetailQuestion(dataQuestion)
    } else {
      dispatch(addQuestion(dataQuestion))
    }
    handleCloseModal()
  };

  const handleCloseModal = () => {
    if (props.type === 'EDIT') {
      props.setIsEditQuestion(false)
    } else {
      props.onModalCreateQuestion(false)
    }
  }
  return (
    <div className="p-5">
      <Form
        className="form-right-align"
        form={formInputQuestion}
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 19,
        }}
        onFinish={onFinish}>
        <Form.Item
          label={t('exercise.question')}
          name="title"
          rules={[
            {
              required: true,
              message: t('exercise.question_required')
            }
          ]}>
          <Input placeholder={t('exercise.question')} />
        </Form.Item>
        <Form.Item label={t('exercise.answers_question')} name="answers-field" required>
          <Form.List name="answers">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div className="flex w-full" key={key}>
                    <Col span={1}>
                      <Form.Item
                        {...restField}
                        name={[name, 'isCorrect']}
                        valuePropName="checked"
                      >
                        <Checkbox />
                      </Form.Item>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        {...restField}
                        name={[name, 'answer']}
                      >
                        <Input placeholder={t('exercise.answers_question')} />
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <MinusCircleOutlined className="ml-3 mt-2" onClick={() => remove(name)} />
                    </Col>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    {t('exercise.add_answer')}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item 
          label={t('exercise.time')}
          name="time"
          rules={[
            {
              required: true,
              message: t('exercise.time_required')
            }
          ]}>
          <TimePicker format={MINUTE_SECOND} />
        </Form.Item>
        <Form.Item 
          label={t('exercise.subject')}
          name="subject"
          rules={[
            {
              required: true,
              message: t('exercise.subject_required')
            }
          ]}>
          <Input placeholder={t('exercise.subject')} />
        </Form.Item>
        <div className="flex justify-end space-x-3">
          <Button onClick={() => handleCloseModal()}>
            {t('cancel')}
          </Button>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {props.type === 'EDIT' ? t('exercise.edit_question') : t('exercise.add_questions')}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default InputQuestion;
