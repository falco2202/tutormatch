export const DATE_FORMAT = {
  DATE_MONTH_YEAR: 'DD-MM-YYYY',
  DATE_MONTH_YEAR_SLASH: 'DD/MM/YYYY',
  YEAR_MONTH_DAY: 'YYYY-MM-DD'
}

export const TIME_FORMAT = {
  HOUR_MINUTES: 'hh:mm',
  HOUR_MINUTES_SECOND: 'HH:mm:ss'
}

export const GENDER = {
  FEMALE: 0,
  MALE: 1
}

export const ROLES = {
  ADMIN: 0,
  TEACHER: 1,
  PARENT: 2,
  STUDENT: 3
}

export const DAY_OF_THE_WEEK = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6
}

export const INPUT_TYPES = {
  INPUT: 'input',
  TEXT_AREA: 'text-area',
  SELECT: 'select',
  RADIO: 'radio',
  DATE_PICKER: 'date-picker',
  PASSWORD: 'password'
}

//  Các status của Result component mà ant hỗ trợ
export const NOTIFICATION_PAGE = {
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  WARNING: 'warning',
  SUCCESS: 'success'
}

export const SET_UP = {
  SYSTEM_LANGUAGE: {
    VIETNAMESE: 'vi',
    ENGLISH: 'en'
  }
}

export const ALL_MESSAGE_CHANNEL = 'all-messages'

export const ALL_MESSAGE_EVENT = 'AllMessageEvent'

export const MESSAGE_EVENT = 'MessageEvent'

export const NOTIFICATION_STATUS = {
  UNREAD: 0,
  READ: 1
}

export const DAY_OF_WEEK = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY'
]

export const NUMBER = /^[0-9]+$/

export const REGEX = {
  PHONE: /^(\+84|0)(3[2-9]|5[689]|7[0|6-9]|8[1-9]|9[0-9])(\d{7})$/
}
export const CHARACTER_REQUIRE = {
  MIN: 6,
  MAX: 255
}
