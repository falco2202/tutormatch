import { useRef, useMemo } from 'react'
import HeaderChat from '@/components/molecules/HeaderChat'
import FooterChat from '@/components/molecules/FooterChat'
import MessageList from '@/components/molecules/MessageList'
import EmptyChat from '@/components/molecules/EmptyChat'
import { useDispatch, useSelector } from 'react-redux'
import { requestGetMessages } from '@/redux/reducers/chatReducers'

export default function ContentChat({ message, avatar, name, userId }) {
  const messageRef = useRef()
  const dispatch = useDispatch()
  const { messageListItem, isLoading } = useSelector((state) => state.chatSlice)
  const hasMore = useMemo(
    () => +messageListItem.items.length < +messageListItem.total,
    [messageListItem.items.length]
  )
  const handleLoadMore = () => {
    if (!hasMore || isLoading) return
    dispatch(
      requestGetMessages({
        chatId: message,
        page: messageListItem.currentPage + 1
      })
    )
  }

  return (
    <div className="bg-gray-50">
      {message ? (
        <>
          <HeaderChat avatar={avatar} name={name} />
          <MessageList
            message={message}
            avatar={avatar}
            name={name}
            innerRef={messageRef}
            loadMore={handleLoadMore}
            hasMore={hasMore}
            messageListItem={messageListItem.items}
            total={messageListItem.total}
          />
          <FooterChat userId={userId} />
        </>
      ) : (
        <EmptyChat />
      )}
    </div>
  )
}
