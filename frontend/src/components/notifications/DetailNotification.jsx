import { BACK_ICON } from '@/assets/icons'
import { AVATAR_DEFAULT } from '@/assets/images'
import { DATE_FORMAT, TIME_FORMAT } from '@/constants/common'
import { Typography, Spin, Row, Col } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const { Title, Paragraph } = Typography

export function DetailNotification() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { detailNotification, isLoading } = useSelector(
    (state) => state.notificationSlice
  )
  return (
    <Spin spinning={isLoading}>
      {detailNotification?.id ? (
        <Row className="detail__notification" justify="center" align="middle">
          <Col
            span={14}
            className="min-h-[500px] flex flex-col justify-center detail__notification-container"
          >
            <Title
              className="detail__notification-title bg-[#fcfcfc] !mb-0"
              level={3}
            >
              {`${detailNotification?.title} - ${detailNotification?.from}`}
            </Title>
            <div className="py-4 flex px-4 detail__notification-content justify-center">
              <Col className="mr-1" span={1}>
                <img
                  src={AVATAR_DEFAULT}
                  alt=""
                  className="rounded-3xl"
                  width={40}
                />
              </Col>
              <Col span={22}>
                <div className="flex justify-between">
                  <div className="flex items-center mb-2">
                    <h3 className="mr-2">
                      {detailNotification?.classroom
                        ? `${detailNotification.classroom.profileTeacher?.user?.fullName}`
                        : `${detailNotification.from}`}
                    </h3>
                    {detailNotification?.classroom ? (
                      <h4 className="font-normal text-[#666666]">{`<${detailNotification.classroom.profileTeacher?.user?.email}>`}</h4>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="text-[#666666]">
                  {dayjs(detailNotification?.createdAt).format(
                    `${DATE_FORMAT.DATE_MONTH_YEAR_SLASH} ${TIME_FORMAT.HOUR_MINUTES}`
                  )}
                </div>

                <Paragraph className="whitespace-pre-line mt-4 text-[1rem] text-[#4d4d4d] font-normal detail__notification-text">
                  {detailNotification?.content}
                </Paragraph>
                <button
                  className="default-btn flex mt-8"
                  onClick={() => navigate(-1)}
                >
                  <img src={BACK_ICON} alt="" width={16} className="mr-2" />
                  {t('common.button.back')}
                </button>
              </Col>
            </div>
          </Col>
        </Row>
      ) : (
        <span>{t('detail_notification.not_found')}</span>
      )}
    </Spin>
  )
}
