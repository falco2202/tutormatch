import { useState, useMemo } from 'react'
import { SendOutlined } from '@ant-design/icons'
import { Button, Input, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { requestSendMessage } from '@/redux/reducers/chatReducers'
import { getLocalStorage } from '@/utils/storage'
import { USER_ROLE } from '@/constants/defaultValue'
import { ROLES } from '@/constants/common'
import { getMessageChannel } from '@/utils/helper'

export default function FooterChat({ userId }) {
  const dispatch = useDispatch()
  const role = parseInt(getLocalStorage(USER_ROLE))
  const [message, setMessage] = useState('')
  const { t } = useTranslation()
  const isAdmin = useMemo(() => role === ROLES.ADMIN, [role])
  const getMessageObj = () => ({
    isAdmin,
    message,
    ...(isAdmin && { channel: getMessageChannel(userId) })
  })

  const handleSend = (e) => {
    e.preventDefault()
    if (!message) {
      return
    }
    dispatch(requestSendMessage(getMessageObj(role)))
    setMessage('')
  }

  return (
    <Form
      onFinish={handleSend}
      className="items-center p-3 pb-1 flex gap-3 h-[5rem] bottom-0 w-full"
    >
      <Input
        placeholder={t('common.placeholder.type_a_message')}
        className="h-10 rounded-xl"
        allowClear
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onPressEnter={handleSend}
      />
      <Button
        onClick={handleSend}
        className="h-10 border-none w-16 bg-sky-500 rounded-xl"
      >
        <SendOutlined />
      </Button>
    </Form>
  )
}
