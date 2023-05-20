import MessageItem from '@/components/molecules/MessageItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import { generatorMessages } from '@/utils/helper'
import { useEffect, useRef, useMemo } from 'react'
import DateChat from '@/components/atoms/DateChat'
import { TYPE } from '@/constants/defaultValue'

export default function MessageList({
  avatar,
  name,
  loadMore,
  hasMore,
  innerRef,
  messageListItem,
  total,
  isClient
}) {
  const bottomRef = useRef()

  useEffect(() => {
    if (messageListItem.length > 0) {
      bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }, [total])

  const handleScroll = (event) => {
    const target = event.target
    if (target.scrollTop === 0 && hasMore) {
      // Sau khi scroll lên top, set scroll top về lại 100
      innerRef.current.scrollTop = 100
      loadMore()
    }
  }

  const messages = useMemo(() => {
    return generatorMessages(messageListItem)
  }, [messageListItem])

  return (
    <div
      id="message-wrapper"
      ref={innerRef}
      className="message-list px-6 pt-2"
      onScroll={handleScroll}
    >
      <InfiniteScroll
        dataLength={messageListItem.length}
        scrollableTarget="message-wrapper"
      >
        {messages
          .map((item) =>
            item.type && item.type === TYPE.DAY ? (
              <DateChat key={item.id} item={item} />
            ) : (
              <MessageItem
                isAdmin={item?.is_admin}
                key={item.id}
                content={item.content}
                avatar={item.is_admin ? '' : avatar}
                name={item.is_admin ? 'Admin' : name}
                date={item.created_at}
                isClient={isClient}
              />
            )
          )
          .reverse()}
        <div ref={bottomRef} />
      </InfiniteScroll>
    </div>
  )
}
