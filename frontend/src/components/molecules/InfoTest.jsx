import { List, Col, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';


//TODO_BETA
const InfoTest = (props) => {
  const { t } = useTranslation()
  const {
    title,
    subject,
    description,
    listQuestions
  } = props.dataTestDetail
  return (
    <div>
      <div className="space-y-3">
        <div className="flex">
          <Col span={3}>
            <strong>{t('exercise.tests')}</strong>
          </Col>
          <Col span={18}>
            {title}
          </Col>
        </div>
        <div className="flex">
          <Col span={3}>
            <strong>{t('exercise.subject')}</strong>
          </Col>
          <Col span={18}>
            {subject}
          </Col>
        </div>
        <div className="flex">
          <Col span={3}>
            <strong>{t('exercise.description')}</strong>
          </Col>
          <Col span={18}>
            {description}
          </Col>
        </div>
        <div className="flex">
          <Col span={3}>
            <strong>{t('exercise.questions')}</strong>
          </Col>
          <Col span={18}>
            <div className="border-[1px] border-slate-200 border-solid">
              <List
                bordered
                dataSource={listQuestions}
                renderItem={(item, index) => (
                  <List.Item>
                    <div className="flex flex-col space-y-5">
                      <div className="flex">
                        <Col span={22}>
                          <strong>{index + 1}. {item.title}</strong>
                        </Col>
                      </div>
                      <div className="ml-10 space-y-3">
                        {item.answers?.map((itemAnswer) => (
                          <div key={itemAnswer.id} className="flex space-x-3">
                            <div>
                              <Checkbox checked={itemAnswer.isCorrect} />
                            </div>
                            <div>
                              {itemAnswer.answer}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </div>
      </div>
    </div>
  )
}

export default InfoTest;
