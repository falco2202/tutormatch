import FooterChat from '@/components/molecules/FooterChat'
import HeaderChat from '@/components/molecules/HeaderChat'
import MessageList from '@/components/molecules/MessageList'
import { MESSAGE_EVENT, ROLES } from '@/constants/common'
import { USER_ROLE } from '@/constants/defaultValue'
import { USER_ID } from '@/constants/tokenValue'
import {
  addNewMessageToList,
  requestGetMessages,
  requestGetTeacherConversations,
  clearMessages
} from '@/redux/reducers/chatReducers'
import { getLocalStorage } from '@/utils/storage'
import { WechatOutlined } from '@ant-design/icons'
import { Button, Popover } from 'antd'
import { useRef, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listenChannel, stopListenEvent } from '@/utils/realtimeHelper'
import { getMessageChannel } from '@/utils/helper'

export default function ChatPopUp() {
  const messageRef = useRef()
  const dispatch = useDispatch()
  const { conversations, messageListItem, isLoading } = useSelector(
    (state) => state.chatSlice
  )

  const { profileData, role } = useSelector((state) => state.authSlice)

  const [openPopover, setOpenPopover] = useState(false)
  const userId = profileData.id || +getLocalStorage(USER_ID)

  const roleId = role ?? +getLocalStorage(USER_ROLE)

  const hasMore = useMemo(
    () => +messageListItem.items.length < +messageListItem.total,
    [messageListItem.items.length]
  )

  const handleLoadMore = () => {
    if (!hasMore || isLoading) return
    dispatch(
      requestGetMessages({
        chatId: conversations[0]?.id,
        page: messageListItem.currentPage + 1
      })
    )
  }

  const handleOpen = () => {
    setOpenPopover(!openPopover)
  }

  useEffect(() => {
    if (userId && roleId === ROLES.TEACHER) {
      dispatch(requestGetTeacherConversations(userId))
    }
    return () => {
      dispatch(clearMessages())
    }
  }, [userId])

  useEffect(() => {
    if (window.Echo && roleId === ROLES.TEACHER) {
      listenChannel(getMessageChannel(userId), MESSAGE_EVENT, ({ message }) => {
        dispatch(addNewMessageToList(message))
      })
    }
    return () => {
      stopListenEvent(getMessageChannel(userId))
    }
  }, [])

  return (
    <Popover
      title={
        <div className="shadow p-0 m-0 w-[30rem] font-medium">
          <HeaderChat name="TutorMatch Team" />
          <MessageList
            avatar={conversations[0]?.user?.image?.url}
            name={conversations[0]?.user?.fullName}
            hasMore={hasMore}
            loadMore={handleLoadMore}
            innerRef={messageRef}
            messageListItem={messageListItem.items}
            total={messageListItem.total}
            isClient={true}
          />
          <FooterChat />
        </div>
      }
      open={openPopover}
      placement="leftBottom"
    >
      <Button
        onClick={handleOpen}
        className="fixed bottom-5 right-5 w-[5rem] h-[5rem] bg-transparent border-none"
      >
        <WechatOutlined className="text-6xl text-sky-700" />
      </Button>
    </Popover>
  )
}
