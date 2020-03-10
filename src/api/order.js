
import request from '@/plugin/axios'

import { ORDERS_LIST } from './api'

export const getOrdersList = data => request({
  url: ORDERS_LIST,
  method: 'post',
  data
})
