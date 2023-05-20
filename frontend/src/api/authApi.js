import apiClient from '@/api/apiClient'
import { AUTH, PARENTS } from '@/api/constants'

const loginApi = (data) => apiClient.post(AUTH.LOGIN, data)
const logoutApi = (data) => apiClient.post(AUTH.LOGOUT, data)
const registerApi = (data) => apiClient.post(AUTH.REGISTER, data)
const createAccountStudentApi = (data) =>
  apiClient.post(PARENTS.CREATE_ACCOUNT_STUDENT, data)

const verifyEmailApi = (data) => apiClient.post(AUTH.VERIFY_EMAIL, data)

export { loginApi, registerApi, logoutApi, createAccountStudentApi, verifyEmailApi }
