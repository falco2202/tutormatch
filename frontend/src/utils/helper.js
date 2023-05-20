import { DATE_FORMAT, NOTIFICATION_PAGE, SET_UP } from '@/constants/common'
import {
  DATE_TIME,
  HOURS_MINUTE,
  INIT_PAGE_PARAM,
  TYPE,
  YEAR_MONTH_DAY
} from '@/constants/defaultValue'
import axios from 'axios'
import { t } from 'i18next'
import { findKey, isEmpty, isEqual, uniqWith } from 'lodash'
import i18n from '@/locales'
import viVN from 'antd/es/locale/vi_VN'
import enUS from 'antd/es/locale/en_US'
import 'dayjs/locale/vi'
import dayjs from 'dayjs'
import { setLocalStorage } from './storage'
import { LANGUAGE_KEY } from '@/constants/tokenValue'
import isBetween from 'dayjs/plugin/isBetween'
import { TIME_CHECK } from '@/constants/timeCheck'
dayjs.extend(isBetween)

export const handleResMessage = (
  resObj,
  optionalMessage = t('succeed_messages.default')
) => {
  if (resObj.status === 200) {
    let successMessages = optionalMessage
    if (resObj.data.message) {
      successMessages = t(`succeed_messages.${resObj.data.message}`)
    }
    return {
      message: successMessages,
      type: 'success'
    }
  } else {
    let errorMessage = t('response_error_messages.default')
    let isUnauthenticated = false
    if (axios.isAxiosError(resObj)) {
      if (resObj.response) {
        const resMessages = resObj.response.data.errors || ''
        if (resObj.response.status === 401) isUnauthenticated = true
        if (typeof resMessages === 'string') {
          errorMessage = t(`response_error_messages.${resMessages}`)
        } else if (!isEmpty(resMessages)) {
          errorMessage = Object.values(resMessages)
            .map((errObj) =>
              t(`response_error_messages.${errObj.message}`, {
                ...errObj.args,
                ...(errObj.attribute && {
                  attribute: t(`common.form.${errObj.attribute}`).toLowerCase()
                })
              })
            )
            .join('\n')
        }
      } else {
        errorMessage = resObj.message
      }
    }
    return {
      message: errorMessage,
      type: 'error',
      isUnauthenticated
    }
  }
}

export const generateUniqueKey = (feature = 'feature', index) =>
  `${feature}-${index}`

export const addUniqueKey = (inputArr) =>
  inputArr?.map((item) => ({ ...item, key: item.id }))

export const removeSymbol = (input, symbol = '#', replaceSymbol = '') =>
  input.replaceAll(symbol, replaceSymbol)

export const getKeyByStatus = (status) => {
  const key = findKey(NOTIFICATION_PAGE, (value) => value === status)
  return key ? key.toLowerCase() : ''
}

export const checkPickerLocale = () =>
  i18n.language === SET_UP.SYSTEM_LANGUAGE.ENGLISH ? enUS : viVN

export const convertDataSource = (data) => {
  return Array.isArray(data) ? data : []
}

export const formatMoney = (data) =>
  data?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })

export const isDuplicate = (arrayCheck) => {
  const arrayCheckDuplicate = uniqWith(arrayCheck, isEqual)
  return arrayCheckDuplicate.length !== arrayCheck.length
}

export const handleChangeLanguage = (key, setLocale) => {
  dayjs.locale(key)
  setLocale(key)
  setLocalStorage(LANGUAGE_KEY, key)
  i18n.changeLanguage(key)
}

export const getTimeAgo = (time) => (time ? dayjs(time).fromNow() : '')

export const isCanAttendance = (listLesson) => {
  return listLesson
    ? listLesson.some((item) => dayjs().isSame(item.time_start, 'day'))
    : false
}
export const isTimeInProgress = (dateStart, dateEnd) => {
  return dayjs().isBetween(dateStart, dateEnd, 'day', [])
}

export const checkPagination = (total, totalPage, pageSize) => {
  return (
    totalPage !== 1 && {
      position: ['bottomCenter'],
      total,
      totalPage,
      pageSize,
      showSizeChanger: false
    }
  )
}

export const checkPaginationHandleInClient = (total) => {
  return (
    total > INIT_PAGE_PARAM.PAGE_SIZE && {
      position: ['bottomCenter'],
      total,
      pageSize: INIT_PAGE_PARAM.PAGE_SIZE
    }
  )
}

export const getParamNumber = (param, defaultNumber = 0) => {
  return isNotTypeNumber(param) ? defaultNumber : +param
}

export const getParamOrder = (param) => {
  const order = ['desc', 'asc']
  return order.includes(param) ? param : ''
}

export const getParamZeroOne = (param) => {
  return isNotTypeNumber(param) ? '' : +param > 0 ? 1 : 0
}
export const decodeListNotification = (items) => {
  if (items.length > 0) {
    const newItems = items.map((item) => {
      const newItem = { ...item, ...JSON.parse(item.data) }
      delete newItem.data
      return newItem
    })
    return newItems
  }
  return []
}

export const roundNumber = (avgStar) => {
  return avgStar ? Math.round(avgStar * 10) / 10 : 0
}

export const isNotTypeNumber = (id) => {
  return isNaN(parseInt(id))
}

export const getLesson = (listLesson) => {
  return listLesson?.find((item) => dayjs().isSame(item.time_start, 'day'))
}

export const getNotificationChannelName = (userId) =>
  `App.Models.User.${userId}`

export const getKey = (index) => {
  return `key_${index}`
}

export const getDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}
// add status list conversation read_at === null || undefined => isRead = false, read_at has value => isRead = true
// read_at BE update sau
export const addIsReadConversationList = (conversationList) => {
  return conversationList
    ? conversationList.map((conversation) => {
        return {
          ...conversation,
          isRead: !!conversation?.read_at
        }
      })
    : []
}

// Hàm tính toán lại số sao trung bình và số lượt đánh giá sau khi có feedback
export const updateDataDetail = (classData) => {
  if (classData.detailClass.countRate === 0) {
    classData.detailClass.avgStar = classData.feedback[0].star
    classData.detailClass.countRate++
    return
  }
  classData.detailClass.avgStar =
    (classData.detailClass.avgStar * classData.detailClass.countRate +
      classData.feedback[0].star) /
    ++classData.detailClass.countRate
}

export const handlePaginationInList = (total) => {
  return (
    total > INIT_PAGE_PARAM.PAGE_SIZE && {
      pageSize: INIT_PAGE_PARAM.PAGE_SIZE,
      position: 'bottom',
      align: 'center'
    }
  )
}

export const showTimeChat = (date) => {
  return dayjs().diff(date, 'hour') > 0
    ? dayjs(date).format(HOURS_MINUTE)
    : getTimeAgo(date)
}

export const divideMessageFollowDateSend = (messages) => {
  return messages.reduce((accumulator, element) => {
    const messageDay = dayjs(element.created_at).format(
      DATE_FORMAT.DATE_MONTH_YEAR
    )
    if (accumulator[messageDay]) {
      accumulator[messageDay].push(element)
      return accumulator
    }
    return { ...accumulator, [messageDay]: [element] }
  }, {})
}

export const generatorMessages = (messages) => {
  const days = divideMessageFollowDateSend(messages)
  return Object.keys(days).reduce((accumulator, date) => {
    accumulator.push(...days[date], { type: TYPE.DAY, date, id: date })
    return accumulator
  }, [])
}

export const getAddress = (addressClass) => {
  return ` ${addressClass[0].address ?? ''}, ${
    addressClass[0].ward?.name ?? ''
  }, ${addressClass[0].ward?.city?.name ?? ''}`
}

export const convertTimeToNumber = (timeString) => {
  const time = timeString.split(':')
  const number = (+time[0] * 60 + (+time[1]))

  return number
}

export const convertNumberToTime = (timeNumber) => {
  const second = timeNumber % 60
  const minute = (timeNumber - second) / 60

  
  return `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`
}

export const uniqueId = () => {
  return Date.now().toString(32) + Math.random().toString(16)
}
// TODO_BETA: generate fake data calendar
export const generateEvent = (defaultEvent) => {
  let listEvent = defaultEvent
  for (let i = 0; i < 10; i++) {
    const event = defaultEvent
    const fakeEvent = event.map((event) => {
      return {
        id: generateUniqueKey(event.id, Math.random()),
        title: event.title,
        start: dayjs(event.start)
          .add(7, 'day')
          .format(`${YEAR_MONTH_DAY} ${HOURS_MINUTE}`),
        end: dayjs(event.end)
          .add(7, 'day')
          .format(`${YEAR_MONTH_DAY} ${HOURS_MINUTE}`),
        color: event.color
      }
    })
    listEvent = listEvent.concat(fakeEvent)
    defaultEvent = fakeEvent
  }
  return listEvent
}

export const compareTime = (timeStart, timeEnd, timeCheck) => {
  const check = dayjs(timeCheck, DATE_TIME)
  const checkStart = dayjs(timeStart, DATE_TIME)
  const checkEnd = dayjs(timeEnd, DATE_TIME)

  return check.diff(checkStart) < 0
    ? TIME_CHECK.BEFORE
    : (check.diff(checkEnd) > 0 
      ? TIME_CHECK.AFTER
      : TIME_CHECK.BETWEEN)
}
export const updateConversationWhenSendMessage = (conversations, message) => {
  const conversation = conversations.find(
    (item) => item.id === message.conversation_id
  )
  if (!conversation) {
    return
  }

  const { messages } = conversation
  const { content, created_at } = message

  messages.content = content
  messages.created_at = created_at
  conversation.read_at = created_at
  conversations = { ...conversations, conversation }
}

export const getMessageChannel = (userId) => `messages${userId}`
