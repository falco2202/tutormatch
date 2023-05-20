import avatar_default from '@/assets/images/avatar_default.png'
import ClassesDetailTableOrg from '@/components/organisms/ClassesDetailTableOrg'
import { Button, Col } from 'antd'
import { useTranslation } from 'react-i18next'

const ChildrenLessonsDetail = (props) => {
  const { t } = useTranslation()
  const {
    absentLessons,
    lessonsUntilNow,
    fullName,
    email,
    dateOfBirth,
    image
  } = props.dataChildrenLessonsDetail
  return (
    <div className="space-y-10">
      <div className="w-full flex justify-center">
        <div className="w-32 h-32">
          <img
            className="w-full h-full object-contain"
            src={image?.url || avatar_default}
            alt="avatar"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-4/5">
          <div className="flex flex-row">
            <Col span={6} className="font-medium">{`${t(
              'classes.full_name'
            )}:`}</Col>
            <Col span={18}>{fullName}</Col>
          </div>
          <div className="flex flex-row">
            <Col span={6} className="font-medium">
              Email:
            </Col>
            <Col span={18}>{email}</Col>
          </div>
          <div className="flex flex-row">
            <Col span={6} className="font-medium">
              {`${t('classes.date_of_bird')}:`}
            </Col>
            <Col span={18}>{dateOfBirth}</Col>
          </div>
        </div>
      </div>
      {/** // TODO_BETA */}
      <div className="text-center">
        <Button onClick={() => props.handleShowResult()} type="primary">
          {t('classes.result')}
        </Button>
      </div>
      <div>
        <ClassesDetailTableOrg
          absentLessons={absentLessons}
          lessonsUntilNow={lessonsUntilNow}
        />
      </div>
    </div>
  )
}

export default ChildrenLessonsDetail
