import axios from 'axios'
import servicePath from '../../../config'

// 获取文章类型信息
export const getTypeInfo = () => {
  return axios({
    url: servicePath.getTypeInfo,
    method: 'get',
    withCredentials: true // 前后端共享session
  })
}

// 添加文章信息
export const addArticle = (data) => {
  return axios({
    url: servicePath.addArticle,
    method: 'post',
    data,
    withCredentials: true // 前后端共享session
  })
}

// 修改文章信息
export const updateArticle = (data) => {
  return axios({
    url: servicePath.updateArticle,
    method: 'post',
    data,
    withCredentials: true // 前后端共享session
  })
}