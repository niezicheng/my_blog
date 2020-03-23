import axios from 'axios';
import servicePath from '../../../config'

// 获取留言列表信息
export const getCommentsInfo = () => axios({
  url: servicePath.getCommentsInfo,
  method: 'get',
  withCredentials: true
});

// 删除留言信息
export const deleteComment = (id) => axios({
  url: servicePath.deleteComment+id,
  method: 'get',
  withCredentials: true
})
