export const INIT_PAGE_PARAM = {
  PAGE_SIZE: 15,
  TOTAL: 0,
  TOTAL_PAGE: 0,
  CURRENT_PAGE: 1,
  PAGE_SIZE_CLASSROOM: 8,
  ORDER_BY_AVG_STAR: 'desc'
}

export const STATUS = {
  TEACHER: {
    PENDING: 0,
    APPROVED: 1,
    LOCKED: 2
  },
  STUDENT: {
    PENDING: 0,
    APPROVED: 1,
    REJECT: 2
  }
}

export const ALL = 'all'

export const USER_ROLE = 'USER_ROLE'

export const DUMMY_USER = {
  id: null,
  fullName: null,
  email: null,
  phone: null,
  dateOfBirth: null,
  gender: null,
  parent_id: null,
  deleted_at: null,
  image: null,
  address: [
    {
      address: null,
      id: null,
      ward: {
        id: null,
        name: null,
        city: {
          id: null,
          name: null
        }
      }
    }
  ],
  profileTeacher: [
    {
      at_school: null,
      description: null
    }
  ]
}

export const HOURS_MINUTE = 'HH:mm'

export const HOURS_MINUTE_SECOND = 'HH:mm:ss'

export const YEAR_MONTH_DAY = 'YYYY-MM-DD'

export const MINUTE_SECOND = 'mm:ss'

export const DATE_TIME = 'YYYY/MM/DD HH:mm'

export const OPTION = {
  ASC: 'asc',
  DESC: 'desc'
}
export const MAX_SIZE = 2

export const TYPE = {
  DAY: 'day'
}

export const PROPS_TYPE = {
  ADD_CLASSROOM: 'ADD_CLASSROOM',
  UPDATE_CLASSROOM: 'UPDATE_CLASSROOM'
}
