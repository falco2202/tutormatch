import Header from '@/layouts/admin/Header'
import Footer from '@/layouts/admin/Footer'
import { useTranslation } from 'react-i18next'
import {
  Col,
  Image,
  Button,
  Modal,
  Row,
  Typography,
  Affix,
  Spin,
  Skeleton
} from 'antd'
import { AVATAR_DEFAULT, CLASS_COVER_IMAGE_DEFAULT } from '@/assets/images'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { requestGetDetailClassGlobal } from '@/redux/reducers/classReducers'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '@/constants/common'
import pushNotification from '@/utils/notification'
import { joinClassroomApi } from '@/api'
import SelectChildren from '@/components/molecules/SelectChildren'
import {
  formatMoney,
  getAddress,
  getKey,
  handleResMessage
} from '@/utils/helper'
import SendFeedback from '@/components/molecules/SendFeedback'
import { setIsUnauthenticated } from '@/redux/reducers/authReducers'
import { isEmpty } from 'lodash'
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import CustomHelmet from '@/components/atoms/CustomHelmet'
import { SCHOOL_ICON } from '@/assets/icons'
const { Paragraph } = Typography
function DetailClass() {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const paramIdClassroom = useParams()
  const { profileData } = useSelector((state) => state.authSlice)
  const [isOpenModalSelectChildren, setIsOpenModalSelectChildren] =
    useState(false)

  const getDetailClassGlobal = (param) => {
    dispatch(requestGetDetailClassGlobal(param))
  }
  useEffect(() => {
    getDetailClassGlobal(paramIdClassroom.id)
    window.scrollTo(0, 0)
  }, [])

  const getDay = (item) => {
    const dayOfWeek = [
      t('classroom.add_classroom.SUNDAY'),
      t('classroom.add_classroom.MONDAY'),
      t('classroom.add_classroom.TUESDAY'),
      t('classroom.add_classroom.WEDNESDAY'),
      t('classroom.add_classroom.THURSDAY'),
      t('classroom.add_classroom.FRIDAY'),
      t('classroom.add_classroom.SATURDAY')
    ]
    return dayOfWeek[item]
  }
  const { classInformation, isLoading } = useSelector(
    (state) => state.classSlice
  )
  const callApiJoinClassroom = async (idStudent) => {
    const dataStudent = { student_id: idStudent }
    try {
      const response = await joinClassroomApi(dataStudent, paramIdClassroom.id)
      const { type, message } = handleResMessage(response)
      pushNotification({
        type,
        message
      })
    } catch (error) {
      const { type, message, isUnauthenticated } = handleResMessage(error)
      pushNotification({
        type,
        message
      })
      dispatch(setIsUnauthenticated(isUnauthenticated))
    }
  }

  const handleIsOpenSelectChildren = (action) => {
    setIsOpenModalSelectChildren(action)
  }

  const handleOpenModalSelectListChill = () => {
    if (profileData.childrens) {
      handleIsOpenSelectChildren(true)
    } else {
      pushNotification({
        type: 'error',
        message: t('login_parent_account')
      })
    }
  }

  const teacherInfo = [
    {
      key: 1,
      icon: <UserOutlined className="mr-2" />,
      label: classInformation?.detailClass?.profileTeacher?.user.fullName
    },
    {
      key: 2,
      icon: <img src={SCHOOL_ICON} alt="" width={16} className="mr-2" />,
      label: classInformation?.detailClass?.profileTeacher?.atSchool
    },
    {
      key: 3,
      icon: <MailOutlined className="mr-2" />,
      label: classInformation?.detailClass?.profileTeacher?.user.email
    }
  ]

  return (
    <>
      <Header />
      {isEmpty(classInformation) ? (
        <div className="my-24 mx-80	h-fit">
          <Skeleton active paragraph={{ rows: 18 }} />
        </div>
      ) : (
        <Spin spinning={isLoading} delay={500}>
          <CustomHelmet
            titleHelmet={classInformation?.detailClass?.className}
          />

          <div className="content bg-[#f4f4f4]">
            <Row justify="center" className="py-6">
              <Col xxl={12} lg={13} className="bg-white p-6 classroom__detail">
                <Row gutter={16}>
                  <Col xxl={12} xl={24}>
                    <Image
                      height="100%"
                      width="100%"
                      preview={false}
                      src={
                        classInformation?.detailClass?.image?.url ||
                        CLASS_COVER_IMAGE_DEFAULT
                      }
                    />
                  </Col>
                  <Col xxl={12} xl={24} className="relative">
                    <Col xxl={24} xl={12} className="h-[calc(100%-4rem)] pt-2">
                      <span className="text-[#0369a1] text-3xl font-bold">
                        {classInformation?.detailClass?.className}
                      </span>
                      <Paragraph className="font-semibold mt-2 text-[1rem]">
                        {`${t('classroom.detail.take_place')}: ${dayjs(
                          classInformation?.detailClass?.dateStart
                        ).format(DATE_FORMAT.DATE_MONTH_YEAR_SLASH)} - ${dayjs(
                          classInformation?.detailClass?.dateEnd
                        ).format(DATE_FORMAT.DATE_MONTH_YEAR_SLASH)}`}
                      </Paragraph>
                      <Paragraph className="font-bold text-[1rem]">
                        {classInformation?.detailClass?.address.length
                          ? `${t('common.form.address')}: ${getAddress(
                              classInformation?.detailClass.address
                            )}`
                          : ''}
                      </Paragraph>
                      {classInformation.numLesson.length && (
                        <Paragraph className="font-bold text-[1rem]">
                          {t(
                            'classroom.add_classroom.classroom_schedule_title'
                          )}
                          :
                          <ul className="text-[1rem] list-none">
                            {classInformation?.numLesson?.map((item) => (
                              <li
                                key={getKey(item.day)}
                                className="list-decimal font-normal"
                              >
                                {`${getDay(item.day)}, ${item.start} - ${
                                  item.end
                                }`}
                              </li>
                            ))}
                          </ul>
                        </Paragraph>
                      )}
                    </Col>
                    <Col xxl={24} xl={12} className="h-[2rem]">
                      <p className="font-bold text-[1rem] mb-1">
                        {t('common.form.quantity')}:
                        {` ${
                          classInformation?.detailClass?.countStudentsInClass ||
                          0
                        }/${classInformation?.detailClass?.quantity}`}
                      </p>
                      <h3 className=" text-[#ff5100] text-[1.5rem]">
                        {`${t('common.form.tuition_fee')}: ${formatMoney(
                          classInformation?.detailClass?.tuitionFee
                        )}`}
                      </h3>
                    </Col>
                  </Col>
                </Row>

                <div className="my-6 border-[2px] border-[#0369a1] border-solid min-h-[9rem] p-6">
                  <h2 className="text-sky-600">
                    {t('classroom.detail.introduce')}
                  </h2>
                  <p className="mt-4">
                    {classInformation?.detailClass?.description}
                  </p>
                </div>
                <SendFeedback classInformation={classInformation} />
              </Col>
              <Col
                xxl={4}
                lg={5}
                className="bg-transparent teacher__detail flex flex-col items-end relative"
              >
                <Affix offsetTop={104} className="w-[16rem] py-">
                  <div>
                    <img
                      className="w-full aspect-square"
                      src={
                        classInformation?.detailClass?.profileTeacher.user.image
                          ?.url || AVATAR_DEFAULT
                      }
                      alt={
                        classInformation?.detailClass?.profileTeacher.user
                          .fullName
                      }
                    />
                    <div className="description w-full mt-2 h-full">
                      {teacherInfo.map((item) => (
                        <h4
                          className="description__item my-2 text-[.9rem]"
                          key={item.key}
                        >
                          {item.icon}
                          {item.label}
                        </h4>
                      ))}
                      {classInformation?.detailClass?.profileTeacher.user
                        .phone && (
                        <h4 className="description__item my-2 text-[.9rem]">
                          <PhoneOutlined className="mr-2" />
                          {
                            classInformation?.detailClass?.profileTeacher.user
                              .phone
                          }
                        </h4>
                      )}

                      <Button
                        type="primary"
                        className="mt-2 w-full"
                        onClick={handleOpenModalSelectListChill}
                      >
                        {t('classroom.add_classroom.classroom_register')}
                      </Button>
                    </div>
                  </div>
                </Affix>
              </Col>
            </Row>
            <Modal
              title={t('children_list')}
              open={isOpenModalSelectChildren}
              centered
              footer={null}
              width={900}
              onCancel={() => handleIsOpenSelectChildren(false)}
            >
              <SelectChildren
                listChildren={profileData.childrens}
                callApiJoinClassroom={callApiJoinClassroom}
              />
            </Modal>
          </div>
        </Spin>
      )}
      <Footer />
    </>
  )
}

export default DetailClass
