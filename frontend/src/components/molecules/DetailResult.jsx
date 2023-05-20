import { useTranslation } from 'react-i18next'
import { List, Checkbox, Col } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

//TODO_BETA
const DetailResult = (props) => {
  const { t } = useTranslation()
  return (
    <div>
      <div className="p-10 space-y-3">
        <div className="flex">
          <Col span={4}>
            <strong>{t('classroom.homework.fullName')}</strong>
          </Col>
          <Col span={20}>{props.dataDetailResult.fullName}</Col>
        </div>
        <div className="flex">
          <Col span={4}>
            <strong>{t('classroom.homework.score')}</strong>
          </Col>
          <Col span={20}>{props.dataDetailResult.score}</Col>
        </div>
      </div>
      <div className="p-10 pt-0">
        <List
          bordered
          dataSource={props.dataDetailResult.result}
          renderItem={(item, index) => (
            <div className="flex flex-col space-y-5 p-5">
              <div className="flex">
                <Col span={22}>
                  <strong>
                    {index + 1}. {item.title}
                  </strong>
                </Col>
              </div>
              <div className="ml-5 space-y-3">
                {item.answers?.map((itemAnswer) => (
                  <div key={itemAnswer.id} className="flex space-x-3">
                    <div className="w-[10px] h-[10px]">
                      {itemAnswer.isCorrect && <CheckOutlined />}
                    </div>
                    <div>
                      <Checkbox checked={itemAnswer.isChoice} />
                    </div>
                    <div
                      style={{
                        color: itemAnswer.isChoice
                          ? itemAnswer.isCorrect
                            ? 'green'
                            : 'red'
                          : 'none'
                      }}
                    >
                      {itemAnswer.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  )
}

export default DetailResult
