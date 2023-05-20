import Title from '@/components/atoms/Title'
import {
  Col,
  Form,
  Input,
  Button,
  Space,
  DatePicker,
  TimePicker,
  Select,
  Upload,
  Spin
} from 'antd'
import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined
} from '@ant-design/icons'
import { t } from 'i18next'
import { DAY_OF_THE_WEEK, DATE_FORMAT, NUMBER } from '@/constants/common'
import { isDuplicate, handleResMessage } from '@/utils/helper'
import { useNavigate } from 'react-router-dom'
import { HOURS_MINUTE, PROPS_TYPE } from '@/constants/defaultValue'
import { useSelector, useDispatch } from 'react-redux'
import { requestGetCity, requestGetWard } from '@/redux/reducers/appReducers'
import { useMemo, useState, useEffect } from 'react'
import { addClassroomApi, updateDetailClassroom } from '@/api'
import dayjs from 'dayjs'
import pushNotification from '@/utils/notification'
import { setIsUnauthenticated } from '@/redux/reducers/authReducers'

const TitlePart = ({ children }) => {
  return <div className="font-bold text-lg mb-5">{children}</div>
}

const InputClassroom = (props) => {
  const [addClassroomForm] = Form.useForm()
  const navigate = useNavigate()
  const { wardData, listCities } = useSelector((state) => state.appSlice)
  const dispatch = useDispatch()
  const [imageCover, setImageCover] = useState()
  const dayOptions = Object.keys(DAY_OF_THE_WEEK).map((item) => {
    return {
      value: DAY_OF_THE_WEEK[item],
      label: t(`classroom.add_classroom.${item}`)
    }
  })

  const wardOptions = useMemo(() => {
    const wards = wardData.wards.map((item) => {
      return { value: item.id, label: item.name }
    })
    return wards
  }, [wardData])

  const ruleSchedule = [
    ({ getFieldValue }) => ({
      validator() {
        const schedule = getFieldValue('lessons')
        let isFill = true
        const scheduleCheck = schedule.map((item) => {
          if (!item || !item.start || !item.end) {
            isFill = false
            return { day: '', start: '', end: '' }
          }
          const start = item.start ? item.start.format(HOURS_MINUTE) : ''
          const end = item.end ? item.end.format(HOURS_MINUTE) : ''
          return { day: item.day, start: start, end: end }
        })
        if (!isFill)
          return Promise.reject(
            new Error(t('classroom.add_classroom.lesson_fill'))
          )
        if (isDuplicate(scheduleCheck))
          return Promise.reject(
            new Error(t('classroom.add_classroom.lesson_duplicate'))
          )
        return Promise.resolve()
      }
    })
  ]

  useEffect(() => {
    setImageCover(props.dataClassroom.file)
    addClassroomForm.setFieldsValue(props.dataClassroom)
    if (wardData.wards.length === 0) dispatch(requestGetWard())
    if (listCities.length === 0) dispatch(requestGetCity())

    return () => addClassroomForm.resetFields()
  }, [props.dataClassroom])

  const callApiAddClassroom = async (data) => {
    try {
      const response = await addClassroomApi(data)
      const { type, message } = handleResMessage(response)
      pushNotification({
        type,
        message
      })
      navigate('/class-management')
    } catch (error) {
      const { type, message, isUnauthenticated } = handleResMessage(error)
      pushNotification({
        type,
        message
      })
      dispatch(setIsUnauthenticated(isUnauthenticated))
    }
  }

  const callApiUpdateClassroom = async (fmData) => {
    try {
      const response = await updateDetailClassroom({
        fmData,
        classroomId: props.classroomId
      })
      const { type, message } = handleResMessage(response)
      pushNotification({
        type,
        message
      })
      navigate('/class-management')
    } catch (error) {
      const { type, message, isUnauthenticated } = handleResMessage(error)
      pushNotification({
        type,
        message
      })
      dispatch(setIsUnauthenticated(isUnauthenticated))
    }
  }

  const onFinish = (values) => {
    const fmData = new FormData()
    fmData.append('class_name', values.class_name)
    fmData.append('subject', values.subject)
    fmData.append(
      'date_start',
      values.rangeDate[0].format(DATE_FORMAT.YEAR_MONTH_DAY)
    )
    fmData.append(
      'date_end',
      values.rangeDate[1].format(DATE_FORMAT.YEAR_MONTH_DAY)
    )
    fmData.append('quantity', values.quantity)
    fmData.append('tuition_fee', values.tuition_fee)
    fmData.append('m_ward_id', values.m_ward_id)
    fmData.append('address', values.address)
    fmData.append('description', values.description)
    values.lessons.forEach((item, index) => {
      fmData.append(`lessons[${index}][day]`, item.day)
      fmData.append(`lessons[${index}][start]`, item.start.format(HOURS_MINUTE))
      fmData.append(`lessons[${index}][end]`, item.end.format(HOURS_MINUTE))
    })
    if (values.file?.file && values.file?.file?.originFileObj)
      fmData.append('file', values.file.file.originFileObj)

    if (props.type === 'ADD_CLASSROOM') callApiAddClassroom(fmData)

    if (props.type === 'UPDATE_CLASSROOM') callApiUpdateClassroom(fmData)
  }

  const handleClickCancel = () => {
    navigate('/class-management')
  }

  const handleChangeImage = (options) => {
    setImageCover(URL.createObjectURL(options.file.originFileObj))
  }

  const disabledDate = (current) => {
    return current && current < dayjs().endOf('day')
  }

  return (
    <div>
      <Spin spinning={props.isLoading}>
        <Title
          title={
            props.type === PROPS_TYPE.ADD_CLASSROOM
              ? t('classroom.add_classroom.add_new_classroom')
              : t('classroom.add_classroom.update_classroom')
          }
        />

        <Form
          className="mt-12 form-right-align"
          name="add-classroom"
          onFinish={onFinish}
          form={addClassroomForm}
          labelCol={{
            span: 5
          }}
          wrapperCol={{
            span: 15
          }}
        >
          <div className="flex px-20 justify-center">
            <Col span={11}>
              <TitlePart>
                {t('classroom.add_classroom.classroom_information_title')}
              </TitlePart>
              <div className="ml-7">
                <Form.Item
                  label={t('classroom.add_classroom.classroom_name')}
                  name="class_name"
                  rules={[
                    {
                      required: true,
                      message: t(
                        'classroom.add_classroom.classroom_name_required'
                      )
                    },
                    {
                      max: 255,
                      message: t(
                        'classroom.add_classroom.classroom_name_max_required'
                      )
                    }
                  ]}
                >
                  <Input
                    placeholder={t('classroom.add_classroom.classroom_name')}
                  />
                </Form.Item>
                <Form.Item
                  label={t('classroom.add_classroom.classroom_quantity')}
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: t(
                        'classroom.add_classroom.classroom_quantity_required'
                      )
                    },
                    {
                      pattern: NUMBER,
                      message: t(
                        'classroom.add_classroom.classroom_quantity_number_required'
                      )
                    }
                  ]}
                >
                  <Input
                    placeholder={t(
                      'classroom.add_classroom.classroom_quantity'
                    )}
                  />
                </Form.Item>
                <Form.Item
                  label={t('classroom.add_classroom.classroom_subject')}
                  name="subject"
                  rules={[
                    {
                      required: true,
                      message: t(
                        'classroom.add_classroom.classroom_subject_required'
                      )
                    },
                    {
                      max: 255,
                      message: t(
                        'classroom.add_classroom.classroom_subject_max_required'
                      )
                    }
                  ]}
                >
                  <Input
                    placeholder={t('classroom.add_classroom.classroom_subject')}
                  />
                </Form.Item>
                <Form.Item
                  label={t('classroom.add_classroom.classroom_tuition_fee')}
                  name="tuition_fee"
                  rules={[
                    {
                      required: true,
                      message: t(
                        'classroom.add_classroom.classroom_tuition_fee_required'
                      )
                    },
                    {
                      pattern: NUMBER,
                      message: t(
                        'classroom.add_classroom.classroom_tuition_fee_number_required'
                      )
                    }
                  ]}
                >
                  <Input
                    placeholder={t(
                      'classroom.add_classroom.classroom_tuition_fee'
                    )}
                    addonAfter="vnđ"
                  />
                </Form.Item>
                <Form.Item
                  label={t('classroom.add_classroom.classroom_description')}
                  name="description"
                >
                  <Input.TextArea
                    placeholder={t(
                      'classroom.add_classroom.classroom_description'
                    )}
                    rows={4}
                  />
                </Form.Item>
                <Form.Item
                  label={t('classroom.add_classroom.classroom_file')}
                  name="file"
                  rules={[
                    {
                      required: props.type === PROPS_TYPE.ADD_CLASSROOM,
                      message: t(
                        'classroom.add_classroom.classroom_file_required'
                      )
                    }
                  ]}
                >
                  <Upload
                    listType="picture"
                    showUploadList={false}
                    onChange={(options) => handleChangeImage(options)}
                    maxCount={1}
                  >
                    <Button icon={<UploadOutlined />}>
                      {t('select_image')}
                    </Button>
                  </Upload>
                </Form.Item>
                <div className="flex fle-col h-[200px] mb-10">
                  <Col span={4}> </Col>
                  <Col span={13}>
                    {imageCover && (
                      <img
                        className="h-full w-full object-contain"
                        src={imageCover}
                        alt="img-cover"
                      />
                    )}
                  </Col>
                </div>
              </div>
            </Col>
            <Col span={11}>
              <TitlePart>
                {t('classroom.add_classroom.classroom_address_title')}
              </TitlePart>
              <div className="ml-7">
                <Form.Item
                  label={t('classroom.add_classroom.classroom_ward')}
                  name="m_ward_id"
                  rules={[
                    {
                      required: true,
                      message: t(
                        'classroom.add_classroom.classroom_ward_required'
                      )
                    }
                  ]}
                >
                  <Select
                    options={wardOptions}
                    placeholder={t('classroom.add_classroom.classroom_ward')}
                  />
                </Form.Item>
                <Form.Item
                  label={t('classroom.add_classroom.classroom_address')}
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: t(
                        'classroom.add_classroom.classroom_address_required'
                      )
                    },
                    {
                      max: 100,
                      message: t(
                        'classroom.add_classroom.classroom_address_max_required'
                      )
                    }
                  ]}
                >
                  <Input
                    placeholder={t('classroom.add_classroom.classroom_address')}
                  />
                </Form.Item>
              </div>
              <TitlePart>
                {t('classroom.add_classroom.classroom_schedule_title')}
              </TitlePart>
              <div className="ml-7">
                <Form.Item
                  label={t('classroom.add_classroom.study_time')}
                  name="rangeDate"
                  rules={[
                    {
                      required: true,
                      message: t(
                        'classroom.add_classroom.classroom_study_time_required'
                      )
                    }
                  ]}
                >
                  <DatePicker.RangePicker
                    disabledDate={disabledDate}
                    placeholder={[
                      t('classroom.add_classroom.classroom_date_start'),
                      t('classroom.add_classroom.classroom_date_end')
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label={t('classroom.add_classroom.classroom_schedule')}
                  name="lessonFields"
                  rules={ruleSchedule}
                  required
                  validateTrigger="onBlur"
                >
                  <Form.List name="lessons">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{
                              display: 'flex',
                              marginBottom: 8
                            }}
                            align="baseline"
                          >
                            <Space.Compact>
                              <Form.Item {...restField} name={[name, 'day']}>
                                <Select
                                  options={dayOptions}
                                  style={{ width: '110px' }}
                                  placeholder={t(
                                    'classroom.add_classroom.lesson_day'
                                  )}
                                />
                              </Form.Item>
                              <Form.Item {...restField} name={[name, 'start']}>
                                <TimePicker
                                  format={HOURS_MINUTE}
                                  placeholder={t(
                                    'classroom.add_classroom.lesson_start'
                                  )}
                                  showNow={false}
                                />
                              </Form.Item>
                              <Form.Item {...restField} name={[name, 'end']}>
                                <TimePicker
                                  format={HOURS_MINUTE}
                                  placeholder={t(
                                    'classroom.add_classroom.lesson_end'
                                  )}
                                  showNow={false}
                                />
                              </Form.Item>
                            </Space.Compact>
                            {fields.length > 1 && (
                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                              />
                            )}
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            {t('classroom.add_classroom.add_schedule')}
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form.Item>
              </div>
            </Col>
          </div>
          <div className="w-full pb-20">
            <div className="flex justify-center space-x-2">
              <Button onClick={() => handleClickCancel()}>{t('cancel')}</Button>
              <Button type="primary" htmlType="submit">
                {props.type === PROPS_TYPE.ADD_CLASSROOM
                  ? t('classroom.add_classroom.add')
                  : t('classroom.add_classroom.update')}
              </Button>
            </div>
          </div>
        </Form>
      </Spin>
    </div>
  )
}

export default InputClassroom
