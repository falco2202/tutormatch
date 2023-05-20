import { AVATAR_DEFAULT } from '@/assets/images'
import { DATE_FORMAT, ROLES } from '@/constants/common'
import { STATUS } from '@/constants/defaultValue'
import { Col, Row, Image, Descriptions } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

export default function ProfileDetail({ data, dataAddress }) {
  const { t } = useTranslation()
  return (
    <Row>
      <Col span={8}>
        <Image
          src={data?.image?.url || AVATAR_DEFAULT}
          preview={false}
          width={300}
        />
      </Col>
      <Col span={16}>
        <Descriptions title={t('common.form.user_info')}>
          <Descriptions.Item label={t('common.form.full_name')}>
            {data.fullName}
          </Descriptions.Item>
          <Descriptions.Item label={t('common.form.email')}>
            {data.email}
          </Descriptions.Item>
          <Descriptions.Item label={t('common.form.gender')}>
            {data.gender ? t('common.form.male') : t('common.form.female')}
          </Descriptions.Item>
          <Descriptions.Item label={t('common.form.date_of_birth')}>
            {dayjs(data.dateOfBirth).format(DATE_FORMAT.DATE_MONTH_YEAR)}
          </Descriptions.Item>
          {data.role !== ROLES.STUDENT && (
            <Descriptions.Item label={t('common.form.address')}>
              {dataAddress?.address
                ? `${dataAddress.address[0]?.address ?? ''}, ${
                    dataAddress.address[0]?.ward?.name ?? ''
                  }, ${dataAddress.address[0]?.ward?.city?.name ?? ''}`
                : t('error_messages.not_found')}
            </Descriptions.Item>
          )}
          {data.profileTeacher && (
            <>
              <Descriptions.Item label={t('common.form.status')}>
                {data?.profileTeacher[0]?.status === STATUS.TEACHER.PENDING
                  ? t('common.option.pending')
                  : data?.profileTeacher[0]?.status === STATUS.TEACHER.APPROVED
                  ? t('common.option.approved')
                  : t('common.option.locked')}
              </Descriptions.Item>
              <Descriptions.Item label={t('common.form.school')}>
                {data?.profileTeacher[0]?.at_school}
              </Descriptions.Item>
              <Descriptions.Item label={t('common.form.description')}>
                {data?.profileTeacher[0]?.description
                  ? data.profileTeacher[0].description
                  : t('error_messages.not_found')}
              </Descriptions.Item>
            </>
          )}
        </Descriptions>
      </Col>
    </Row>
  )
}
