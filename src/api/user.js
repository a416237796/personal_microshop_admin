
import request from '@/plugin/axios'

import { USERS_LIST } from './api'

export const getUserList = data => request({
  url: USERS_LIST,
  method: 'post',
  data
})
