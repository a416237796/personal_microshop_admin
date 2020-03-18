
import request from '@/plugin/axios'

import { ORDERS_LIST, ORDER_INFO, SHOP_INFO, SAVE_SHOP_INFO } from './api'

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

export const getShopInfo = data => request({
  url: SHOP_INFO,
  method: 'post',
  data
})

export const saveChange = data => request({
  url: SAVE_SHOP_INFO,
  method: 'post',
  data
})
