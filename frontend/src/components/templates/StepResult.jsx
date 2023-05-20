import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

//TODO_BETA
const StepResult = (props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { profileData } = useSelector((state) => state.authSlice)
  const {
    title,
    subject
  } = props.dataTest

  const handleClickBack = () => {
    navigate('/tests')
  }
  return (
    <div className="w-full h-[50vh]">
      <div className="w-full h-full flex flex-col justify-around items-center">
        <div>
          <h3>
            <strong>{t('take_test.result')}</strong>
          </h3>
        </div>
        <div className="shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="p-10 w-[550px] space-y-3">
            <div className="flex">
              <Col span={7}>
                <strong>{t('take_test.fullName')}</strong>
              </Col>
              <Col span={17}>
                {profileData.fullName}
              </Col>
            </div>
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
                <strong>{t('take_test.score')}</strong>
              </Col>
              <Col span={17}>
                50/100
              </Col>
            </div>
          </div>
        </div>
        <div>
          <Button type="primary" onClick={() => handleClickBack()}>
            {t('common.button.back')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StepResult;
