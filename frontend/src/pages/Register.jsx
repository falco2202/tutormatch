import { useTranslation } from 'react-i18next'
import {
  Button,
  Form,
  Input,
  Radio,
  Select,
  Col,
  DatePicker,
  ConfigProvider
} from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { requestRegister } from '@/redux/reducers/authReducers'
import { requestGetCity, requestGetWard } from '@/redux/reducers/appReducers'
import { DATE_FORMAT, GENDER, REGEX } from '@/constants/common'
import dayjs from 'dayjs'
import { checkPickerLocale } from '@/utils/helper'
import CustomHelmet from '@/components/atoms/CustomHelmet'

const initFormState = {
  full_name: '',
  email: '',
  password: '',
  gender: '',
  phone: '',
  m_ward_id: '',
  address: '',
  date_of_birth: dayjs().subtract(18, 'y'),
  m_city_id: 1
}

function Register() {
  const { t } = useTranslation()
  const { token, isLoading } = useSelector((state) => state.authSlice)
  const { wardData, listCities } = useSelector((state) => state.appSlice)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const redirectToLogin = () => {
    navigate('/login')
  }
  const disabledDate = (current) => {
    // customDisabledDate explain the youngest teacher: 18 years old
    return current && current > dayjs().subtract(18, 'y').startOf('d')
  }
  const onSubmit = (values) => {
    const formattedValues = {
      ...values,
      date_of_birth: dayjs(values.date_of_birth).format(
        DATE_FORMAT.YEAR_MONTH_DAY
      )
    }
    if (isTeacherRegister) {
      formattedValues.role_register = 'teacher'
    }
    dispatch(
      requestRegister({ data: formattedValues, callback: redirectToLogin })
    )
  }

  useEffect(() => {
    if (token) {
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    dispatch(requestGetWard())
    dispatch(requestGetCity())
  }, [])

  const [isTeacherRegister, setIsTeacherRegister] = useState(false)
  const { TextArea } = Input
  const toggleRegister = (state) => {
    form.resetFields()
    setIsTeacherRegister(state)
  }
  const [form] = Form.useForm()

  return (
    <div className="container">
      <CustomHelmet
        titleHelmet={t('common.form.register_role', {
          role: isTeacherRegister
            ? t('common.roles.teacher').toLowerCase()
            : t('common.roles.parent').toLowerCase()
        })}
      />
      <div className="register__form">
        <div className="relative">
          <h1 className="register__form-title text-center py-4 rounded-t-[12px] mb-8 text-white">
            {t('common.form.register_role', {
              role: isTeacherRegister
                ? t('common.roles.teacher').toLowerCase()
                : t('common.roles.parent').toLowerCase()
            })}
          </h1>
        </div>
        <Form
          form={form}
          labelCol={{
            span: 6,
            offset: 1
          }}
          labelAlign="left"
          validateTrigger={['onBlur', 'onChange']}
          wrapperCol={{
            span: 16
          }}
          className="w-full"
          initialValues={initFormState}
          onFinish={onSubmit}
        >
          <Form.Item
            label={
              <span className="font-bold">{t('common.form.full_name')}</span>
            }
            name="full_name"
            rules={[
              {
                required: true,
                message: t('error_messages.required', {
                  attribute: t('common.form.full_name').toLowerCase()
                })
              },
              {
                min: 6,
                max: 255,
                message: t(
                  'response_error_messages.input_full_name_between_min_max',
                  {
                    min: 6,
                    max: 255
                  }
                )
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span className="font-bold">{t('common.form.gender')}</span>}
            name="gender"
            rules={[
              {
                required: true,
                message: t('error_messages.required', {
                  attribute: t('common.form.gender').toLowerCase()
                })
              }
            ]}
          >
            <Radio.Group className="flex justify-evenly">
              <Radio value={GENDER.MALE}>{t('common.form.male')}</Radio>
              <Radio value={GENDER.FEMALE}>{t('common.form.female')}</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={<span className="font-bold">{t('common.form.email')}</span>}
            name="email"
            rules={[
              {
                required: true,
                message: t('error_messages.required', {
                  attribute: t('common.form.email').toLowerCase()
                })
              },
              {
                type: 'email',
                message: t(
                  'response_error_messages.email_must_be_a_valid_email_address'
                )
              }
            ]}
          >
            <Input name="email" />
          </Form.Item>
          <Form.Item
            name="phone"
            label={<span className="font-bold">{t('common.form.phone')}</span>}
            rules={[
              {
                min: 8,
                max: 12,
                message: t(
                  'response_error_messages.input_phone_between_min_max',
                  {
                    min: 8,
                    max: 12
                  }
                )
              },
              {
                pattern: REGEX.PHONE,
                message: t('response_error_messages.phone_invalid')
              }
            ]}
          >
            <Input name="phone" />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-bold">{t('common.form.password')}</span>
            }
            name="password"
            rules={[
              {
                required: true,
                message: t('error_messages.required', {
                  attribute: t('common.form.password').toLowerCase()
                })
              },
              {
                min: 8,
                max: 255,
                message: t(
                  'response_error_messages.input_password_between_min_max',
                  {
                    min: 8,
                    max: 255
                  }
                )
              }
            ]}
            hasFeedback
          >
            <Input.Password name="password" />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-bold">
                {t('common.form.confirm_password')}
              </span>
            }
            name="confirm_password"
            dependencies={['password']}
            rules={[
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
            ]}
          >
            <Input.Password />
          </Form.Item>
          <ConfigProvider locale={checkPickerLocale()}>
            <Form.Item
              label={
                <span className="font-bold">
                  {t('common.form.date_of_birth')}
                </span>
              }
              name="date_of_birth"
              rules={[
                {
                  required: true,
                  message: t('error_messages.required', {
                    attribute: t('common.form.date_of_birth').toLowerCase()
                  })
                }
              ]}
            >
              <DatePicker
                inputReadOnly
                className="w-full"
                disabledDate={disabledDate}
                format={DATE_FORMAT.DATE_MONTH_YEAR}
                placeholder={DATE_FORMAT.DATE_MONTH_YEAR}
                showToday={false}
              />
            </Form.Item>
          </ConfigProvider>
          {isTeacherRegister && (
            <Form.Item
              label={
                <span className="font-bold">{t('common.form.school')}</span>
              }
              name="at_school"
              rules={[
                {
                  required: true,
                  message: t('error_messages.required', {
                    attribute: t('common.form.school').toLowerCase()
                  })
                },
                {
                  max: 255,
                  message: t(
                    'response_error_messages.at_school_max_string_length',
                    {
                      max: 255
                    }
                  )
                }
              ]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item
            label={
              <span className="font-bold">{t('common.form.address')}</span>
            }
            name="address"
            rules={[
              {
                required: true,
                message: t('error_messages.required', {
                  attribute: t('common.form.address').toLowerCase()
                })
              },
              {
                min: 3,
                max: 255,
                message: t(
                  'response_error_messages.input_address_between_min_max',
                  {
                    min: 3,
                    max: 255
                  }
                )
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span className="font-bold">{t('common.form.ward')}</span>}
            name="m_ward_id"
            rules={[
              {
                required: true,
                message: t('error_messages.required', {
                  attribute: t('common.form.ward').toLowerCase()
                })
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    getFieldValue('m_ward_id') === value ||
                    wardData?.wards.some((ward) => ward.id === value)
                  ) {
                    return Promise.resolve()
                  }
                  return Promise.reject()
                }
              })
            ]}
          >
            <Select
              showSearch
              filterOption={(inputValue, option) =>
                option.label.toLowerCase().includes(inputValue.toLowerCase())
              }
              options={wardData?.wards?.map((item) => ({
                label: item.name,
                value: item.id
              }))}
            />
          </Form.Item>
          <Form.Item
            label={<span className="font-bold">{t('common.form.city')}</span>}
            name="m_city_id"
          >
            <Select
              disabled
              options={listCities.map((item) => ({
                label: item.name,
                value: item.id
              }))}
            />
          </Form.Item>
          {isTeacherRegister && (
            <Form.Item
              label={
                <span className="font-bold">
                  {t('common.form.description')}
                </span>
              }
              name="description"
            >
              <TextArea
                autoSize={{
                  minRows: 3,
                  maxRows: 4
                }}
              />
            </Form.Item>
          )}
          <Col className="flex flex-col items-center">
            <div className="flex">
              {isTeacherRegister && (
                <Button
                  type="primary"
                  ghost
                  className="mr-2 w-[5rem]"
                  onClick={() => toggleRegister(false)}
                  danger
                >
                  {t('common.button.back')}
                </Button>
              )}
              <Button
                loading={isLoading}
                type="primary"
                htmlType="submit"
                className="min-w-[10rem] mb-4"
              >
                {t('common.form.register_role', {
                  role: isTeacherRegister
                    ? t('common.roles.teacher').toLowerCase()
                    : t('common.roles.parent').toLowerCase()
                })}
              </Button>
            </div>
            {!isTeacherRegister && (
              <Button type="link" onClick={() => toggleRegister(true)}>
                {t('common.form.register_role', {
                  role: t('common.roles.teacher').toLowerCase()
                })}
              </Button>
            )}
            <p className="text-zinc-500 mb-8">
              {t('common.form.already_have_account')}{' '}
              <Link to="/login">{t('common.button.login')}</Link>
            </p>
          </Col>
        </Form>
      </div>
    </div>
  )
}

export default Register
