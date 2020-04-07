import axios from 'axios';
import servicePath from '../../../config';

// 用户登出
export const logout = () => axios({
  url: servicePath.logout,
  method: 'post',
  withCredentials: true
});