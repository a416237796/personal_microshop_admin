import request from '@/plugin/axios'

import { GOODS_LIST, GOODS_INFO, UPLOAD_IMAGE, DELETE_IMAGE, SAVE_GOODS, UPDATE_GOODS } from './api'

export const getGoodsList = data => request({
  url: GOODS_LIST,
  method: 'post',
  data
})

export const GetGoodsInfo = data => request({
  url: GOODS_INFO,
  method: 'post',
  data
})

export const uploadImg = data => request({
  url: UPLOAD_IMAGE,
  method: 'post',
  data
})

export const deleteImg = data => request({
  url: DELETE_IMAGE,
  method: 'post',
  data
})

export const saveGoods = data => request({
  url: SAVE_GOODS,
  method: 'post',
  data
})

export const updateGoods = data => request({
  url: UPDATE_GOODS,
  method: 'post',
  data
})
