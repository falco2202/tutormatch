import { Button, Col } from 'antd';
import { useTranslation } from 'react-i18next';

//TODO_BETA
const StepInfoTest = (props) => {
  const { t } = useTranslation()
  const {
    title,
    subject,
    description,
    timeStart,
    timeEnd
  } = props.dataTest

  const handleNextStep = () => {
    props.onNextStepTakeTest()
  }

  return (
    <div className="w-full h-[50vh]">
      <div className="w-full h-full flex flex-col justify-around items-center">
        <div>
          <h3>
            <strong>{t('take_test.take_test')}</strong>
          </h3>
        </div>
        <div className="shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="p-10 w-[550px] space-y-3">
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
          </div>
        </div>
        <div>
          <Button type="primary" onClick={() => handleNextStep()}>
            {t('take_test.start')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StepInfoTest;
