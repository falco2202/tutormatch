import { Button, Input, Form, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import { UploadOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addExercise } from '@/redux/reducers/fakeDataReducers'
import { Upload } from 'antd'
import pushNotification from '@/utils/notification'
import { MAX_SIZE } from '@/constants/defaultValue'

//TODO_BETA
const InputExercise = (props) => {
  const { t } = useTranslation()
  const [formInputTests] = Form.useForm()
  const dispatch = useDispatch()
  const [, setListExercisesInput] = useState([])

  useEffect(() => {
    formInputTests.setFieldsValue(props.dataTest)

    setListExercisesInput([...props.dataTest.listExercises])
  }, [])

  const onFinish = (values) => {
    const newExercise = {
      ...props.dataTest,
      title: values.title,
      description: values.description
    }
    dispatch(addExercise(newExercise))
    handleCloseModal()
  }
  const handleCloseModal = () => {
    props.onModalCreateTest(false)
  }

  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 ** 100 < MAX_SIZE
    if (!isLt2M) {
      pushNotification({
        type: 'error',
        message: t('image.image_required_2mb')
      })
    }
    return false
  }

  return (
    <div className="p-5">
      <Form
        className="form-right-align"
        form={formInputTests}
        labelCol={{
          span: 4
        }}
        wrapperCol={{
          span: 20
        }}
        onFinish={onFinish}
      >
        <Form.Item
          className="w-full"
          name="title"
          label={t('exercise.title_exercises')}
          required
        >
          <Input placeholder={t('exercise.title_exercises')} />
        </Form.Item>
        <Form.Item
          name="description"
          label={t('exercise.description')}
          required
        >
          <Input placeholder={t('exercise.description')} />
        </Form.Item>
        <Row>
          <Col span={4} className="pl-2 pt-1">
            {t('exercise.upload_exercise')}:
          </Col>
          <Col>
            <Upload beforeUpload={beforeUpload}>
              <Button icon={<UploadOutlined />}>
                {t('exercise.upload_exercise')}
              </Button>
            </Upload>
          </Col>
        </Row>
        <div className="flex justify-end space-x-3 mt-10">
          <Button onClick={() => handleCloseModal()} danger>
            {t('cancel')}
          </Button>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t('exercise.add_exercise')}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default InputExercise
