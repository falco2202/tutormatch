import { DATE_TIME } from '@/constants/defaultValue';
import { addHomework } from '@/redux/reducers/fakeDataReducers';
import { Form, Button, List, Input, Col, Checkbox, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';


//TODO_BETA
const GiveHomework = (props) => {
  const { t } = useTranslation()
  const [formHomework] = Form.useForm()
  const { TextArea } = Input;
  const dispatch = useDispatch()

  const handleBackStep = () => {
    props.onPreviousStepGiveHomework()
  }

  const onFinish = (values) => {
    const newHomeWork = {
      ...props.dataHomework,
      timeStart: dayjs(values.times[0]).format(DATE_TIME),
      timeEnd: dayjs(values.times[1]).format(DATE_TIME),
      description: values.description || ''
    }

    dispatch(addHomework(newHomeWork))
    props.onModalHomework(false)
  }

  return (
    <div className="p-5">
      <Form
        className="form-right-align"
        form={formHomework}
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 21,
        }}
        onFinish={onFinish}>
        <Form.Item label={t('exercise.tests')}>
          {props.dataHomework.title}
        </Form.Item>
        <Form.Item name="times" label={t('exercise.times')} required>
          <DatePicker.RangePicker
            placeholder={[
              t('classroom.add_classroom.classroom_date_start'),
              t('classroom.add_classroom.classroom_date_end')
            ]}
            showTime
            format={DATE_TIME}
          />
        </Form.Item>
        <Form.Item name="description" label={t('exercise.description')}>
          <TextArea rows={4} placeholder={t('exercise.description')} />
        </Form.Item>
        <Form.Item name="questions" label={t('exercise.questions')}>
          <div className="border-[1px] border-slate-200 border-solid">
            <List
              bordered
              dataSource={props.dataHomework.listQuestions}
              renderItem={(item, index) => (
                <List.Item>
                  <div className="flex flex-col space-y-5">
                    <div className="flex">
                      <Col span={22}>
                        <strong>{index + 1}. {item.title}</strong>
                      </Col>
                    </div>
                    <div className="ml-10 space-y-3">
                      {item.answers?.map((itemAnswer) => (
                        <div key={itemAnswer.id} className="flex space-x-3">
                          <div>
                            <Checkbox checked={itemAnswer.isCorrect} />
                          </div>
                          <div>
                            {itemAnswer.answer}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Form.Item>
        <div className="flex space-x-3 justify-end">
          <Button onClick={() => handleBackStep()}>
            {t('common.button.back')}
          </Button>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t('classroom.detail.give_homework')}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default GiveHomework;
