import Title from '@/components/atoms/Title'
import ClassroomInformation from '@/components/molecules/ClassroomInformation'
import AcceptListStudent from '@/components/molecules/AcceptListStudent'
import { TABS } from '@/constants/classroom'
import { Tabs, Spin, Button, Dropdown, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  addUniqueKey,
  getLesson,
  isCanAttendance,
  isNotTypeNumber,
  removeSymbol
} from '@/utils/helper'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import { requestGetDetailClass } from '@/redux/reducers/classReducers'
import { useEffect, useState, useMemo } from 'react'
import dayjs from 'dayjs'
import { DATE_FORMAT, ROLES } from '@/constants/common'
import { requestGetStudent } from '@/redux/reducers/userReducers'
import { STATUS, USER_ROLE } from '@/constants/defaultValue'
import { getLocalStorage } from '@/utils/storage'
import AttendanceSheet from '@/components/molecules/AttendanceSheet'
import ProfileDetail from '@/components/molecules/ProfileDetail'
import SendNotification from '@/components/molecules/SendNotification'
import CustomHelmet from '@/components/atoms/CustomHelmet'
import {
  DownOutlined,
  CalendarOutlined,
  BookOutlined,
  FileOutlined
} from '@ant-design/icons'
import { Modal } from 'antd'
import HomeworkSendOrg from '@/components/organisms/HomeworkSendOrg'
import HomeworkOrg from '@/components/organisms/HomeworkOrg'
import ExerciseShareOrg from '@/components/molecules/ExerciseShareOrg'
import SharedExercise from '@/components/molecules/SharedExercise'

export default function ClassroomDetail() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const { id } = useParams()

  const { classInformation, isLoading } = useSelector(
    (state) => state.classSlice
  )
  const { data, total } = useSelector((state) => state.userSlice)
  const role = parseInt(getLocalStorage(USER_ROLE))
  const [isOpenAttendanceSheet, setIsOpenAttendanceSheet] = useState(false)
  //TODO_BETA:
  const [isOpenModalHomework, setIsOpenModalHomework] = useState(false)
  const [isOpenModalExercise, setIsOpenModalExercise] = useState(false)

  const getClassDetail = (param) => {
    dispatch(requestGetDetailClass(param))
  }

  const getStudentList = (param) => {
    dispatch(requestGetStudent(param))
  }
  useEffect(() => {
    if (isNotTypeNumber(id) && role === ROLES.ADMIN) {
      return navigate('/admin/teachers')
    }
    if (isNotTypeNumber(id) && role === ROLES.TEACHER) {
      return navigate('/')
    }
    getClassDetail(id)
    getStudentList({
      classroom_id: id,
      student_status: STATUS.STUDENT.PENDING,
      page_size: 9999
    })
  }, [id])
  const columns = [
    {
      title: t('common.form.full_name'),
      dataIndex: 'fullName'
    },
    {
      title: t('common.form.email'),
      dataIndex: 'email'
    },
    {
      title: t('common.form.date_of_birth'),
      dataIndex: 'dateOfBirth',
      render: (item) => dayjs(item).format(DATE_FORMAT.DATE_MONTH_YEAR)
    },
    {
      title: t('common.form.phone'),
      dataIndex: 'phone'
    },
    {
      title: t('common.form.gender'),
      dataIndex: 'gender',
      render: (item) => (item ? t('common.form.male') : t('common.form.female'))
    }
  ]

  //TODO_BETA: button actions
  const items = [
    {
      label: t('classroom.detail.attendance'),
      disabled: !isCanAttendance(classInformation?.lessons),
      key: 'ATTENDANCE',
      icon: <CalendarOutlined />
    },
    {
      label: t('classroom.detail.give_homework'),
      key: 'HOMEWORK',
      icon: <BookOutlined />
    },
    {
      label: t('classroom.detail.give_exercise'),
      key: 'EXERCISE',
      icon: <FileOutlined />
    }
  ]
  const menuProps = {
    items,
    onClick: handleMenuActionClick
  }
  //
  const classDataSource = useMemo(() => {
    return addUniqueKey(classInformation?.listStudent?.items)
  }, [classInformation?.listStudent?.items])
  const tabItems = [
    {
      key: TABS.INFORMATION,
      label: t('classroom.detail.title'),
      children: (
        <ClassroomInformation
          data={classInformation?.detailClass}
          schedule={classInformation?.numLesson}
          dataSource={classDataSource}
          total={classInformation?.listStudent?.total}
          columns={columns}
        />
      ),
      roleAccess: [ROLES.ADMIN, ROLES.TEACHER]
    },
    {
      key: TABS.ACCEPT_STUDENT,
      label: t('classroom.detail.accept_student'),
      children: (
        <AcceptListStudent
          columns={columns}
          data={data}
          total={total}
          classData={classInformation}
        />
      ),
      roleAccess: [ROLES.TEACHER]
    },
    {
      key: TABS.TEACHER_INFORMATION,
      label: t('classroom.detail.teacher_information'),
      children: (
        <ProfileDetail
          data={classInformation?.detailClass?.profileTeacher?.user}
          dataAddress={classInformation?.detailClass}
        />
      ),
      roleAccess: [ROLES.ADMIN]
    },
    {
      key: TABS.SEND_NOTIFICATION,
      label: t('classroom.detail.send_notification'),
      children: <SendNotification classData={classInformation} />,
      roleAccess: [ROLES.TEACHER]
    },
    //TODO_BETA
    {
      key: TABS.SHARED_EXERCISE,
      label: t('classroom.detail.shared_exercise'),
      children: <SharedExercise />,
      roleAccess: [ROLES.TEACHER]
    },
    //TODO_BETA
    {
      key: TABS.HOMEWORK,
      label: t('classroom.detail.homework'),
      children: <HomeworkOrg />,
      roleAccess: [ROLES.TEACHER]
    }
  ]
  const tabs = useMemo(() => {
    return tabItems.filter((item) => item.roleAccess.includes(role))
  }, [role, classInformation, data])

  const tabChangeHandler = (hashTab) => {
    navigate({ hash: hashTab })
  }

  function handleAttendance() {
    setIsOpenAttendanceSheet(!isOpenAttendanceSheet)
  }

  //TODO_BETA
  const handleModalHomework = (status) => {
    setIsOpenModalHomework(status)
  }
  function handleGiveHomework() {
    handleModalHomework(true)
  }

  const handleModalExercise = (status) => {
    setIsOpenModalExercise(status)
  }
  function handleGiveExercise() {
    handleModalExercise(true)
  }

  function handleMenuActionClick(e) {
    if (e.key === 'ATTENDANCE') {
      handleAttendance()
    } else if (e.key === 'HOMEWORK') {
      handleGiveHomework()
    } else handleGiveExercise()
  }
  //
  const lesson = getLesson(classInformation?.lessons)
  return (
    <div className="mx-10">
      <CustomHelmet titleHelmet={t('classroom.detail.title')} />
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Button
            type="primary"
            danger
            onClick={() => {
              if (role === ROLES.ADMIN) {
                return navigate('/admin/classroom')
              }
              navigate('/class-management')
            }}
          >
            {t('common.button.back')}
          </Button>
          {role === ROLES.TEACHER && (
            <Button
              type="primary"
              onClick={() => {
                navigate(`/class-management/update/${id}`)
              }}
            >
              {t('common.button.update')}
            </Button>
          )}
        </div>
        <Title title={t('classroom.detail.title')} addButton={false} />
        {/* TODO_BETA: change button for beta */}
        {role === ROLES.TEACHER ? (
          <div>
            <Dropdown menu={menuProps}>
              <Button type="primary">
                <Space>
                  {t('classroom.detail.actions')}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <Spin spinning={isLoading} delay={1000}>
        {!isEmpty(classInformation) && (
          <div className="my-6">
            <Tabs
              defaultActiveKey={removeSymbol(TABS.INFORMATION)}
              activeKey={removeSymbol(location.hash)}
              items={tabs}
              onChange={tabChangeHandler}
            />
          </div>
        )}
      </Spin>
      <AttendanceSheet
        isOpen={isOpenAttendanceSheet}
        classDataSource={classDataSource}
        setAttendanceSheet={handleAttendance}
        classroomId={id}
        lesson={lesson}
        total={classInformation?.listStudent?.total}
      />
      {/* TODO_BETA */}
      <Modal
        title={t('classroom.detail.give_homework')}
        open={isOpenModalHomework}
        onCancel={() => handleModalHomework(false)}
        footer={null}
        destroyOnClose
        width={1000}
      >
        <HomeworkSendOrg onModalHomework={handleModalHomework} />
      </Modal>
      {/* TODO_BETA */}
      <Modal
        title={t('classroom.detail.share_exercise')}
        open={isOpenModalExercise}
        onCancel={() => handleModalExercise(false)}
        footer={null}
        destroyOnClose
        width={1200}
      >
        <ExerciseShareOrg handleModalExercise={handleModalExercise} />
      </Modal>
    </div>
  )
}
