import { useTranslation } from 'react-i18next';
import { Col } from 'antd';

//TODO_BETA
const DetailTestStudent = (props) => {
  const { t } = useTranslation()
  const {
    title,
    description,
    subject,
    timeStart,
    timeEnd
  } = props.dataTest
  return (
    <div className="w-full">
      <div className="w-full h-full flex flex-col justify-around items-center">
        <div className="p-10 w-full space-y-3">
          <div className="flex">
            <Col span={7}>
              <strong>{t('take_test.test')}</strong>
            </Col>
            <Col span={17}>
              {title}
            </Col>
          </div>
          <div className="flex">
            <Col span={7}>
              <strong>{t('take_test.subject')}</strong>
            </Col>
            <Col span={17}>
              {subject}
            </Col>
          </div>
          <div className="flex">
            <Col span={7}>
              <strong>{t('take_test.description')}</strong>
            </Col>
            <Col span={17}>
              {description}
            </Col>
          </div>
          <div className="flex">
            <Col span={7}>
              <strong>{t('take_test.timeStart')}</strong>
            </Col>
            <Col span={17}>
              {timeStart}
            </Col>
          </div>
          <div className="flex">
            <Col span={7}>
              <strong>{t('take_test.timeEnd')}</strong>
            </Col>
            <Col span={17}>
              {timeEnd}
            </Col>
          </div>
          <div className="flex">
            <Col span={7}>
              <strong>{t('take_test.score')}</strong>
            </Col>
            <Col span={17}>
              50/100
            </Col>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailTestStudent;
