import request from '@/plugin/axios'
import { CLASSIFY_LIST, DELETE_CLASSIFY, UPDATE_CLASSIFY, ADD_CLASSIFY } from './api'
export const getClassifyList = () => request({
  url: CLASSIFY_LIST,
  method: 'post'
})

export const deleteClassify = () => request({
  url: DELETE_CLASSIFY,
  method: 'post'
})

export const updateClassify = data => request({
  url: UPDATE_CLASSIFY,
  method: 'post',
  data
})

export const addClassify = data => request({
  url: ADD_CLASSIFY,
  method: 'post',
  data
})
