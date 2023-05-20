import InfiniteScroll from 'react-infinite-scroll-component'
import { Typography, Spin } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { getTimeAgo } from '@/utils/helper'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeNotificationList,
  requestGetDetailNotification,
  requestGetNotifications
} from '@/redux/reducers/notificationReducers'
import EmptyNotification from '@/components/molecules/EmptyNotification'
import { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
dayjs.extend(relativeTime)

const { Paragraph, Text } = Typography

export function NotificationList({ hasMore, loadMore, setOpen }) {
  const { t } = useTranslation()
  const { items, isLoading, total } = useSelector(
    (state) => state.notificationSlice
  )
  const dispatch = useDispatch()

  const handleClickOnNotification = (notification) => {
    dispatch(requestGetDetailNotification(notification.id))
    setOpen(false)
  }

  useEffect(() => {
    if (total === 0) {
      dispatch(requestGetNotifications())
    }
  }, [total])

  useEffect(() => {
    return () => {
      removeNotificationList()
    }
  }, [])

  return (
    <Spin spinning={isLoading}>
      {isEmpty(items) ? (
        <EmptyNotification />
      ) : (
        <div id="notification-wrapper" className="px-2 pt-2 pb-2 flex flex-col">
          <h3 className="notification__title py-3">
            {t('common.notification.title')}
          </h3>
          <InfiniteScroll
            dataLength={items.length}
            hasMore={hasMore}
            next={loadMore}
            scrollableTarget="notification-wrapper"
            height={320}
          >
            <div className="notification__list">
              {items.map((notification) => (
                <div
                  className={`flex pl-2 ${
                    notification.readAt ? '' : 'bg-[#eceff7]'
                  }`}
                  key={notification.id}
                >
                  <div
                    className={`mt-5 mr-2 w-2 h-2 rounded-2xl ${
                      notification.readAt ? '' : 'bg-[#3b80e9]'
                    }`}
                  ></div>
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/notification/${notification.id}`}
                      className="notification__list-item flex justify-between"
                      key={notification.id}
                      onClick={() => handleClickOnNotification(notification)}
                    >
                      <div className="notification__list-item-text">
                        <div>
                          <Paragraph
                            ellipsis={{ rows: 1 }}
                            className={`notification__list-item-text-title '
                          }`}
                          >
                            {notification.title}
                          </Paragraph>
                        </div>
                        <div>
                          <Paragraph
                            ellipsis={{ rows: 1 }}
                            className="notification__list-item-text-content"
                          >
                            {notification.content}
                          </Paragraph>
                        </div>
                        <div>
                          <Text className="notification__list-item-text-time-ago">
                            {`${getTimeAgo(notification.createdAt)}`}
                          </Text>
                        </div>
                      </div>
                      <EllipsisOutlined />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </Spin>
  )
}
