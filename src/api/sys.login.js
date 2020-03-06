import request from '@/plugin/axios'
import { LOGIN_API, CHANGE_PWD, LOGOUT, GET_USER_INFO } from './api'
export function AccountLogin (data) {
  return request({
    url: LOGIN_API,
    method: 'post',
    data
  })
}

export function GetUserInfo (data) {
  return request({
    url: GET_USER_INFO,
    method: 'post',
    data
  })
}

export const ChangePwd = data => request({
  url: CHANGE_PWD,
  method: 'post',
  data
})

export const LogoutPost = () => request({
  url: LOGOUT,
  method: 'post'
})
