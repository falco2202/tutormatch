import apiClient from '@/api/apiClient'
import { TEACHERS } from '@/api/constants'

const getTeachersList = (params) =>
  apiClient.get(TEACHERS.GET_TEACHERS, { params })
const getTeacherDetail = (teacherId) =>
  apiClient.get(`${TEACHERS.GET_TEACHERS}/${teacherId}`)
const setLockAndUnlockTeacher = (teacherId) =>
  apiClient.put(`${TEACHERS.GET_TEACHERS}/${teacherId}`)
const setConfirmTeacher = (teacherId) =>
  apiClient.patch(`${TEACHERS.GET_TEACHERS}/${teacherId}`)

export {
  getTeachersList,
  getTeacherDetail,
  setLockAndUnlockTeacher,
  setConfirmTeacher
}
