import apiClient from '@/api/apiClient'
import { IMAGE } from '@/api/constants'

const uploadImageApi = (dataUpload) =>
  apiClient.post(IMAGE.UPLOAD_IMAGE, dataUpload)

export { uploadImageApi }
