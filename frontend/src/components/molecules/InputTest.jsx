import FindQuestion from '@/components/molecules/FindQuestion'
import { Button, List, Input, Form, Checkbox, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addTest, editTest } from '@/redux/reducers/fakeDataReducers'

//TODO_BETA
const InputTest = (props) => {
  const { t } = useTranslation()
  const [formInputTests] = Form.useForm()
  const dispatch = useDispatch()
  const [isModalAddQuestion, setIsModalAddQuestion] = useState(false)
  const [listQuestionsInput, setListQuestionsInput] = useState([])

  useEffect(() => {
    formInputTests.setFieldsValue(props.dataTest)

    setListQuestionsInput([...props.dataTest.listQuestions])
  }, [])

  const onFinish = (values) => {
    const newTest = {
      ...props.dataTest,
      title: values.title,
      subject: values.subject,
      description: values.description,
      listQuestions: listQuestionsInput
    }
    if (props.type === 'EDIT') {
      dispatch(editTest(newTest))
      props.setDataTest(newTest)
    } else {
      dispatch(addTest(newTest))
    }
    handleCloseModal()
  }

  const handleModalAddQuestion = (status) => {
    setIsModalAddQuestion(status)
  }

  const handleRemoveQuestion = (id) => {
    const listQuestionsRemove = listQuestionsInput.filter(
      (question) => question.id !== id
    )

    setListQuestionsInput(listQuestionsRemove)
  }

  const handleCloseModal = () => {
    props.onModalCreateTest(false)
  }

  return (
    <div className="p-5">
      <Form
        className="form-right-align"
        form={formInputTests}
        labelCol={{
          span: 3
        }}
        wrapperCol={{
          span: 19
        }}
        onFinish={onFinish}
      >
        <Form.Item name="title" label={t('exercise.tests')} required>
          <Input placeholder={t('exercise.tests')} />
        </Form.Item>
        <Form.Item name="subject" label={t('exercise.subject')} required>
          <Input placeholder={t('exercise.subject')} />
        </Form.Item>
        <Form.Item
          name="description"
          label={t('exercise.description')}
          required
        >
          <Input placeholder={t('exercise.description')} />
        </Form.Item>
        <Form.Item name="questions" label={t('exercise.questions')} required>
          <div className="border-[1px] border-slate-200 border-solid">
            {listQuestionsInput.length > 0 && (
              <div>
                <List
                  bordered
                  dataSource={listQuestionsInput}
                  renderItem={(item, index) => (
                    <List.Item className="w-full">
                      <div className="w-full flex flex-col space-y-5">
                        <div className="w-full flex justify-between">
                          <div>
                            <strong>
                              {index + 1}. {item.title}
                            </strong>
                          </div>
                          <div>
                            <Button
                              type="text"
                              size="large"
                              danger
                              icon={<DeleteOutlined />}
                              onClick={() => handleRemoveQuestion(item.id)}
                            />
                          </div>
                        </div>
                        <div className="ml-10 space-y-3">
                          {item.answers?.map((itemAnswer) => (
                            <div key={itemAnswer.id} className="flex space-x-3">
                              <div>
                                <Checkbox checked={itemAnswer.isCorrect} />
                              </div>
                              <div>{itemAnswer.answer}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            )}
            <Button
              type="dashed"
              block
              icon={<PlusOutlined />}
              onClick={() => handleModalAddQuestion(true)}
            >
              {t('exercise.add_question')}
            </Button>
          </div>
        </Form.Item>
        <div className="flex justify-end space-x-3 mt-10">
          <Button onClick={() => handleCloseModal()}>{t('cancel')}</Button>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {props.type === 'EDIT'
                ? t('exercise.edit')
                : t('exercise.add_tests')}
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Modal
        title={t('exercise.add_question')}
        open={isModalAddQuestion}
        onCancel={() => handleModalAddQuestion(false)}
        footer={null}
        destroyOnClose
        width={500}
      >
        <FindQuestion
          onModalAddQuestion={handleModalAddQuestion}
          setListQuestions={setListQuestionsInput}
          listQuestions={listQuestionsInput}
        />
      </Modal>
    </div>
  )
}

export default InputTest
