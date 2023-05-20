import ClassesDetailOrg from '@/components/organisms/ClassesDetailOrg'
import ClassesChildrenTableOrg from '@/components/organisms/ClassesChildrenTableOrg'
import ChildrenLessonsDetail from '@/components/molecules/ChildrenLessonsDetail'
import NotFoundSearch from '@/components/molecules/NotFoundSearch'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Button, Modal, Spin, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { requestGetDetailClass } from '@/redux/reducers/classReducers'
import { useTranslation } from 'react-i18next'
import CustomHelmet from '@/components/atoms/CustomHelmet'
import SendFeedback from '@/components/molecules/SendFeedback'
import { ROLES } from '@/constants/common'
import SharedExercise from '@/components/molecules/SharedExercise'
import ResultHomework from '@/components/molecules/ResultHomework'

const ClassesDetailTemp = () => {
  const { t } = useTranslation()
  const classesId = useParams()
  const dispatch = useDispatch()
  const { isLoading, classInformation } = useSelector(
    (state) => state.classSlice
  )
  const { role } = useSelector((state) => state.authSlice)
  const [isOpenModalDetailChildren, setIsOpenModalDetailChildren] =
    useState(false)
  const [dataChildrenLessonsDetail, setDataChildrenLessonsDetail] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    absentLessons: [],
    lessonsUntilNow: []
  })

  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    dispatch(requestGetDetailClass(classesId.id))
  }, [])

  const handleDetailChildrenModal = (action) => {
    setIsOpenModalDetailChildren(action)
  }

  const handleShowResult = () => {
    setShowResult(!showResult)
  }

  return (
    <Spin spinning={isLoading}>
      <div className="flex justify-center flex-col items-center">
        {classInformation ? (
          <div className="w-4/5">
            <div className="space-y-20">
              <CustomHelmet
                titleHelmet={classInformation.detailClass?.className}
              />
              <div className="flex justify-center">
                <ClassesDetailOrg dataDetailClass={classInformation} />
              </div>
              {role === ROLES.PARENT && (
                <ClassesChildrenTableOrg
                  dataDetailClass={classInformation}
                  setDataChildrenLessonsDetail={setDataChildrenLessonsDetail}
                  onDetailChildrenModal={handleDetailChildrenModal}
                />
              )}
            </div>
            {/* TODO_BETA */}
            {role === ROLES.PARENT ? (
              <div className="mt-20">
                <Typography.Title level={3}>
                  {t('classroom.detail.feedback_classroom')}
                </Typography.Title>
                <SendFeedback classInformation={classInformation} />
              </div>
            ) : (
              <div className="mt-20">
                <SharedExercise />
              </div>
            )}
          </div>
        ) : (
          <NotFoundSearch message={t('error_messages.not_found')} />
        )}
        <Modal
          open={isOpenModalDetailChildren}
          onCancel={() => handleDetailChildrenModal(false)}
          footer={null}
        >
          <ChildrenLessonsDetail
            handleShowResult={handleShowResult}
            dataChildrenLessonsDetail={dataChildrenLessonsDetail}
          />
        </Modal>
        <Modal
          open={showResult}
          width={600}
          closable={false}
          centered
          footer={
            <div className="text-right">
              <Button onClick={handleShowResult} type="primary">
                {t('back_to')}
              </Button>
            </div>
          }
        >
          <ResultHomework />
        </Modal>
      </div>
    </Spin>
  )
}

export default ClassesDetailTemp
