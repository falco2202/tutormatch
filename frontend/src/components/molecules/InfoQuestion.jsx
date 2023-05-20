import { Checkbox, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { convertNumberToTime } from '@/utils/helper';


//TODO_BETA
const InfoQuestion = (props) => {
  const { t } = useTranslation()
  const {
    title,
    time,
    answers,
    subject
  } = props.dataDetailQuestion
  return (
    <div className="p-10 space-y-5">
      <div className="flex">
        <Col span={4}>
          <strong>{t('exercise.question')}</strong>
        </Col>
        <Col span={20}>
          <span>{title}</span>
        </Col>
      </div>
      <div className="flex">
        <Col span={4}>
          <strong>{t('exercise.time')}</strong>
        </Col>
        <Col span={20}>
          <span>{convertNumberToTime(time)}</span>
        </Col>
      </div>
      <div className="flex">
        <Col span={4}>
          <strong>{t('exercise.subject')}</strong>
        </Col>
        <Col span={20}>
          <span>{subject}</span>
        </Col>
      </div>
      <div className="flex">
        <Col span={4}>
          <strong>{t('exercise.answers_question')}</strong>
        </Col>
        <Col span={20}>
          {answers.map((item) => (
            <div className="flex mt-3" key={item.id}>
              <Col span={1}>
                <Checkbox checked={item.isCorrect} />
              </Col>
              <Col span={18}>
                {item.answer}
              </Col>
            </div>
          ))}
        </Col>
      </div>
    </div>
  )
}

export default InfoQuestion;
