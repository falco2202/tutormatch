import { USER_TOKEN } from '@/constants/tokenValue'

function getLocalStorage(key) {
  return localStorage.getItem(key)
}

function setLocalStorage(key, value) {
  return localStorage.setItem(key, value)
}

function removeLocalStorage(key) {
  return localStorage.removeItem(key)
}

export { getLocalStorage, setLocalStorage, removeLocalStorage, USER_TOKEN }
