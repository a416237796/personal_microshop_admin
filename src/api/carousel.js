import request from '@/plugin/axios'

import { SAVE_CAROUSEL, UPDATE_CAROUSEL, CAROUSEL_LIST, DELETE_CAROUSEL } from './api'

export const updateCarousel = data => request({
  url: UPDATE_CAROUSEL,
  method: 'post',
  data
})

export const saveCarousel = data => request({
  url: SAVE_CAROUSEL,
  method: 'post',
  data
})

export const getCarousels = data => request({
  url: CAROUSEL_LIST,
  method: 'post',
  data
})

export const deleteCarousel = data => request({
  url: DELETE_CAROUSEL,
  method: 'post',
  data
})
