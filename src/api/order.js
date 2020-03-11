
import request from '@/plugin/axios'

import { ORDERS_LIST, ORDER_INFO } from './api'

export const getOrdersList = data => request({
  url: ORDERS_LIST,
  method: 'post',
  data
})

export const getOrderInfo = data => request({
  url: ORDER_INFO,
  method: 'post',
  data
})
