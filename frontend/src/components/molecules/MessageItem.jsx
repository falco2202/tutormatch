import { AVATAR_DEFAULT } from '@/assets/images'
import { Typography, Avatar } from 'antd'
import { showTimeChat } from '@/utils/helper'
import { useMemo } from 'react'

export default function MessageItem({
  avatar,
  content,
  isAdmin,
  isClient,
  date
}) {
  const isSender = useMemo(() => {
    return isClient ? !isAdmin : isAdmin
  }, [isClient])

  return (
    <div className={`message-item ${isSender && 'message-item__right'}`}>
      <div className={`flex ${isSender ? 'justify-end' : 'gap-4'}`}>
        {!isSender && !isClient && (
          <div className="h-[2rem] w-[2rem]">
            <Avatar src={avatar || AVATAR_DEFAULT} size={40} />
          </div>
        )}
        <div>
          <Typography.Text
            className={`message-item__${
              isSender ? 'right--text' : 'left--text'
            }`}
          >
            {content}
          </Typography.Text>
          <Typography.Text className="block text-zinc-400">
            {showTimeChat(date)}
          </Typography.Text>
        </div>
      </div>
    </div>
  )
}
