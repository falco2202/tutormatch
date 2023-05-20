import { UploadOutlined } from '@ant-design/icons'
import { Upload, Button } from 'antd'
import { requestAvatar } from '@/redux/reducers/authReducers'
import { useDispatch, useSelector } from 'react-redux'
import pushNotification from '@/utils/notification'
import { t } from 'i18next'
import { MAX_SIZE } from '@/constants/defaultValue'
import { AVATAR_DEFAULT } from '@/assets/images'

const AvatarUpload = ({ profileData }) => {
  const { avatar } = useSelector((state) => state.authSlice)
  const dispatch = useDispatch()
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      pushNotification({
        type: 'error',
        message: t('image.image_required_type')
      })
    }
    const isLt2M = file.size / 1024 ** 2 < MAX_SIZE
    if (!isLt2M) {
      pushNotification({
        type: 'error',
        message: t('image.image_required_2mb')
      })
    }
    return isJpgOrPng && isLt2M
  }

  const handleUploadAvatar = (options) => {
    const fmData = new FormData()
    fmData.append('model', 'App\\Models\\User')
    fmData.append('id', profileData.id)
    fmData.append('file', options.file)
    dispatch(requestAvatar(fmData))
  }

  return (
    <div className="flex justify-center">
      <Upload
        name="avatar"
        listType="picture"
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={handleUploadAvatar}
      >
        <div>
          <div className="w-64 h-64 border-[1px] border-slate-200 border-solid">
            <img
              className="h-full w-full object-contain"
              src={avatar || AVATAR_DEFAULT}
              alt="avatar"
            />
          </div>
          <div className="flex justify-center my-6">
            <Button icon={<UploadOutlined />}>{t('upload_avatar')}</Button>
          </div>
        </div>
      </Upload>
    </div>
  )
}

export default AvatarUpload
