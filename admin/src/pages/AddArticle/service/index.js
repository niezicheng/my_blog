import axios from 'axios'
import servicePath from '../../../config'

// 获取文章类型信息
export const getTypeInfo = () => axios({
  url: servicePath.getTypeInfo,
  method: 'get',
  withCredentials: true // 前后端共享session
})

// 添加文章信息
export const addArticle = (data) => axios({
  url: servicePath.addArticle,
  method: 'post',
  data,
  withCredentials: true // 前后端共享session
})

// 修改文章信息
export const updateArticle = (data) => axios({
  url: servicePath.updateArticle,
  method: 'post',
  data,
  withCredentials: true // 前后端共享session
})

// 通过文章id获取文章信息
export const getArticleById = (id) => axios({
  url: servicePath.getArticleById+id,
  method: 'get',
  withCredentials: true
})