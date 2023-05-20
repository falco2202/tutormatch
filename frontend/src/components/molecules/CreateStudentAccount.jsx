import { DATE_FORMAT, GENDER, INPUT_TYPES, REGEX } from '@/constants/common'
import { Button, Col, Form, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import FormItem from '@/components/atoms/FormItem'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { requestCreateAccountStudent } from '@/redux/reducers/authReducers'

const CreateStudentAccount = () => {
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const createAccountItem = [
    {
      name: 'fullName',
      label: t('common.form.full_name'),
      labelCol: { span: 6 },
      rules: [
        {
          required: true,
          message: t('error_messages.required', {
            attribute: t('common.form.full_name').toLowerCase()
          })
        },
        {
          min: 3,
          max: 255,
          message: t(
            'response_error_messages.input_full_name_between_min_max',
            {
              min: 3,
              max: 255
            }
          )
        }
      ]
    },
    {
      name: 'email',
      label: t('common.form.email'),
      labelCol: { span: 6 },
      rules: [
        {
          required: true,
          message: t('error_messages.required', {
            attribute: t('common.form.email').toLowerCase()
          })
        }
      ]
    },
    {
      name: 'password',
      label: t('common.form.password'),
      labelCol: { span: 6 },
      inputType: INPUT_TYPES.PASSWORD,
      rules: [
        {
          required: true,
          message: t('error_messages.required', {
            attribute: t('common.form.password').toLowerCase()
          })
        },
        {
          min: 8,
          max: 255,
          message: t('response_error_messages.input_password_between_min_max', {
            min: 8,
            max: 255
          })
        }
      ]
    },
    {
      name: 'confirm_password',
      label: t('common.form.confirm_password'),
      labelCol: { span: 6 },
      inputType: INPUT_TYPES.PASSWORD,
      rules: [
        {
          required: true,
          message: t('error_messages.required', {
            attribute: t('common.form.confirm_password').toLowerCase()
          })
        },

        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve()
            }

            return Promise.reject(
              t('error_messages.not_match', {
                attribute: t('common.form.confirm_password').toLowerCase()
              })
            )
          }
        })
      ]
    },

    {
      name: 'gender',
      label: t('common.form.gender'),
      labelCol: { span: 6 },
      inputType: INPUT_TYPES.RADIO,
      options: [
        { label: t('common.form.male'), value: GENDER.MALE },
        { label: t('common.form.female'), value: GENDER.FEMALE }
      ],
      rules: [
        {
          required: true,
          message: t('error_messages.required', {
            attribute: t('common.form.gender').toLowerCase()
          })
        }
      ]
    },
    {
      name: 'dateOfBirth',
      label: t('common.form.date_of_birth'),
      labelCol: { span: 6 },
      inputType: INPUT_TYPES.DATE_PICKER,
      rules: [
        {
          required: true,
          message: t('error_messages.required', {
            attribute: t('common.form.date_of_birth').toLowerCase()
          })
        }
      ]
    },
    {
      name: 'phoneNum',
      label: t('common.form.phone'),
      labelCol: { span: 6 },
      rules: [
        {
          min: 8,
          max: 12,
          message: t('response_error_messages.input_phone_between_min_max', {
            min: 8,
            max: 12
          })
        },
        {
          pattern: REGEX.PHONE,
          message: t('response_error_messages.phone_invalid')
        }
      ]
    }
  ]

  const formFinishHandler = (values) => {
    const { phoneNum, fullName, dateOfBirth, ...rest } = values
    const formattedValues = {
      ...rest,
      full_name: fullName,
      date_of_birth: dayjs(dateOfBirth).format(DATE_FORMAT.YEAR_MONTH_DAY),
      phone: phoneNum
    }
    dispatch(requestCreateAccountStudent(formattedValues))
    form.resetFields()
  }
  return (
    <>
      <Form form={form} onFinish={formFinishHandler}>
        <Row gutter={47}>
          <Col span={14} offset={5}>
            {createAccountItem.map((item) => (
              <FormItem
                name={item.name}
                label={item.label}
                labelCol={item.labelCol}
                inputType={item.inputType}
                key={item.name}
                options={item.options}
                rules={item.rules}
              />
            ))}
          </Col>
        </Row>

        <div className="flex justify-center space-x-4">
          <Button className="min-w-[7rem]" type="primary" htmlType="submit">
            {t('common.button.create_account')}
          </Button>
          <Button
            className="min-w-[7rem]"
            onClick={() => navigate('/')}
            danger
            ghost
          >
            {t('common.button.back')}
          </Button>
        </div>
      </Form>
    </>
  )
}

export default CreateStudentAccount
