import { useMemo } from 'react'
import {
  Form,
  Col,
  Row,
  Button,
  ConfigProvider,
  Table,
  Image,
  Spin,
  Typography
} from 'antd'
import {
  DATE_FORMAT,
  GENDER,
  INPUT_TYPES,
  REGEX,
  ROLES
} from '@/constants/common'
import FormItem from '@/components/atoms/FormItem'
import AvatarUpload from '@/components/atoms/AvatarUpload'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { requestGetCity, requestGetWard } from '@/redux/reducers/appReducers'
import { checkPickerLocale } from '@/utils/helper'
import { AVATAR_DEFAULT } from '@/assets/images'
import {
  requestGetMe,
  requestUpdateProfile
} from '@/redux/reducers/authReducers'

const initFormState = {
  full_name: '',
  email: '',
  password: '',
  gender: '',
  phone: '',
  m_ward_id: '',
  address: '',
  date_of_birth: '',
  m_city_id: 1
}

const PersonalDetails = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { role, profileData, isLoading } = useSelector(
    (state) => state.authSlice
  )
  const { wardData, listCities } = useSelector((state) => state.appSlice)
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { Item } = Form
  const profileDetails = useMemo(
    () => ({
      left: [
        {
          name: 'at_school',
          label: t('common.form.school'),
          labelCol: { span: 6 },
          rules: [
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
          ]
        },
        {
          name: 'description',
          label: t('common.form.description'),
          labelCol: { span: 6 },
          inputType: INPUT_TYPES.TEXT_AREA
        }
      ],
      right: [
        {
          name: 'full_name',
          label: t('common.form.full_name'),
          labelCol: { span: 5 },
          rules: [
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
          ]
        },
        {
          name: 'gender',
          label: t('common.form.gender'),
          labelCol: { span: 5 },
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
          name: 'phone',
          label: t('common.form.phone'),
          labelCol: { span: 5 },
          rules: [
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
          ]
        },
        {
          name: 'date_of_birth',
          label: t('common.form.date_of_birth'),
          labelCol: { span: 5 },
          inputType: INPUT_TYPES.DATE_PICKER,
          requireAge: role !== ROLES.STUDENT ? 18 : 0,
          rules: [
            {
              required: true,
              message: t('error_messages.required', {
                attribute: t('common.form.date_of_birth').toLowerCase()
              })
            }
          ]
        }
      ],
      bottom: [
        {
          name: 'address',
          label: t('common.form.address'),
          labelCol: { span: 5 },
          inputType: INPUT_TYPES.INPUT,
          rules: [
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
          ]
        },
        {
          name: 'm_ward_id',
          label: t('common.form.ward'),
          labelCol: { span: 5 },
          inputType: INPUT_TYPES.SELECT,
          options: wardData?.wards.map((item) => ({
            label: item.name,
            value: item.id
          })),
          rules: [
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
          ],
          showSearch: true,
          filterOption: (inputValue, option) =>
            option.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
        },
        {
          name: 'm_city_id',
          label: t('common.form.city'),
          labelCol: { span: 5 },
          inputType: INPUT_TYPES.SELECT,
          options: listCities.map((item) => ({
            label: item.name,
            value: item.id
          })),
          disabled: true
        }
      ]
    }),
    [wardData, listCities]
  )
  const columns = [
    {
      title: t('common.form.avatar'),
      dataIndex: 'image',
      render: (item) => (
        <Image src={item?.url || AVATAR_DEFAULT} preview={false} width={150} />
      )
    },
    {
      title: t('common.form.full_name'),
      dataIndex: 'fullName',
      render: (_, record) => (
        <Typography.Link onClick={() => navigate(`child/${record.id}`)}>
          {record.fullName}
        </Typography.Link>
      )
    },
    {
      title: t('common.form.gender'),
      dataIndex: 'gender',
      render: (item) => (item ? t('common.form.male') : t('common.form.female'))
    },
    {
      title: t('common.form.email'),
      dataIndex: 'email'
    },
    {
      title: t('common.form.date_of_birth'),
      dataIndex: 'dateOfBirth',
      render: (item) => dayjs(item).format(DATE_FORMAT.DATE_MONTH_YEAR)
    },
    {
      title: t('common.form.phone'),
      dataIndex: 'phone'
    }
  ]

  const formFinishHandler = (values) => {
    const formattedValues = {
      ...values,
      date_of_birth: dayjs(values.date_of_birth).format(
        DATE_FORMAT.YEAR_MONTH_DAY
      )
    }
    dispatch(requestUpdateProfile(formattedValues))
  }
  useEffect(() => {
    if (profileData.email) {
      form.setFieldsValue({
        ...profileData,
        full_name: profileData.fullName,
        date_of_birth: dayjs(
          profileData.dateOfBirth,
          DATE_FORMAT.YEAR_MONTH_DAY
        )
      })
      if (role === ROLES.TEACHER) {
        form.setFieldsValue({
          ...profileData,
          at_school: profileData.profileTeacher[0].at_school,
          description: profileData.profileTeacher[0].description
        })
      }
      if (role !== ROLES.STUDENT) {
        form.setFieldsValue({
          ...profileData,
          address: profileData.address[0].address,
          m_ward_id: profileData.address[0].ward.id,
          m_city: profileData.address[0].ward.city.id
        })
      }
    }
  }, [profileData])
  useEffect(() => {
    dispatch(requestGetMe())
    dispatch(requestGetWard())
    dispatch(requestGetCity())
    return () => {
      form.resetFields()
    }
  }, [])
  return (
    <>
      <Spin spinning={isLoading} delay={500}>
        <Form
          form={form}
          onFinish={formFinishHandler}
          initialValues={initFormState}
        >
          <Row gutter={46}>
            <Col span={10}>
              <AvatarUpload profileData={profileData} />
              {role === ROLES.TEACHER &&
                profileDetails.left.map((item) => (
                  <FormItem
                    name={item.name}
                    label={item.label}
                    labelCol={item.labelCol}
                    inputType={item.inputType}
                    key={item.name}
                  />
                ))}
            </Col>
            <Col span={14}>
              <ConfigProvider locale={checkPickerLocale()}>
                <Item
                  name="image"
                  label={
                    <span className="font-bold">{t('common.form.email')}</span>
                  }
                  labelCol={{ span: 5 }}
                  labelAlign="left"
                >
                  <p>{profileData.email}</p>
                </Item>
                {profileDetails.right.map((item) => (
                  <FormItem
                    name={item.name}
                    label={item.label}
                    labelCol={item.labelCol}
                    inputType={item.inputType}
                    key={item.name}
                    options={item.options}
                    requireAge={item.requireAge}
                    rules={item.rules}
                  />
                ))}
                {role !== ROLES.STUDENT &&
                  profileDetails.bottom.map((item) => (
                    <FormItem
                      name={item.name}
                      label={item.label}
                      labelCol={item.labelCol}
                      inputType={item.inputType}
                      key={item.name}
                      rules={item.rules}
                      options={item.options}
                      filterOption={item.filterOption}
                      showSearch={item.showSearch}
                      defaultValue={item.defaultValue}
                      disabled={item.disabled}
                    />
                  ))}
              </ConfigProvider>
            </Col>
          </Row>

          <div className="flex justify-center space-x-4">
            <Button className="min-w-[6rem]" type="primary" htmlType="submit">
              {t('common.button.submit')}
            </Button>
            <Button
              className="min-w-[6rem]"
              onClick={() => navigate(-1)}
              danger
              ghost
            >
              {t('common.button.back')}
            </Button>
          </div>
        </Form>
        {profileData.role === ROLES.PARENT && (
          <Col>
            <h3 className="my-6 text-2xl">{t('parents.list.children')}</h3>
            {profileData && profileData.childrens[0] ? (
              <Table
                rowKey="id"
                columns={columns}
                dataSource={profileData.childrens}
                pagination={false}
              />
            ) : (
              <p>{t('error_messages.not_found')}</p>
            )}
          </Col>
        )}
      </Spin>
    </>
  )
}

export default PersonalDetails
