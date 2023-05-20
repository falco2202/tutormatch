import { AVATAR_DEFAULT } from '@/assets/images'
import { CHARACTER_REQUIRE, DATE_FORMAT, INPUT_TYPES } from '@/constants/common'
import {
  Button,
  Rate,
  Col,
  Row,
  List,
  Form,
  Avatar,
  Modal,
  Typography
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import FormItem from '@/components/atoms/FormItem'
import { useDispatch, useSelector } from 'react-redux'
import { requestFeedbackClassroom } from '@/redux/reducers/classReducers'
import { handlePaginationInList, roundNumber } from '@/utils/helper'
import { isEmpty } from 'lodash'
import { useNavigate } from 'react-router-dom'

export default function SendFeedback({ classInformation }) {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { profileData } = useSelector((state) => state.authSlice)

  const [rate, setRate] = useState(0)

  const handleSend = (value) => {
    if (isEmpty(profileData)) {
      return Modal.warning({
        title: t('notification.warning'),
        content: t('notification.content_warning_need_login'),
        onOk: () => {
          navigate('/login')
        }
      })
    }

    dispatch(
      requestFeedbackClassroom({
        user: profileData,
        data: {
          classroomId: classInformation.detailClass.id,
          content: {
            ...value,
            star: rate,
            classroom_id: classInformation.detailClass.id
          }
        }
      })
    )
    setRate(0)
    form.resetFields()
  }

  return (
    <>
      <Row className="flex justify-between mb-2">
        <Col span={12} className="flex flex-col justify-between-center">
          <h3>{t('classroom.detail.rate')}</h3>
          <p className="py-2">{t('classroom.detail.rate_intro')}</p>
          <Rate
            allowHalf
            className="text-3xl w-[250px] flex"
            value={rate}
            onChange={(value) => setRate(value)}
          />
        </Col>
        <Col span={5} className="text-right">
          <h3>{t('classroom.detail.point')}</h3>
          <h1>{roundNumber(classInformation?.detailClass?.avgStar)}</h1>
          <Rate
            allowHalf
            className="text-[.8rem]"
            value={classInformation.detailClass?.avgStar}
            disabled
          />
          <p className="py-2">
            {classInformation.detailClass?.countRate
              ? classInformation.detailClass?.countRate
              : 0}
            {` ${t('classroom.detail.reviews')}`}
          </p>
        </Col>
      </Row>
      <div className="mb-6">
        <Form form={form} onFinish={handleSend} className="form__feedback">
          <FormItem
            className="mb-0"
            placeholder={t('classroom.detail.type_reviews')}
            colon={false}
            labelCol={{ span: 0 }}
            inputType={INPUT_TYPES.TEXT_AREA}
            name="comment"
            rules={[
              {
                required: true,
                message: t('error_messages.required', {
                  attribute: t('common.form.comment').toLowerCase()
                })
              },
              {
                max: CHARACTER_REQUIRE.MAX,
                message: t('error_messages.max_size_comment_feedback', {
                  max: CHARACTER_REQUIRE.MAX
                })
              }
            ]}
          />
          <Button
            type="primary"
            htmlType="submit"
            className="my-2 h-[35px] text-[1rem]"
          >
            {t('classroom.detail.send_feedback')}
          </Button>
        </Form>
      </div>
      <Typography.Title level={4}>
        {t('classroom.detail.feedback')}
      </Typography.Title>
      <div className="p-2 border-[1px] border-solid rounded-[.6rem] border-[#d9d9d9]">
        {classInformation?.feedback?.length > 0 ? (
          <List
            itemLayout="vertical"
            size="large"
            pagination={handlePaginationInList(
              classInformation.feedback?.length
            )}
            dataSource={classInformation.feedback}
            renderItem={(item) => (
              <List.Item key={item.user.id}>
                <Row>
                  <Col span={1} className="mr-3">
                    <Avatar src={item.user?.image?.url || AVATAR_DEFAULT} />
                  </Col>
                  <Col span={16}>
                    <h3>{item.user.fullName}</h3>
                    <p>{item.comment}</p>
                  </Col>
                  <Col
                    span={6}
                    className="text-right flex flex-col justify-center"
                  >
                    <Rate
                      allowHalf
                      className="text-[.8rem]"
                      value={item.star}
                      disabled
                    />
                    <h5>
                      {dayjs(item.date_comment).format(
                        DATE_FORMAT.DATE_MONTH_YEAR
                      )}
                    </h5>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        ) : (
          <h3 className="text-[#d9d9d9] text-center my-8">
            {t('classroom.detail.no_feedback_classroom')}
          </h3>
        )}
      </div>
    </>
  )
}
