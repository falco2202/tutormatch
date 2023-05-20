import ParentList from '@/components/templates/ParentList'
import StudentList from '@/components/templates/StudentList'
import TeacherList from '@/components/templates/TeacherList'
import ClassroomList from '@/components/templates/ClassroomList'
import Dashboard from '@/components/templates/Dashboard'
import ParentDetail from '@/components/templates/details/ParentDetail'
import TeacherDetail from '@/components/templates/details/TeacherDetail'
import StudentDetail from '@/components/templates/details/StudentDetail'
import ClassroomAdd from '@/components/templates/add/ClassroomAdd'
import ClassroomUpdate from '@/components/templates/update/ClassroomUpdate'
import Profile from '@/pages/Profile'
import AdminChat from '@/components/templates/AdminChat'
import ClassManagement from '@/components/templates/teacher/ClassManagement'
import { DetailNotification } from '@/components/notifications/DetailNotification'
import ClassroomDetail from '@/components/templates/details/ClassroomDetail'
import Classes from '@/pages/Classes'
import ClassesDetail from '@/pages/ClassesDetail'
import Exercise from '@/pages/Exercise'
import CalendarPage from '@/pages/CalendarPage'
import SchedulePage from '@/pages/SchedulePage'
import Tests from '@/pages/Tests'
import TakeTest from '@/pages/TakeTest'

const routes = [
  {
    name: 'profile',
    path: 'profile',
    component: <Profile />
  },
  {
    name: 'parent',
    path: 'admin/parents',
    component: <ParentList />
  },
  {
    name: 'teacher',
    path: 'admin/teachers',
    component: <TeacherList />
  },
  {
    name: 'student',
    path: 'admin/students',
    component: <StudentList />
  },
  {
    name: 'admin',
    path: 'admin',
    component: <Dashboard />
  },
  {
    name: 'parent-detail',
    path: 'admin/parents/:id',
    component: <ParentDetail />
  },
  {
    name: 'teacher-detail',
    path: 'admin/teachers/:id',
    component: <TeacherDetail />
  },
  {
    name: 'classroom',
    path: 'admin/classroom',
    component: <ClassroomList />
  },
  {
    name: 'classroom',
    path: 'admin/classroom/:id',
    component: <ClassroomDetail />
  },
  {
    name: 'classroom-update',
    path: 'admin/classroom/update/:id',
    component: <ClassroomUpdate />
  },
  {
    name: 'admin-chat',
    path: 'admin/chat',
    component: <AdminChat />
  },
  {
    name: 'class-management',
    path: 'class-management',
    component: <ClassManagement />
  },
  {
    name: 'class-management-add',
    path: 'class-management/add',
    component: <ClassroomAdd />
  },
  {
    name: 'class-management-update',
    path: 'class-management/update/:id',
    component: <ClassroomUpdate />
  },
  {
    name: 'detail-notification',
    path: 'notification/:id',
    component: <DetailNotification />
  },
  {
    name: 'student-detail',
    path: 'admin/students/:id',
    component: <StudentDetail />
  },
  {
    name: 'class-detail',
    path: 'class-management/:id',
    component: <ClassroomDetail />
  },
  {
    name: 'student-detail',
    path: 'class-management/:id/student/:id',
    component: <StudentDetail />
  },
  {
    name: 'child-detail',
    path: 'profile/child/:id',
    component: <StudentDetail />
  },
  {
    name: 'child-detail',
    path: 'admin/classroom/:id/student/:id',
    component: <StudentDetail />
  },
  {
    name: 'classes',
    path: 'classes',
    component: <Classes />
  },
  {
    name: 'classes-detail',
    path: 'classes/detail/:id',
    component: <ClassesDetail />
  },
  //TODO_BETA
  {
    name: 'exercise',
    path: 'exercise',
    component: <Exercise />
  },
  {
    name: 'tests',
    path: 'tests',
    component: <Tests />
  },
  {
    name: 'take-test',
    path: 'take-test/:id',
    component: <TakeTest />
  },
  // TODO_BETA: router screen beta demo
  {
    name: 'calendar',
    path: '/calendar',
    component: <CalendarPage />
  },
  {
    name: 'schedule',
    path: '/schedule',
    component: <SchedulePage />
  }
]

export default routes
