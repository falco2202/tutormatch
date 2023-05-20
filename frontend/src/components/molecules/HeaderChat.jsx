import { AVATAR_DEFAULT } from '@/assets/images'
import { Typography, Avatar } from 'antd'

export default function HeaderChat({ avatar, name }) {
  return (
    <div className="bg-gray-200 rounded-tr-xl flex items-center gap-8 h-[5rem] pr-6 pl-6">
      <Avatar src={avatar || AVATAR_DEFAULT} className="w-[3rem] h-[3rem]" />
      <Typography.Text className="text-xl">{name}</Typography.Text>
    </div>
  )
}
