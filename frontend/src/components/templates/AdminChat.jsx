import ContentChat from '@/components/organisms/ContentChat'
import SidebarChat from '@/components/organisms/SidebarChat'
import { ALL_MESSAGE_CHANNEL, ALL_MESSAGE_EVENT } from '@/constants/common'
import {
  addNewMessageToList,
  requestGetConversations,
  requestGetMessages
} from '@/redux/reducers/chatReducers'
import { listenChannel, stopListenEvent } from '@/utils/realtimeHelper'
import { getLocalStorage, USER_TOKEN } from '@/utils/storage'
import { Col, Row } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import CustomHelmet from '@/components/atoms/CustomHelmet'

export default function AdminChat() {
  const token = getLocalStorage(USER_TOKEN)
  const { conversations } = useSelector((state) => state.chatSlice)
  const dispatch = useDispatch()

  const [searchChatId] = useSearchParams()
  const chatId = parseInt(searchChatId.get('id'))
  const getMessage = (chatId) => {
    if (isNaN(chatId)) {
      return
    }
    dispatch(requestGetMessages({ chatId: chatId, page: 1 }))
  }
  useEffect(() => {
    getMessage(chatId)
  }, [chatId])

  useEffect(() => {
    dispatch(requestGetConversations({ search_value: '' }))
  }, [])

  useEffect(() => {
    if (window.Echo) {
      listenChannel(ALL_MESSAGE_CHANNEL, ALL_MESSAGE_EVENT, ({ message }) => {
        dispatch(addNewMessageToList(message))
        dispatch(requestGetConversations({ search_value: '' }))
      })
    }
    return () => {
      stopListenEvent(ALL_MESSAGE_CHANNEL)
    }
  }, [window.Echo, token])

  const itemMessage = conversations?.find((item) => item.id === chatId)

  return (
    <Row className="flex rounded-2xl overflow-hidden">
      <CustomHelmet title="TutorMatch | Chat" />
      <Col span={6}>
        <SidebarChat conversations={conversations} />
      </Col>
      <Col span={18}>
        <ContentChat
          message={chatId}
          avatar={itemMessage?.user?.image?.url}
          name={itemMessage?.user?.fullName}
          userId={itemMessage?.userId}
        />
      </Col>
    </Row>
  )
}
