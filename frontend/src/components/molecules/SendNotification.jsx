import { Button, Col, Row, Typography, Form, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import FormItem from '@/components/atoms/FormItem'
import { CHARACTER_REQUIRE, INPUT_TYPES } from '@/constants/common'
import { useDispatch } from 'react-redux'
import { requestSendNotification } from '@/redux/reducers/notificationReducers'

export default function SendNotification({ classData }) {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const [form] = Form.useForm()

  const formNotification = [
    {
      name: 'title',
      label: t('common.form.title'),
      labelCol: { span: 3 },
      rules: [
        {
          required: true,
          message: t('error_messages.required', {
            attribute: t('common.form.title').toLowerCase()
          })
        },
        {
          min: CHARACTER_REQUIRE.MIN,
          message: t('error_messages.min_size_title_notification', {
            min: CHARACTER_REQUIRE.MIN
          })
        },
        {
          max: CHARACTER_REQUIRE.MAX,
          message: t('error_messages.max_size_title_notification', {
            max: CHARACTER_REQUIRE.MAX
          })
        }
      ],
      placeholder: t('common.placeholder.input_title')
    },
    {
      name: 'content',
      label: t('common.form.content'),
      labelCol: { span: 3 },
      rules: [
        {
          required: true,
          message: t('error_messages.required', {
            attribute: t('common.form.content').toLowerCase()
          })
        },
        {
          min: CHARACTER_REQUIRE.MIN,
          message: t('error_messages.min_size_content_notification', {
            min: CHARACTER_REQUIRE.MIN
          })
        },
        {
          max: CHARACTER_REQUIRE.MAX,
          message: t('error_messages.max_size_content_notification', {
            max: CHARACTER_REQUIRE.MAX
          })
        }
      ],
      inputType: INPUT_TYPES.TEXT_AREA,
      placeholder: t('common.placeholder.input_content')
    }
  ]

  const handleFinish = (values) => {
    if (classData.listStudent.total === 0) {
      return Modal.warning({
        title: t('notification.warning'),
        content: t('notification.content_warning_send_notification')
      })
    }
    const sendInformation = {
      classroom_id: classData.detailClass.id,
      ...values
    }
    dispatch(requestSendNotification(sendInformation))
    form.resetFields()
  }
  return (
    <>
      <Typography.Title level={4}>
        {t('classroom.detail.send_notification')}
      </Typography.Title>
      <Form form={form} onFinish={handleFinish}>
        <Row>
          <Col span={16} offset={4}>
            {formNotification.map((item) => (
              <FormItem
                key={item.name}
                label={item.label}
                name={item.name}
                labelCol={item.labelCol}
                rules={item.rules}
                inputType={item.inputType}
                placeholder={item.placeholder}
              />
            ))}
          </Col>
        </Row>
        <div className="flex justify-center">
          <Button className="min-w-[6rem]" type="primary" htmlType="submit">
            {t('common.button.send')}
          </Button>
        </div>
      </Form>
    </>
  )
}
