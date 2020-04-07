import axios from 'axios';
import servicePath from '../../../config';

// 获取文章列表
export const getArticleList = () => axios({
  url: servicePath.getArticleList,
  method: 'get',
  withCredentials: true
});

// 删除文章信息
export const deleteArticle = (id) => axios({
  url: servicePath.deleteArticle+id,
  method: 'get',
  withCredentials: true
})

// 获取文章类型列表信息
export const getTypeInfo = () => axios({
  url: servicePath.getTypeInfo,
  method: 'get',
  withCredentials: true // 前后端共享session
})

// 根据文章类型id获取文章信息
export const getArticleByTypeId = (id) => axios({
  url: servicePath.getArticleByTypeId+id,
  method: 'get',
  withCredentials: true // 前后端共享session
})
