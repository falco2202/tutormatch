import { AVATAR_DEFAULT } from '@/assets/images'
import { Typography, Col, Row, Avatar } from 'antd'
import { getTimeAgo } from '@/utils/helper'

export default function ChatItem({
  avatar,
  name,
  isActive,
  lastMessage,
  handleClickItem,
  time,
  isRead
}) {
  return (
    <div className={[isRead ? '' : 'font-bold']}>
      <Row
        onClick={handleClickItem}
        className={[
          'flex chat-item px-2 py-4 cursor-pointer select-none hover:bg-slate-200 rounded-3xl',
          isActive ? 'bg-slate-300' : ''
        ]}
      >
        <Col span={4}>
          <Avatar src={avatar || AVATAR_DEFAULT} size={50} />
        </Col>
        <Col span={12}>
          <Typography.Text className="block text-base">{name}</Typography.Text>
          <Typography.Text ellipsis={true}>{lastMessage}</Typography.Text>
        </Col>
        <Col span={8} className=" pr-4 flex items-center justify-end">
          <Typography.Text className="notification__list-item-text-time-ago">
            {getTimeAgo(time)}
          </Typography.Text>
        </Col>
      </Row>
    </div>
  )
}
