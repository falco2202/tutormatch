import apiClient from '@/api/apiClient'
import { PARENTS } from '@/api/constants'

const getParentsList = (params) =>
  apiClient.get(PARENTS.GET_PARENTS, { params })
const getParentDetail = (parentId) =>
  apiClient.get(`${PARENTS.GET_PARENTS}/${parentId}`)

export { getParentsList, getParentDetail }
