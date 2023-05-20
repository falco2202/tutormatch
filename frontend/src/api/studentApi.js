import apiClient from '@/api/apiClient'
import { STUDENTS } from '@/api/constants'

const getStudentsList = (params) =>
  apiClient.get(STUDENTS.GET_STUDENTS, { params })

const getStudentDetail = (studentId) =>
  apiClient.get(`${STUDENTS.GET_STUDENTS}/${studentId}`)

export { getStudentsList, getStudentDetail }
