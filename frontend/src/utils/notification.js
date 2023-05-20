import { notification } from 'antd'

const pushNotification = ({ type, message }) =>
  notification[type]({
    className: 'whitespace-pre-line',
    placement: 'bottomRight',
    duration: 3,
    message
  })

export default pushNotification
