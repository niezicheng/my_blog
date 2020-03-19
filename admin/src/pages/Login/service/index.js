import axios from 'axios'
import servicePath from '../../../config'

// 用户登录
export const login = (data) => axios({
  url: servicePath.login,
  method: 'post',
  data,
  withCredentials: true // 前后端共享session
})