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