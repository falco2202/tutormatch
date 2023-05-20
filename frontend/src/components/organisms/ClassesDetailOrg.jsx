import class_default from '@/assets/images/class_default.jpg'
import { getDate } from '@/utils/helper'
import { Col } from 'antd'
import { useTranslation } from 'react-i18next'

const ClassesDetailOrg = (props) => {
  const { detailClass, image } = props.dataDetailClass
  const {
    className,
    subject,
    profileTeacher,
    dateStart,
    dateEnd,
    description
  } = detailClass
  const { t } = useTranslation()

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <Col span={9}>
          <div className="w-full">
            <img
              className="w-full h-full object-contain"
              src={image?.url || class_default}
              alt="image_classes"
            />
          </div>
        </Col>
        <Col span={12}>
          <div className="space-y-5 text-base">
            <div className="text-3xl font-bold">{className}</div>
            <div className="font-medium space-y-3 ml-8">
              <div className="flex flex-row">
                <Col span={5}>{`${t('classes.subject')}: `}</Col>
                <Col span={8}>{subject}</Col>
              </div>
              <div className="flex flex-row">
                <Col span={5}>{`${t('classes.teacher')}: `}</Col>
                <Col span={8}>{profileTeacher.user.fullName}</Col>
              </div>
              <div className="flex flex-row">
                <Col span={5}>{`${t('classes.dateStart')}: `}</Col>
                <Col span={8}>{getDate(dateStart)}</Col>
              </div>
              <div className="flex flex-row">
                <Col span={5}>{`${t('classes.dateEnd')}: `}</Col>
                <Col span={8}>{getDate(dateEnd)}</Col>
              </div>
              <div className="flex flex-row">
                <Col span={5}>{`${t('classes.description')}: `}</Col>
                <Col span={18}>{description || t('none')}</Col>
              </div>
            </div>
          </div>
        </Col>
      </div>
    </div>
  )
}

export default ClassesDetailOrg
