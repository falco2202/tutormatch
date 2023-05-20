import apiClient from '@/api/apiClient'
import { CLASSROOM, STUDENTS } from '@/api/constants'

export const getListClassroom = (params) =>
  apiClient.get(CLASSROOM.GET_CLASSROOM, { params })

export const getListClassroomManagement = (params) =>
  apiClient.get(CLASSROOM.GET_CLASSROOM_MANAGEMENT, { params })

export const addClassroomApi = (data) =>
  apiClient.post(CLASSROOM.GET_CLASSROOM_MANAGEMENT, data)

export const deleteClassroom = (classroomId) =>
  apiClient.delete(`${CLASSROOM.GET_CLASSROOM_MANAGEMENT}/${classroomId}`)

export const getDetailClassroom = (classroomId) =>
  apiClient.get(`${CLASSROOM.GET_CLASSROOM_MANAGEMENT}/${classroomId}`)

export const updateDetailClassroom = ({ fmData, classroomId }) =>
  apiClient.post(`${CLASSROOM.GET_CLASSROOM_MANAGEMENT}/${classroomId}`, fmData)

export const getDetailClassGlobal = (id) =>
  apiClient.get(`${CLASSROOM.GET_CLASSROOM}/${id}`)
export const joinClassroomApi = (dataStudent, classroomId) =>
  apiClient.post(
    `${CLASSROOM.GET_CLASSROOM_MANAGEMENT}/${classroomId}/students`,
    dataStudent
  )

export const approvalAndCancel = ({ classroomId, studentId, student_status }) =>
  apiClient.patch(
    `${CLASSROOM.GET_CLASSROOM_MANAGEMENT}/${classroomId}${STUDENTS.GET_STUDENTS}/${studentId}`,
    { student_status }
  )
export const attendanceClassroomApi = ({
  classroomId,
  lessonId,
  listStudent
}) => {
  return apiClient.post(
    `${CLASSROOM.GET_CLASSROOM_MANAGEMENT}/${classroomId}/lessons/${lessonId}`,
    listStudent
  )
}

export const feedbackClassroom = ({ classroomId, content }) => {
  return apiClient.post(
    `${CLASSROOM.GET_CLASSROOM_MANAGEMENT}/${classroomId}/feedbacks`,
    content
  )
}
