import { Input } from 'antd'
import { useTranslation } from 'react-i18next'
import ChatItem from '@/components/molecules/ChatItem'
import { useSearchParams } from 'react-router-dom'
import { addIsReadConversationList, generateUniqueKey } from '@/utils/helper'
import { useDispatch } from 'react-redux'
import { useMemo, useEffect } from 'react'
import {
  clearMessages,
  requestGetConversations,
  setListeningChannel
} from '@/redux/reducers/chatReducers'
import { isEmpty } from 'lodash'
import EmptyConversation from '@/components/molecules/EmptyConversation'

export default function SidebarChat({ conversations }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [chatId, setChatId] = useSearchParams()

  useEffect(() => {
    dispatch(clearMessages())
  }, [chatId])

  const handleClick = (id) => {
    if (id === +chatId.get('id')) {
      return
    }
    const channel = conversationSortDateLatest.find((item) => item.id === id)
    if (channel) {
      dispatch(setListeningChannel(channel.name))
    }
    if (!channel.isRead) {
      channel.isRead = true
    }
    setChatId({ id })
  }

  const conversationSortDateLatest = useMemo(() => {
    const conversationList = [...conversations].sort((a, b) =>
      b.messages.created_at > a.messages.created_at ? 1 : -1
    )
    return addIsReadConversationList(conversationList)
  }, [conversations])

  const { Search } = Input

  const handleSearch = (value) => {
    setChatId({ id: '' })
    dispatch(requestGetConversations({ search_value: value }))
  }

  return (
    <div className="min-h-full bg-gray-100 rounded-l-xl">
      <div>
        <Search
          placeholder={t('common.placeholder.input_search_chat')}
          className="h-[5rem] p-5 outline-none"
          onSearch={handleSearch}
        />
      </div>
      <div className="chat-list">
        {isEmpty(conversations) ? (
          <EmptyConversation />
        ) : (
          conversationSortDateLatest.map((conversation) => (
            <ChatItem
              handleClickItem={() => {
                handleClick(conversation.id)
              }}
              isActive={conversation.id === parseInt(chatId.get('id'))}
              key={generateUniqueKey('conversation', conversation?.id)}
              avatar={conversation.user?.image?.url}
              name={conversation.user?.fullName}
              lastMessage={conversation.messages?.content}
              time={conversation.messages?.created_at}
              isRead={conversation?.isRead}
            />
          ))
        )}
      </div>
    </div>
  )
}
