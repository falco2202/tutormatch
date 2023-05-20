import { Col, Descriptions, Row, Image, Table, Typography, Rate } from 'antd'
import { CLASS_COVER_IMAGE_DEFAULT } from '@/assets/images'
import { useTranslation } from 'react-i18next'
import {
  checkPaginationHandleInClient,
  formatMoney,
  roundNumber
} from '@/utils/helper'
import dayjs from 'dayjs'
import { DATE_FORMAT, DAY_OF_WEEK } from '@/constants/common'
import { isEmpty } from 'lodash'

export default function ClassroomInformation({
  data,
  schedule,
  dataSource,
  columns,
  total
}) {
  const { t } = useTranslation()

  return (
    <>
      {!isEmpty(data) && (
        <>
          <Row>
            <Col span={10}>
              <Image
                src={data?.image?.url || CLASS_COVER_IMAGE_DEFAULT}
                width={500}
                preview={false}
              />
              <Typography.Title level={4} className="pb-0 pt-4">
                {t('classroom.detail.point')}
              </Typography.Title>
              <Rate value={data?.avgStar} disabled allowHalf />
              <Typography.Text level={5} className="text-lg pl-3">
                {roundNumber(data?.avgStar)}
                {' / '}
              </Typography.Text>
              <Typography.Text>
                {data?.countRate} {t('classroom.detail.reviews')}
              </Typography.Text>
            </Col>
            <Col span={14}>
              <Descriptions column={14} title={t('classroom.detail.detail')}>
                <Descriptions.Item
                  span={14}
                  label={t('classroom.detail.classroom_description')}
                >
                  {data?.descriptions}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions title={t('classroom.detail.time')}>
                <Descriptions.Item
                  label={t('classroom.detail.classroom_date_start')}
                >
                  {dayjs(data?.dateStart).format(DATE_FORMAT.DATE_MONTH_YEAR)}
                </Descriptions.Item>
                <Descriptions.Item
                  label={t('classroom.detail.classroom_date_end')}
                >
                  {dayjs(data?.dateEnd).format(DATE_FORMAT.DATE_MONTH_YEAR)}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions
                title={t('classroom.detail.classroom_schedule_title')}
              >
                {!isEmpty(schedule) ? (
                  schedule.map((item) => (
                    <Descriptions.Item key={item.day}>
                      {t(`classroom.add_classroom.${DAY_OF_WEEK[item.day]}`)}
                      {': '} {item.start} {' ~ '} {item.end}
                    </Descriptions.Item>
                  ))
                ) : (
                  <Typography.Text>
                    {t('classroom.detail.no_schedule')}
                  </Typography.Text>
                )}
              </Descriptions>
            </Col>
          </Row>
          <Row className="mt-10">
            <Col span={12}>
              <Descriptions title={t('classroom.detail.information')}>
                <Descriptions.Item label={t('classroom.detail.classroom_name')}>
                  {data?.className}
                </Descriptions.Item>
                <Descriptions.Item
                  label={t('classroom.detail.classroom_quantity')}
                >
                  {data?.quantity}
                </Descriptions.Item>
                <Descriptions.Item
                  label={t('classroom.detail.classroom_subject')}
                >
                  {data?.subject}
                </Descriptions.Item>
                <Descriptions.Item
                  label={t('classroom.detail.classroom_tuition_fee')}
                >
                  {formatMoney(data?.tuitionFee)}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col span={12}>
              <Descriptions title={t('common.form.address')}>
                {data?.address ? (
                  <>
                    <Descriptions.Item label={t('common.form.address')}>
                      {data.address[0].address}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('common.form.ward')}>
                      {data.address[0].ward.name}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('common.form.city')}>
                      {data.address[0].ward.city.name}
                    </Descriptions.Item>
                  </>
                ) : (
                  <Descriptions.Item label={t('common.form.address')}>
                    {t('common.notification.not_found')}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Col>
          </Row>
          <div className="text-center mt-5">
            <Typography.Title level={4}>
              {t('classroom.detail.student_list_in_class')}
            </Typography.Title>
          </div>
          {!isEmpty(dataSource) ? (
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={checkPaginationHandleInClient(total)}
            />
          ) : (
            <Typography.Text>
              {t('classroom.detail.no_student')}
            </Typography.Text>
          )}
        </>
      )}
    </>
  )
}
